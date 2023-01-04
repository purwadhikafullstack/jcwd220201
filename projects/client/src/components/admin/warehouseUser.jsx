import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
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
  Input,
  InputGroup,
  Modal,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useRef } from "react"
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
import Select from "react-select"

const WarehouseUser = () => {
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState([])
  const [warehouse, setWarehouse] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [userIdEdit, setUserIdEdit] = useState("")
  const [warehouseEdit, setWarehouseEdit] = useState("")
  const [idEdit, setIdEdit] = useState("")
  const [page, setPage] = useState(1)

  const [sortBy, setSortBy] = useState("UserId")
  const [sortDir, setSortDir] = useState("DESC")
  const [filter, setFilter] = useState("All")
  const [currentSearch, setCurrentSearch] = useState("")

  const [limit, setLimit] = useState(5)
  const [totalCount, setTotalCount] = useState(0)
  const toast = useToast()
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const btnRef = useRef()

  const fetchWareUser = async () => {
    try {
      const respons = await axiosInstance.get(`/warehouse-user`, {
        params: {
          _limit: limit,
          _page: page,
          _sortDir: "DESC",
          _sortDir: sortDir,
          _sortBy: sortBy,
          WarehouseId: filter,
          name: currentSearch,
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

  const sortUsertHandler = (event) => {
    const value = event.value
    setSortBy(value.split(" ")[0])
    setSortDir(value.split(" ")[1])
  }

  const filterWarehouseHandler = (event) => {
    const value = event.value

    setFilter(value)
  }

  const formikSearch = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search)
    },
  })

  const searchHandler = ({ target }) => {
    const { name, value } = target
    formikSearch.setFieldValue(name, value)
  }

  const btnResetFilter = () => {
    setCurrentSearch(false)
    setSortBy(false)
    setFilter(false)
    window.location.reload(false)
  }

  useEffect(() => {
    fetchWareUser()
    getUser()
    getWarehouse()
  }, [page, sortBy, sortDir, filter, currentSearch])

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

  const userOption = userId.map((val) => {
    return { value: val.id, label: val.name }
  })
  const warehouseOption = warehouse.map((val) => {
    return { value: val.id, label: val.warehouse_name }
  })

  const sortUser = [
    { value: "UserId ASC", label: "A-Z" },
    { value: "UserId DESC", label: "Z-A" },
  ]

  const customStyles = {
    control: (base) => ({
      ...base,
      width: "min-content",
      minWidth: "25vh",
    }),
  }

  return (
    <>
      <Flex h="100%" w="full" direction="column">
        <Flex w="full" justifyContent="center">
          <VStack mt="3" wrap="wrap" justifyContent="center">
            <Grid
              gap="-4"
              w={"-moz-min-content"}
              templateColumns={"repeat(4, 1fr)"}
              mt="8"
              mb="4"
              ml="10%"
            >
              <Select
                onChange={filterWarehouseHandler}
                fontSize={"15px"}
                bgColor="white"
                styles={customStyles}
                placeholder="Filter By Warehouse"
                options={warehouseOption}
              ></Select>
              <Select
                onChange={(e) => {
                  sortUsertHandler(e)
                }}
                fontSize={"15px"}
                bgColor="white"
                styles={customStyles}
                placeholder="Sort By UserId"
                options={sortUser}
              ></Select>

              <form onSubmit={formikSearch.handleSubmit}>
                <FormControl>
                  <InputGroup textAlign={"right"}>
                    <Input
                      type={"text"}
                      placeholder="Search By Name"
                      name="search"
                      bgColor={"white"}
                      h="4vh"
                      onChange={searchHandler}
                      borderRightRadius="0"
                      value={formikSearch.values.search}
                    />

                    <Button
                      borderLeftRadius={"0"}
                      bgColor={"white"}
                      type="submit"
                      h="4vh"
                      border="1px solid #e2e8f0"
                      borderLeft={"0px"}
                    >
                      search
                    </Button>
                  </InputGroup>
                </FormControl>
              </form>

              <Button
                onClick={btnResetFilter}
                p="3"
                w="12vh"
                h="4vh"
                ml="6"
                bgColor="white"
                variant="solid"
                _hover={{ borderBottom: "2px solid " }}
              >
                Reset Filter
              </Button>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap="10">
              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.UserId}>
                  <FormLabel>User Id</FormLabel>
                  <Select
                    styles={customStyles}
                    borderColor="black"
                    name="UserId"
                    onChange={(e) => {
                      formik.setFieldValue("UserId", e.value)
                    }}
                    value={{ label: formik.values.UserId }}
                    options={userOption}
                  ></Select>
                  <FormErrorMessage>{formik.errors.UserId}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.WarehouseId}>
                  <FormLabel>Warehouse Id</FormLabel>
                  <Select
                    styles={customStyles}
                    borderColor="black"
                    name="WarehouseId"
                    onChange={(e) => {
                      formik.setFieldValue("WarehouseId", e.value)
                    }}
                    value={{ label: formik.values.WarehouseId }}
                    options={warehouseOption}
                  ></Select>
                  <FormErrorMessage>
                    {formik.errors.WarehouseId}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>
            <Button onClick={formik.handleSubmit} my="4" colorScheme="teal">
              Add Warehouse User
            </Button>
          </VStack>
        </Flex>

        <Container maxW="container.lg" py="8" pb="5" px="1">
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
                    Nama admin
                  </Th>
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  >
                    WarehouseId
                  </Th>
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  >
                    Nama Warehouse
                  </Th>
                </Tr>
              </Thead>

              <Tbody maxWidth="max-content">
                {users.map((val) => (
                  <Tr key={val.id}>
                    <Td textAlign="center" border="1px solid black">
                      {val.UserId}
                    </Td>
                    <Td textAlign="center" border="1px solid black">
                      {val.User.name}
                    </Td>
                    <Td textAlign="center" border="1px solid black">
                      {val.WarehouseId}
                    </Td>

                    <Td textAlign="center" border="1px solid black">
                      {val.Warehouse.warehouse_name}
                    </Td>
                    <Td textAlign="center" border="1px solid black" w="50px">
                      <Button
                        alignContent={"left"}
                        onClick={() =>
                          userEdit(val.UserId, val.WarehouseId, val.id)
                        }
                        mx="4"
                        colorScheme={"teal"}
                      >
                        <FaRegEdit />
                      </Button>
                      <Button
                        ref={btnRef}
                        onClick={onOpen}
                        colorScheme="red"
                        mx="4"
                      >
                        <RiDeleteBin2Line />
                      </Button>
                      <AlertDialog
                        isOpen={isOpen}
                        onClose={onClose}
                        leastDestructiveRef={cancelRef}
                        motionPreset="slideInBottom"
                        isCentered
                        finalFocusRef={btnRef}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontStyle="bold">
                              Hapus Admin
                            </AlertDialogHeader>
                            <AlertDialogCloseButton />

                            <AlertDialogBody>
                              Apakah Yakin Ingin Menghapus Warehouse Admin??
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button
                                mr="10px"
                                ref={cancelRef}
                                onClick={onClose}
                              >
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => deleteBtn(val.id)}
                              >
                                Hapus
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
        {!users.length ? (
          <Alert
            status="error"
            variant="subtle"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            alignSelf="center"
            h="200px"
            w="70%"
          >
            <AlertIcon boxSize="20px" mr="0" />
            <AlertTitle>Oops, produk tidak ditemukan !</AlertTitle>
            <AlertDescription>Coba kata kunci lain</AlertDescription>
          </Alert>
        ) : null}

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
