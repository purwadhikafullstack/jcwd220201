import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link as LinkChakra,
  Stack,
  Text,
  Grid,
  GridItem,
  Image,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  useColorModeValue,
  useToast,
  Checkbox,
  Divider,
  AlertDescription,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"
import { AiFillDelete } from "react-icons/ai"
import { FaArrowRight } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../api"
import CartItem from "../components/cart/CartItem"
import { getSubTotal, getTotalQty, itemCart } from "../redux/features/cartSlice"
import { Link as LinkRouterDom } from "react-router-dom"
import { Rupiah } from "../lib/currency/Rupiah"
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"

const CartPage = () => {
  const [allProductCheck, setAllProductCheck] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cartSelector = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const toast = useToast()

  const fetchCartItem = async () => {
    try {
      const response = await axiosInstance.get("/carts/me")

      dispatch(itemCart(response.data.data))

      const productCheck = response.data.data.map((val) => val.is_checked)

      if (!productCheck.includes(false)) {
        setAllProductCheck(true)
      } else {
        setAllProductCheck(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const checkAllProduct = async () => {
    try {
      const response = await axiosInstance.patch("/carts/checkAllProduct")

      const productCheck = response.data.data.map((val) => val.is_checked)

      if (!productCheck.includes(false)) {
        setAllProductCheck(true)
      } else {
        setAllProductCheck(false)
      }

      fetchCartItem()
      totalHarga()
    } catch (err) {
      console.log(err)
    }
  }

  const totalHarga = async () => {
    try {
      const response = await axiosInstance.get("/carts/price/total")
      console.log("response", response)
      dispatch(getSubTotal(response.data.data.totalPrice))
      dispatch(getTotalQty(response.data.data.totalQty))
      fetchCartItem()
    } catch (err) {
      console.log(err)
    }
  }
  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`carts/${id}`)

      fetchCartItem()
      totalHarga()
      onClose()
      toast({ tittle: "Produk Dihapus", status: "success" })
    } catch (err) {
      console.log(err)
    }
  }

  const btnDeleteAll = async () => {
    try {
      await axiosInstance.delete("/carts/delete/all")

      fetchCartItem()
      totalHarga()
      onClose()
      toast({ title: "Semua Barang Dihapus", status: "success" })
    } catch (err) {
      console.log(err)
    }
  }
  const renderCartItem = () => {
    return cartSelector.cart.map((val) => {
      return (
        <CartItem
          key={val.id.toString()}
          productId={val.ProductId}
          product_name={val.Product.product_name}
          price={val.Product.price}
          quantity={val.quantity}
          product_picture={val.Product.ProductPictures[0].product_picture}
          CartId={val.id}
          fetchCartItem={fetchCartItem}
          isChecked={val.is_checked}
          checkAllProduct={allProductCheck}
          onDelete={() => deleteProduct(val.id)}
          totalHarga={totalHarga}
        />
      )
    })
  }

  useEffect(() => {
    fetchCartItem()
    totalHarga()
  }, [])
  if (!cartSelector.cart.length) {
    return (
      <>
        <Navbar />
        <Alert
          status="error"
          variant="subtle"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          h="200px"
        >
          <AlertIcon boxSize="40px" mr="0" />
          <AlertTitle>Oops, produk nggak ditemukan !</AlertTitle>
          <AlertDescription>
            Coba kata kunci lain atau cek produk rekomendasi kami. Terimakasih{" "}
            <span size="lg">🤯</span>
          </AlertDescription>
          <Button>
            <a href="/product">Lanjut Belanja</a>
          </Button>
        </Alert>
      </>
    )
  } else {
    return (
      <>
        <Navbar />
        <Box
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing={{ base: "8", md: "16" }}
          >
            <Stack spacing={{ base: "8", md: "10" }} flex="2">
              <Heading fontSize="2xl" fontWeight="extrabold">
                Keranjang
              </Heading>
              <Flex justifyContent="space-between">
                <Checkbox
                  colorScheme="teal"
                  isChecked={allProductCheck}
                  borderColor="teal"
                  size="lg"
                  onChange={() => checkAllProduct()}
                >
                  <Text>Pilih Semua</Text>
                </Checkbox>
                {allProductCheck !== true ? null : (
                  <Text
                    fontSize="17px"
                    fontWeight="700"
                    color="teal"
                    cursor="pointer"
                    // position={"relative"}
                    onClick={() => onOpen()}
                  >
                    Hapus
                  </Text>
                )}
              </Flex>
              <Divider backgroundColor="#F3F4F5" border="5px" />

              <Stack spacing="6">{renderCartItem()}</Stack>
            </Stack>

            {/* Ringkasan Belanja */}
            <Flex direction="column" align="center" flex="1">
              <Stack
                spacing="8"
                borderWidth="1px"
                rounded="lg"
                padding="8"
                width="full"
              >
                <Heading size="md">Ringkasan Belanja</Heading>

                <Stack spacing="6">
                  <Flex justify="space-between" fontSize="sm">
                    {/* <Text
                      fontWeight="medium"
                      color={useColorModeValue("gray.600", "gray.400")}
                    > */}
                    <Text fontWeight="medium" color="gray.600">
                      Subtotal (Produk)
                    </Text>
                    <Text fontWeight="medium">
                      {/* {Rupiah(cartSelector.totalPrice)} */}
                      {Rupiah(cartSelector.subTotal)}
                    </Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text fontSize="lg" fontWeight="semibold">
                      Total Harga
                    </Text>
                    <Text fontSize="xl" fontWeight="extrabold">
                      {Rupiah(cartSelector.subTotal)}
                    </Text>
                  </Flex>
                </Stack>
                <Button
                  colorScheme="teal"
                  _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
                  size="lg"
                  fontSize="lg"
                  rightIcon={<FaArrowRight />}
                >
                  Beli ( )
                </Button>
              </Stack>

              {/* ========================================================= */}
              <HStack mt="6" fontWeight="semibold">
                <p>atau</p>

                <LinkChakra color="teal.500">
                  <LinkRouterDom to="/product">Lanjut Belanja</LinkRouterDom>
                </LinkChakra>
              </HStack>
            </Flex>
          </Stack>
        </Box>
        <Footer />

        {/* Delete Product */}
        <AlertDialog isOpen={isOpen} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Hapus {cartSelector.cart.length} Barang
              </AlertDialogHeader>

              <AlertDialogBody>
                Barang yang kamu pilih akan dihapus dari keranjang.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose}>Kembali</Button>
                <Button colorScheme="red" onClick={btnDeleteAll} ml={3}>
                  Hapus
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
}

export default CartPage
