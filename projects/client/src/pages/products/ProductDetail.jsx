import {
  Container,
  Flex,
  SimpleGrid,
  Image,
  Stack,
  Box,
  Heading,
  Text,
  VStack,
  StackDivider,
  List,
  ListItem,
  Button,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  useNumberInput,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react"
import { Carousel } from "react-responsive-carousel"
import { useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css"
// import "../products/ProductDetail.css"
import { axiosInstance } from "../../api"
import { useEffect } from "react"
import Navbar from "../layout/Navbar"
import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import { useDispatch, useSelector } from "react-redux"
import { addProductToCart, itemCart } from "../../redux/features/cartSlice"
import { Rupiah } from "../../lib/currency/Rupiah"

const ProductDetail = () => {
  const [produck, setProducts] = useState({
    id: "",
    product_name: "",
    description: "",
    price: 0,
    weight: 0,
    Category: "",
  })

  // State Functionality
  const [productId, setProductId] = useState([])
  const [productImg, setProductImg] = useState([])
  const [productStock, setProductStock] = useState([])
  const [cartQty, setCartQty] = useState(null)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const authSelector = useSelector((state) => state.auth)
  const location = useLocation()
  const dispatch = useDispatch()
  const toast = useToast()
  const params = useParams()

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${params.id}`)

      setProducts(response.data.data)
      setProductImg(response.data.data.ProductPictures)
      // setProductStock(response.data.data.ProductStocks)
      setProductId(response.data.data.id)

      const cartStock = response.data.data.ProductStocks.map((val) => val.stock)
      let total = 0
      for (let i = 0; i < cartStock.length; i++) {
        total += Number(cartStock[i])
      }
      setProductStock(total)
    } catch (err) {
      console.log(err)
    }
  }
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: productStock,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()
  const qty = Number(input.value)

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/carts/me")
      dispatch(itemCart(response.data.data))
    } catch (err) {
      console.log(err)
    }
  }
  const fetchCartByProduct = async () => {
    try {
      const response = await axiosInstance.get(
        `/carts/cart-product/ProductId/${productId}`
      )

      if (response.data.data === null) {
        setCartQty(null)
      } else {
        setCartQty(response.data.data.quantity)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const addToCart1 = async () => {
    try {
      let addToCart1 = {
        ProductId: productId,
        quantity: qty,
      }
      const response = await axiosInstance.post("/carts", addToCart1)

      dispatch(addProductToCart(response.data.data))

      toast({
        title: "Berhasil Ditambahkan",
        status: "success",
        duration: 1000,
      })
      fetchCartByProduct()
      fetchCart()
    } catch (err) {
      console.log(err)
      toast({
        title: "Gagal Menambahkan Barang",
        status: "error",
        duration: 1000,
        description: err.response.data.message,
      })
    }
  }

  // Validate User Functionality
  const validateUser = () => {
    if (!authSelector.id) {
      onOpen()
    }
  }

  const navigateLogin = () => {
    onClose()
  }

  const updateAddProduct = async () => {
    try {
      let updateQty = {
        quantity: qty,
      }
      await axiosInstance.patch(`/carts/addQty/${productId}`, updateQty)
      toast({
        title: "Berhasil Ditambahkan",
        status: "success",
        duration: 1000,
      })

      fetchCartByProduct()
      fetchCart()
    } catch (err) {
      console.log(err)
      const sisaProduk = productStock - cartQty
      toast({
        title: `Barang sudah ada di keranjang tersisa ${sisaProduk}, hanya menambah Quantity ${cartQty}`,
        status: "error",
        duration: 1000,
        description: err.response.data.message,
      })
    }
  }

  // Depedency BUG
  // useEffect(() => {
  //   fetchCart()
  //   fetchCartByProduct()
  //   fetchProduct()
  // }, [qty, cartQty, produck])

  useEffect(() => {
    fetchCart()
    fetchCartByProduct()
    fetchProduct()
  }, [qty, cartQty])

  return (
    <>
      <Navbar />
      <Container maxW="7xl">
        <SimpleGrid
          spacing={{ base: 8, md: 10 }}
          columns={{ base: 1, lg: 2 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Carousel showStatus={false} showThumbs={false}>
              {productImg.map((val) => (
                <Image
                  // className="image-prod-detail"
                  h={{ base: "100%", sm: "400px", lg: "500px" }}
                  src={`http://localhost:8000/public/${val.product_picture}`}
                  align="center"
                  rounded="md"
                  fit="cover"
                  w="100%"
                />
              ))}
            </Carousel>
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as="header">
              <Heading
                fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
                fontFamily="heading"
                fontWeight="400"
                lineWeight="1.1"
              >
                {produck.product_name}
              </Heading>
              <Text color="gray.900" fontWeight="300" fontSize="2xl">
                {Rupiah(produck.price)}
              </Text>
            </Box>
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={{ base: 4, sm: 6 }}
              direction="column"
            >
              <VStack>
                <Text fontSize="lg" fontWeight="400">
                  {produck.description ||
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit Architecto facilis eos, odio unde fugiat repudiandae"}
                </Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight="500"
                  color="teal.500"
                  mb="4"
                >
                  Produk Detail
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as="span" fontWeight="thin">
                      Kondisi:
                    </Text>{" "}
                    Baru
                  </ListItem>
                  <ListItem>
                    <Text as="span" fontWeight="thin">
                      Berat Satuan:
                    </Text>{" "}
                    {produck.weight} gram
                  </ListItem>
                  <ListItem>
                    <Text as="span" fontWeight="thin">
                      Kategori:
                    </Text>{" "}
                    {produck.Category?.category || "Kategori"}
                  </ListItem>

                  <ListItem>
                    <Text as="span" fontWeight="thin">
                      Stock:
                    </Text>{" "}
                    {productStock}
                  </ListItem>
                </List>
              </Box>
            </Stack>
            <HStack alignSelf="center" maxW="320px">
              <InputGroup>
                <InputLeftElement>
                  <Button
                    isDisabled={productStock <= qty}
                    {...inc}
                    variant="unstyled"
                  >
                    <AddIcon
                      color={productStock <= qty ? "#c0cada" : "#0095DA"}
                    />
                  </Button>
                </InputLeftElement>
                <Input
                  width="10em"
                  textAlign="center"
                  {...input}
                  _hover={"none"}
                  isDisabled={productStock === 0 ? true : false}
                />
                <InputRightElement>
                  <Button variant="unstyled">
                    <MinusIcon
                      {...dec}
                      color={qty > 1 ? "#0095DA" : "#c0cada"}
                    />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </HStack>
            <Text as="span" fontWeight="thin">
              Subtotal: {Rupiah(produck.price * qty)}
            </Text>{" "}
            {cartQty === null ? (
              <Button
                _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                textTransform="uppercase"
                color="gray.900"
                bg="teal.500"
                size="md"
                w="full"
                mt="8"
                py="6"
                rounded="none"
                onClick={authSelector.id ? addToCart1 : validateUser}
              >
                Masukkan Keranjang
              </Button>
            ) : (
              <Button
                _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                textTransform="uppercase"
                color="gray.900"
                bg="teal.500"
                size="md"
                w="full"
                mt="8"
                py="6"
                rounded="none"
                onClick={authSelector.id ? updateAddProduct : validateUser}
              >
                Masukkan Keranjang
              </Button>
            )}
          </Stack>
        </SimpleGrid>
      </Container>

      {/* User Validate Modal  */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tidak dapat Menambahkan Barang !</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Silahkan Login atau Register terlebih dahulu untuk bisa beli produk
            ini . Terimakasih 😄
          </ModalBody>
          <ModalFooter gap="3">
            <Link to="/login" replace state={{ from: location }}>
              <Button colorScheme="green" onClick={navigateLogin}>
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="teal">Register</Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProductDetail
