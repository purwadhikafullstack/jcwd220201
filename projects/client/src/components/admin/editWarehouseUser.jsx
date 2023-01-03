import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
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
import { axiosInstance } from "../../api"

const EditWarehouseUser = (props) => {
  const toast = useToast()
  const {
    userIdEdit,
    setUserIdEdit,
    warehouseEdit,
    setWarehouseEdit,
    fetchWareUser,
    getUser,
    idEdit,
    setOpenModal,
    warehouse,
    userId,
  } = props

  const formik = useFormik({
    initialValues: {
      UserId: "",
      WarehouseId: "",
    },

    onSubmit: async (values) => {
      try {
        const { UserId, WarehouseId } = values

        let editWareUser = {
          UserId: userIdEdit,
          WarehouseId: warehouseEdit,
        }

        const respons = await axiosInstance.patch(
          `/warehouse-user/${idEdit}`,
          editWareUser
        )

        setOpenModal(false)
        fetchWareUser()
        getUser()

        toast({
          title: "WarehouseUser telah diedit",
          description: respons.data.message,
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Edit User Gagal",
          status: "error",
        })
      }
    },
  })

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Warehouse User</ModalHeader>
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
              <FormControl>
                <FormLabel>
                  User Id
                  <Select
                    value={userIdEdit}
                    onChange={(e) => setUserIdEdit(e.target.value)}
                    name="UserId"
                  >
                    <option value="">Select UserId</option>
                    {userId.map((val) => (
                      <option value={val.id}>
                        {val.id}. {val.name}
                      </option>
                    ))}
                  </Select>
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Warehouse Id
                  <Select
                    value={warehouseEdit}
                    onChange={(e) => setWarehouseEdit(e.target.value)}
                    name="WarehouseId"
                  >
                    <option value="">Select Warehouse Id</option>
                    {warehouse.map((val) => (
                      <option value={val.id}>
                        {val.id}. {val.warehouse_name}
                      </option>
                    ))}
                  </Select>
                </FormLabel>
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

export default EditWarehouseUser
