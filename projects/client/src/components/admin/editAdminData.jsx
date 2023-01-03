import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { axiosInstance } from "../../api"

const EditAdminData = (props) => {
  // =======================================
  // Props deconstruct
  const {
    fetchAdminUser,
    setOpenModal,
    getUser,
    idEdit,
    nameEdit,
    emailEdit,
    passwordEdit,
    roleIdEdit,
    setNameEdit,
    setEmailEdit,
    setPasswordEdit,
    setRoleIdEdit,
  } = props

  // =======================================
  const toast = useToast()

  const [show, setShow] = useState(false)

  // =======================================
  // Form Control
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

        let editAdminData = {
          name: nameEdit,
          email: emailEdit,
          password: passwordEdit,
          RoleId: roleIdEdit,
        }

        const respons = await axiosInstance.patch(
          `/admin-user/${idEdit}`,
          editAdminData
        )

        setOpenModal(false)
        fetchAdminUser()
        getUser()

        toast({
          title: "Admin Data telah diedit",
          description: respons.data.message,
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Edit Admin Gagal",
          status: "error",
        })
      }
    },
  })

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Admin Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Container
              maxW="container.lg"
              w={"400px"}
              align={"center"}
              padding={"10px"}
              ringColor={"blue.500"}
            >
              <FormControl maxW="100%" isInvalid={formik.errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  borderColor="black"
                  value={nameEdit}
                  name="name"
                  onChange={(e) => {
                    setNameEdit(e.target.value)
                  }}
                />
              </FormControl>

              <FormControl maxW="100%" isInvalid={formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  borderColor="black"
                  value={emailEdit}
                  name="email"
                  onChange={(e) => {
                    setEmailEdit(e.target.value)
                  }}
                />
              </FormControl>

              <FormControl maxW="100%" isInvalid={formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    borderColor="black"
                    value={passwordEdit}
                    name="password"
                    type={show ? "text" : "password"}
                    onChange={(e) => {
                      setPasswordEdit(e.target.value)
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button size="sm" onClick={() => setShow(!show)}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl maxW="100%" isInvalid={formik.errors.RoleId}>
                <FormLabel>Role</FormLabel>
                <Select
                  value={roleIdEdit}
                  borderColor="black"
                  name="RoleId"
                  onChange={(e) => {
                    setRoleIdEdit(e.target.value)
                  }}
                >
                  <option value="">Select Warehouse Id</option>
                  <option value={1}>1. Admin</option>
                  <option value={2}>2. Admin Warehouse</option>
                </Select>
              </FormControl>
            </Container>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
            Edit Warehouse User
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default EditAdminData
