import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Modal,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../api"
import { useFormik } from "formik"
import EditWarehouseUser from "./editWarehouseUser"
import { RiDeleteBin2Line } from "react-icons/ri"
import { FaRegEdit } from "react-icons/fa"
import PageButton from "../../components/admin/pageButton.jsx"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import * as Yup from "yup"

const WarehouseUser = () => {
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState([])
  const [warehouse, setWarehouse] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [userIdEdit, setUserIdEdit] = useState("")
  const [warehouseEdit, setWarehouseEdit] = useState("")
  const [idEdit, setIdEdit] = useState("")
  const [page, setPage] = useState(1)

  const [limit, setLimit] = useState(5)
  const [totalCount, setTotalCount] = useState(0)
  const toast = useToast()
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const fetchWareUser = async () => {
    try {
      const respons = await axiosInstance.get(`/warehouse-user`, {
        params: {
          _limit: limit,
          _page: page,
          _sortDir: "DESC",
        },
      })

      setTotalCount(respons.data.dataCount)
      setUsers(respons.data.data)

      formik.handleReset()
    } catch (err) {
      console.log(err)
    }
  }

  if (authSelector.RoleId !== 1) {
    navigate("/admin/dashboard")
    toast({
      title: "Admin Unauthorized",
    })
  }

  const getUser = async () => {
    try {
      const resp = await axiosInstance.get(`/auth`)

      setUserId(resp.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getWarehouse = async () => {
    try {
      const responWare = await axiosInstance.get(`/warehouses`)

      setWarehouse(responWare.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBtn = async (id) => {
    try {
      const resDelete = await axiosInstance.delete(`/warehouse-user/${id}`)
      fetchWareUser()
      getUser()
      getWarehouse()
      toast({
        title: "User telah dihapus",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "User Gagal dihapus",
        status: "error",
      })
    }
  }

  const userEdit = (UserId, WarehouseId, id) => {
    setOpenModal(true)
    setUserIdEdit(UserId)
    setWarehouseEdit(WarehouseId)
    setIdEdit(id)
  }

  const renderUser = () => {
    return users.map((val) => {
      return (
        <Tr key={val.id}>
          <Td textAlign="center" border="1px solid black">
            {val.UserId}
          </Td>
          <Td textAlign="center" border="1px solid black">
            {val.WarehouseId}
          </Td>
          <Td textAlign="center" border="1px solid black" w="50px">
            <Button
              alignContent={"left"}
              onClick={() => userEdit(val.UserId, val.WarehouseId, val.id)}
              mx="4"
              colorScheme={"teal"}
            >
              <FaRegEdit />
            </Button>
            <Button onClick={() => deleteBtn(val.id)} colorScheme="red" mx="4">
              <RiDeleteBin2Line />
            </Button>
          </Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchWareUser()
    getUser()
    getWarehouse()
  }, [page])

  const formik = useFormik({
    initialValues: {
      UserId: "",
      WarehouseId: "",
      id: "",
    },

    onSubmit: async (values) => {
      try {
        const { UserId, WarehouseId } = values

        let newWareUser = {
          UserId,
          WarehouseId,
        }

        await axiosInstance.post(`/warehouse-user/`, newWareUser)
        formik.setFieldValue(UserId, "")
        formik.setFieldValue(WarehouseId, "")
        formik.setSubmitting(false)

        fetchWareUser()
        getUser()
        getWarehouse()
        toast({
          title: "User telah ditambahkan",
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "User Id telah ada",
          description: "Hanya warehouse admin yang dapat ditambahkan",
          status: "error",
        })
      }
    },

    validationSchema: Yup.object({
      UserId: Yup.number().required(),
      WarehouseId: Yup.number().required(),
    }),
    validateOnChange: false,
  })

  const renderPageButton = () => {
    const totalPage = Math.ceil(totalCount / limit)

    const pageArray = new Array(totalPage).fill(null).map((val, i) => ({
      id: i + 1,
    }))

    return pageArray.map((val) => {
      return (
        <PageButton
          key={val.id.toString()}
          id={val.id}
          onClick={() => setPage(val.id)}
        />
      )
    })
  }

  const formChange = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  return (
    <>
      <Flex h="100%" w="full" direction="column">
        <Flex w="full" justifyContent="center">
          <HStack mt="3" wrap="wrap" justifyContent="center">
            <Grid templateColumns="repeat(2, 1fr)" gap="4">
              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.UserId}>
                  <FormLabel>User Id</FormLabel>
                  <Select
                    borderColor="black"
                    name="UserId"
                    onChange={formChange}
                  >
                    <option value="">Select UserId</option>
                    {userId.map((val) => (
                      <option value={val.id}>
                        {val.id}. {val.name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{formik.errors.UserId}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.WarehouseId}>
                  <FormLabel>Warehouse Id</FormLabel>
                  <Select
                    borderColor="black"
                    name="WarehouseId"
                    onChange={formChange}
                  >
                    <option value="">Select Warehouse Id</option>
                    {warehouse.map((val) => (
                      <option value={val.id}>
                        {val.id}. {val.warehouse_name}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {formik.errors.WarehouseId}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>

            <Box w="full" h="8%"></Box>

            <Button onClick={formik.handleSubmit} my="4" colorScheme="teal">
              Add Warehouse User
            </Button>
          </HStack>
        </Flex>
        <Box w="full" h="2.5%"></Box>

        <Container maxW="container.sm" py="8" pb="5" px="1">
          <TableContainer border={"1px solid black"} mt={8} overflowY="unset">
            <Table responsive="md" variant="simple">
              <Thead position={"sticky"} top={-1} backgroundColor={"#718096"}>
                <Tr border={"1px solid black"} maxW="50px">
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  >
                    UserId
                  </Th>
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  >
                    WarehouseId
                  </Th>
                </Tr>
              </Thead>
              <Tbody maxWidth="max-content"> {renderUser()}</Tbody>
            </Table>
          </TableContainer>
        </Container>

        <HStack w="full" alignSelf="flex-end" justifyContent="center">
          {renderPageButton()}
          <Box>
            Page {page}/{Math.ceil(totalCount / limit)}
          </Box>
        </HStack>
        <Box h="4%" w="full"></Box>
      </Flex>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditWarehouseUser
          userIdEdit={userIdEdit}
          users={users}
          setUserIdEdit={setUserIdEdit}
          warehouseEdit={warehouseEdit}
          setWarehouseEdit={setWarehouseEdit}
          idEdit={idEdit}
          setOpenModal={setOpenModal}
          fetchWareUser={fetchWareUser}
          getUser={getUser}
          warehouse={warehouse}
          userId={userId}
        />
      </Modal>
    </>
  )
}

export default WarehouseUser
