import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"
import { MdDelete, MdDeleteForever } from "react-icons/md"

import axios from "axios"

const EditProduct = (props) => {
  const inputFileRef = useRef()
  const toast = useToast()
  const { id } = useParams()
  const [file, setFile] = useState("")

  const {
    nameEdit,
    setNameEdit,
    descEdit,
    setDescEdit,
    priceEdit,
    setPriceEdit,
    catEdit,
    setCatEdit,
    imageEdit,
    setImageEdit,
    weightEdit,
    setWeightEdit,
    fetchProduct,
    getCategories,
    categories,
    fetchImage,
    idEdit,
    setOpenModal,
  } = props

  const formik = useFormik({
    initialValues: {
      product_name: "",
      description: "",
      price: "",
      CategoryId: "",
      product_picture: null,
      weight: "",
    },

    onSubmit: async ({
      product_name,
      description,
      price,
      CategoryId,
      product_picture,
      weight,
    }) => {
      try {
        let editProduct = {
          product_name: nameEdit,
          description: descEdit,
          price: priceEdit,
          CategoryId: catEdit,
          product_picture: imageEdit,
          weight: weightEdit,
        }

        const response = await axiosInstance.patch(
          `/product-admin/${idEdit}`,
          editProduct
        )
        formik.setFieldValue(imageEdit, [])
        setOpenModal(false)
        fetchProduct()
        getCategories()
        // fetchImage()
        toast({
          title: "Produk telah diedit",
          description: response.data.message,
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Edit Gagal",
          status: "error",
        })
      }
    },
  })

  const deleteBtn = async (id) => {
    try {
      const res = await axiosInstance.delete(`product-admin/image/${id}`)

      fetchProduct()
      fetchImage()
      toast({
        title: "Produk berhasil dihapus",
        status: "success",
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleImageEdit = async (e) => {
    try {
      const newImg = new FormData()

      newImg.append("product_picture", e)
      console.log(newImg, "newimg")
      const resp = await axiosInstance.post(
        `/product-admin/image/${idEdit}`,
        newImg
      )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
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
                  Nama Produk
                  <Input
                    value={nameEdit}
                    onChange={(e) => setNameEdit(e.target.value)}
                    name="product_name"
                  />
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Deskripsi
                  <Textarea
                    value={descEdit}
                    onChange={(e) => setDescEdit(e.target.value)}
                    name="description"
                  />
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Harga
                  <Input
                    value={priceEdit}
                    onChange={(e) => setPriceEdit(e.target.value)}
                    name="price"
                  />
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Category_id
                  <Select
                    value={catEdit}
                    onChange={(e) => setCatEdit(e.target.value)}
                    name="category_id"
                  >
                    <option value="">Select Category</option>
                    {categories.map((val) => (
                      <option value={val.id}>
                        {val.id}. {val.category}
                      </option>
                    ))}
                  </Select>
                </FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>Foto Produk</FormLabel>
                <Button w="full" onClick={() => inputFileRef.current.click()}>
                  + Tambahkan Foto
                </Button>
                <Input
                  accept="image/*"
                  type="file"
                  name="product_picture"
                  ref={inputFileRef}
                  display="none"
                  onChange={(e) => handleImageEdit(e.target.files[0])}
                />
                {imageEdit ? (
                  <>
                    {imageEdit.map((item) => (
                      <>
                        {item.product_picture ? (
                          <>
                            <Flex>
                              <Image
                                boxSize="100px"
                                src={`http://localhost:8000/public/${item.product_picture}`}
                              ></Image>
                              <Button
                                boxSize="10"
                                w="6vh"
                                colorScheme="red"
                                alignSelf="center"
                                onClick={() => {
                                  deleteBtn(item.id)
                                }}
                              >
                                <MdDeleteForever />
                              </Button>
                            </Flex>
                          </>
                        ) : (
                          <>
                            <Flex>
                              <Image
                                boxSize="100px"
                                src={`http://localhost:8000/public/${item.name}`}
                              ></Image>
                              <Button
                                boxSize="10"
                                w="6vh"
                                colorScheme="red"
                                alignSelf="center"
                                onClick={() => {
                                  deleteBtn(item.id)
                                }}
                              >
                                <MdDeleteForever />
                              </Button>
                            </Flex>
                          </>
                        )}
                      </>
                    ))}
                  </>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>
                  Berat Barang
                  <Input
                    value={weightEdit}
                    onChange={(e) => setWeightEdit(e.target.value)}
                    name="weight"
                  />
                </FormLabel>
              </FormControl>
            </Container>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={formik.handleSubmit}>
            Edit Data
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default EditProduct
