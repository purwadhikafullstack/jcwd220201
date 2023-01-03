import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Button,
  ModalFooter,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { axiosInstance } from "../../../api"

const EditStock = (props) => {
  const {
    stockEdit,
    setStockEdit,
    fetchProductWarehouse,
    data,

    idEdit,
    setOpenModal,
  } = props
  const toast = useToast()

  const editFormik = useFormik({
    initialValues: {
      stock: "",
    },
    onSubmit: async () => {
      try {
        let rgs = { stock: stockEdit }
        const response = await axiosInstance.patch(
          `/admin/stock/update_stock/${idEdit}`,
          //   { stock }
          rgs
        )

        editFormik.setFieldValue("stock", "")
        setOpenModal(false)
        fetchProductWarehouse()
        toast({
          title: "Stock Diperbaharui",
          description: response.data.message,
          status: "success",
        })
        // setEditConfirm(null)
      } catch (err) {
        console.log(err)
        toast({
          title: "Gagal Memperbaharui Stok",
          description: err.response.data.data.message,
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({ stock: Yup.number() }),
    validateOnChange: false,
  })

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ubah Stok</ModalHeader>
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
                  Stok
                  <Input
                    value={stockEdit}
                    onChange={(e) => setStockEdit(e.target.value)}
                    name="stock"
                  />
                </FormLabel>
              </FormControl>
            </Container>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={editFormik.handleSubmit}>
            Edit Data
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default EditStock
