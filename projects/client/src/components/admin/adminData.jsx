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
  Icon,
  Input,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Th,
  Tr,
  useToast,
  InputGroup,
} from "@chakra-ui/react"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { BsThreeDots } from "react-icons/bs"

import { axiosInstance } from "../../api"

import PageButton from "../../components/admin/pageButton.jsx"
import EditAdminData from "./editAdminData"

const AdminData = () => {
  // =======================================

  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const toast = useToast()

  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState([])

  const [openModal, setOpenModal] = useState(false)
  const [idEdit, setIdEdit] = useState("")
  const [nameEdit, setNameEdit] = useState("")
  const [emailEdit, setEmailEdit] = useState("")
  const [passwordEdit, setPasswordEdit] = useState("")
  const [roleIdEdit, setRoleIdEdit] = useState("")

  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [show, setShow] = useState(false)

  // =======================================
  // Fetch Data from Databases

  // Admin User Data
  const fetchAdminUser = async () => {
    try {
      const respons = await axiosInstance.get(`/admin-user/admin`, {
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

  // User
  const getUser = async () => {
    try {
      const resp = await axiosInstance.get(`/auth`)

      setUserId(resp.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  // =======================================
  // Check authentication
  if (authSelector.RoleId !== 1) {
    navigate("/admin/dashboard")
    toast({
      title: "Admin Unauthorized",
    })
  }

  // =======================================
  // Form control
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      RoleId: "",
    },

    onSubmit: async (values) => {
      try {
        const { name, email, password, RoleId } = values

        let newAdmin = {
          name,
          email,
          password,
          RoleId,
        }

        await axiosInstance.post("/admin-user/", newAdmin)
        formik.setFieldValue(name, "")
        formik.setFieldValue(email, "")
        formik.setFieldValue(password, "")
        formik.setFieldValue(RoleId, "")
        formik.setSubmitting(false)

        fetchAdminUser()

        toast({
          title: "Admin telah ditambahkan",
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Admin gagal ditambahkan",
          status: "error",
        })
      }
    },

    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email("Invalid email").required(),
      password: Yup.string().min(8, "Password minimal 8 karakter").required(),
      RoleId: Yup.number().required(),
    }),

    validateOnChange: false,
  })

  // Handle Form Change
  const formChange = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  // =======================================
  // Button

  // Delete Button
  const deleteBtn = async (id) => {
    try {
      const resDelete = await axiosInstance.delete(`/admin-user/${id}`)

      fetchAdminUser()

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

  // Edit Button
  const adminEdit = (id, name, email, RoleId) => {
    setOpenModal(true)
    setNameEdit(name)
    setEmailEdit(email)
    setPasswordEdit()
    setRoleIdEdit(RoleId)
    setIdEdit(id)
  }

  // =======================================
  // Render Display

  // Render Admin User
  const renderUser = () => {
    return users.map((val) => {
      return (
        <Tr key={val.id}>
          <Td textAlign="center" border="1px solid black">
            {val.name}
          </Td>
          <Td textAlign="center" border="1px solid black">
            {val.email}
          </Td>
          <Td textAlign="center" border="1px solid black">
            {val.RoleId === 1 ? "Admin" : "Admin Warehouse"}
          </Td>
          <Td textAlign="center" border="1px solid black" w="50px">
            <Menu>
              <MenuButton>
                <Icon as={BsThreeDots} boxSize="20px" />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    adminEdit(val.id, val.name, val.email, val.RoleId)
                  }
                >
                  Edit
                </MenuItem>
                <MenuItem onClick={() => deleteBtn(val.id)}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </Td>
        </Tr>
      )
    })
  }

  // Render Page Button
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

  // =======================================
  // All Use Effect

  useEffect(() => {
    fetchAdminUser()
  }, [page])

  // =======================================
  // Display

  return (
    <>
      <Flex h="100%" w="full" direction="column">
        <Flex w="full" justifyContent="center">
          <HStack mt="3" wrap="wrap" justifyContent="center">
            <Grid templateColumns="repeat(4, 1fr)" gap="4">
              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    borderColor="black"
                    value={formik.values.name}
                    name="name"
                    onChange={formChange}
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    borderColor="black"
                    value={formik.values.email}
                    name="email"
                    onChange={formChange}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      borderColor="black"
                      value={formik.values.password}
                      name="password"
                      type={show ? "text" : "password"}
                      onChange={formChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button size="sm" onClick={() => setShow(!show)}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.RoleId}>
                  <FormLabel>Role</FormLabel>
                  <Select
                    borderColor="black"
                    name="RoleId"
                    onChange={formChange}
                  >
                    <option value="">Select Warehouse Id</option>
                    <option value={1}>1. Admin</option>
                    <option value={2}>2. Admin Warehouse</option>
                  </Select>
                  <FormErrorMessage>{formik.errors.RoleId}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>

            <Box w="full" h="8%"></Box>

            <Button onClick={formik.handleSubmit} my="4" colorScheme="teal">
              Add Admin
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
                    Name
                  </Th>
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  >
                    Email
                  </Th>
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  >
                    Role
                  </Th>
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  ></Th>
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
        <EditAdminData
          fetchAdminUser={fetchAdminUser}
          setOpenModal={setOpenModal}
          getUser={getUser}
          idEdit={idEdit}
          nameEdit={nameEdit}
          emailEdit={emailEdit}
          passwordEdit={passwordEdit}
          roleIdEdit={roleIdEdit}
          setNameEdit={setNameEdit}
          setEmailEdit={setEmailEdit}
          setPasswordEdit={setPasswordEdit}
          setRoleIdEdit={setRoleIdEdit}
        />
      </Modal>
    </>
  )
}

export default AdminData
