import {
  Box,
  Button,
  Center,
  CloseButton,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect, useRef } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axiosInstance } from "../../api"

import { BsUpload } from "react-icons/bs"
import { ArrowBackIcon } from "@chakra-ui/icons"

const ProductImage = async () => {
  const [images, setImages] = useState({})
  const toast = useToast()
  const { id } = useParams()
  const inputFileRef = useRef()

  const [openId, setOpenId] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const deleteRef = useRef()

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/product-admin/${id}`)
      console.log(response, "get")
      setImages(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBtn = async () => {
    try {
      await axiosInstance.delete(`product-admin/image/${id}`)

      fetchProduct()
      toast({
        title: "Produk berhasil dihapus",
        status: "success",
      })
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      product_picture: null,
    },
    onSubmit: async ({ product_picture }) => {
      try {
        const newImage = new FormData()
        newImage.append("product_picture", product_picture)

        const response = await axiosInstance.post(
          `product-admin/image/${id}`,
          newImage
        )
        window.location.reload(false)

        // fetchImage()
        toast({
          title: "Foto produk berhasil ditambahkan",
          status: "success",
        })
      } catch (err) {
        console.log(err)
      }
    },
  })

  // const formChangeHandler = ({ target }) => {
  //   const { name, value } = target

  //   formik.setFieldValue(name, value)
  // }

  useEffect(() => {
    fetchProduct()
  }, [openId])

  return (
    <Container>
      <Box
        mt="100px"
        ml="7px"
        w={{ base: "54vh", md: "99vw" }}
        p="10px"
        // textAlign={{ base: "center", md: "center" }}
        // border="1px solid black"
      >
        <ArrowBackIcon
          mr="70vh"
          mt="15px"
          fontSize="25px"
          onClick={() => {
            navigate(-1)
          }}
        />
        <Center display="grid">
          <Box
            // mt="50px"
            // mb="20px"
            margin={{ base: "50px 10px 50px", md: "30px auto 70px" }}
            width="35%"

            // justifyContent="center"
            // alignItems="center"
          >
            <Text as="b" fontSize="xx-large" position="absolute" ml="20px">
              Update Your Images
            </Text>
            <br />
            <br />
            <br />

            <Input
              label="Image"
              name="product_picture"
              type="file"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue(event.target.files[0])
              }}
              display="none"
              ref={inputFileRef}
            />
            <Button
              className="btn-img-update"
              onClick={() => {
                inputFileRef.current.click()
              }}
            >
              <Flex gap="10px">
                <Center>
                  <BsUpload />
                </Center>
                <Text>Choose Images</Text>
              </Flex>
            </Button>
          </Box>
          {/* <Flex p={50} w="full" alignItems="center" justifyContent="center"> */}

          {/* <SimpleGrid columns={2} spacingY="20px"> */}
          <Box
            position="relative"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            justifyContent="space-evenly"
            textAlign="center"
            gridGap={{ base: "10px", sm: "50px" }}
          >
            {images.map((val) => (
              <Box
                key={images.id}
                maxW={{ base: "sm", md: "xl" }}
                borderWidth="1px"
                rounded="lg"
                shadow="370px"
                display="flex"
                p="4px"
                mb="24px"
                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 20px"}
                borderRadius="8px"
                // border="1px solid red"
              >
                <CloseButton
                  position="absolute"
                  ml={{ base: "140px", md: "40.5vh" }}
                  mt={{ base: "2px", sm: "8px" }}
                  border="none"
                  color="white"
                  colors
                  onClick={() => {
                    setOpenId(val)
                    onOpen()
                  }}
                  size={{ base: "sm", sm: "sm" }}
                  cursor="pointer"
                />
                <Button
                  onClick={() => {
                    deleteBtn(val.id)
                  }}
                  ref={deleteRef}
                  display="none"
                />

                <Image
                  borderRadius="8px"
                  width="100%"
                  h="100%"
                  objectFit="cover"
                  // src={val.product_picture}
                  src={`http://localhost:8000/public/${val.product_picture}`}
                />
                <Modal isCentered isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent mb="250px">
                    <ModalCloseButton border="none" />
                    <ModalBody>
                      <Text
                        mt="30px"
                        textAlign="center"
                        mb="50px"
                        fontSize="20px"
                        fontWeight="bold"
                      >
                        Are you sure want to delete this image?
                      </Text>
                      <Center>
                        <Button
                          width="200px"
                          color="white"
                          bgColor="red.500"
                          borderRadius="8px"
                          onClick={() => {
                            // deleteRef.current.click()
                            deleteBtn(val.id)

                            onClose()
                          }}
                          _hover={{
                            bgColor: "red.600",
                            borderRadius: "8px",
                          }}
                          mb="20px"
                        >
                          Delete
                        </Button>
                      </Center>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            ))}
          </Box>
        </Center>
        {/* </SimpleGrid> */}
      </Box>
    </Container>
  )
}
export default ProductImage
