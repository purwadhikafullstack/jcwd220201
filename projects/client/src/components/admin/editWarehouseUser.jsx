import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
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
    warehouseEdit,
    setWarehouseEdit,
    fetchWareUser,
    getUser,
    idEdit,
    setOpenModal,
    warehouse,
  } = props

  const formik = useFormik({
    initialValues: {
      WarehouseId: "",
    },

    onSubmit: async () => {
      try {
        let editWareUser = {
          WarehouseId: warehouseEdit,
        }

        const response = await axiosInstance.patch(
          `/warehouse-user/${idEdit}`,
          editWareUser
        )

        setOpenModal(false)
        fetchWareUser()
        getUser()

        toast({
          title: "WarehouseUser telah diedit",
          description: response.data.message,
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Edit User Gagal",
          status: "error",
          description: err.response.data.message,
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
