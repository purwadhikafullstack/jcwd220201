import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Icon,
  Checkbox,
  Divider,
  useDisclosure,
  Button,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@chakra-ui/react"

import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { axiosInstance } from "../../api"
import { Rupiah } from "../../lib/currency/Rupiah"
const CartItem = ({
  product_name,
  price,
  product_picture,
  CartId,
  productId,
  CategoryId,
  category,
  quantity,
  checkAllProduct,
  fetchCartItem,
  totalHarga,
  onDelete,
}) => {
  const [productStock, setProductStock] = useState(0)
  const [checkProduct, setCheckProduct] = useState(false)
  const [qtyProduct, setQtyProduct] = useState(quantity)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cartSelector = useSelector((state) => state.cart)
  const toast = useToast()

  const btnDelete = () => {
    onClose()
    onDelete()
  }
  const fetchCartById = async () => {
    try {
      const response = await axiosInstance.get(`/carts/${CartId}`)

      const cartProductStock = response.data.data.Product.ProductStocks.map(
        (val) => val.stock
      )
      let total = 0

      for (let i = 0; i < cartProductStock.length; i++) {
        total += Number(cartProductStock[i])
      }
      setProductStock(total)

      if (response.data.data.is_checked === true) {
        setCheckProduct(true)
      } else {
        setCheckProduct(false)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const fetchCartByProduct = async () => {
    try {
      const response = await axiosInstance.get(
        `/carts/cart-product/ProductId/${productId}`
      )
    } catch (err) {
      console.log(err)
    }
  }

  const checkPerProduct = async () => {
    try {
      const response = await axiosInstance.patch(
        `/carts/productCheck/${CartId}`
      )
      if (response.data.data.is_checked === true) {
        setCheckProduct(true)
      } else {
        setCheckProduct(false)
      }
      totalHarga()
    } catch (err) {
      console.log(err)
    }
  }

  const addQty = async () => {
    try {
      await axiosInstance.post(`/carts/addQty/${CartId}`)
      fetchCartItem()
      setQtyProduct(quantity + 1)

      totalHarga()
      fetchCartByProduct()
    } catch (err) {
      console.log(err)
    }
  }
  const decQty = async () => {
    try {
      await axiosInstance.patch(`/carts/decQty/${CartId}`)
      fetchCartItem()
      if (quantity <= 1) {
        return 1
      }
      setQtyProduct(quantity - 1)

      totalHarga()
      fetchCartByProduct()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCartById()
    fetchCartByProduct()
    fetchCartItem()
  }, [checkAllProduct, qtyProduct])
  return (
    <>
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        justify="space-between"
        align="center"
      >
        {/* Cart Product Meta */}
        <Stack direction="row" spacing="5" width="full">
          <Checkbox
            colorScheme="teal"
            size="lg"
            borderColor="teal"
            isChecked={checkProduct}
            onChange={() => checkPerProduct()}
          ></Checkbox>
          <Image
            rounded="lg"
            width="120px"
            height="120px"
            fit="cover"
            src={product_picture}
            alt="gambar produk"
            draggable="false"
            loading="lazy"
          />
          <Box pt="4">
            <Stack spacing="0.5">
              <Text fontWeight="medium">{product_name}</Text>
              <Text
                color={useColorModeValue("gray.600", "gray.400")}
                fontSize="sm"
              >
                {category}
              </Text>
            </Stack>
          </Box>
        </Stack>
        {/* =================================================== */}

        {/* Desktop */}
        <Flex
          width="full"
          justify="space-between"
          display={{
            base: "none",
            md: "flex",
          }}
        >
          <Box
            display="flex"
            borderRadius="10px"
            boxShadow="base"
            justifyContent="space-between"
          >
            <Button
              variant="unstyled"
              onClick={addQty}
              isDisabled={productStock <= qtyProduct}
              color={productStock <= qtyProduct ? "#c0cada" : "#0095DA"}
            >
              <AddIcon fontSize="10" />
            </Button>

            <Text mt="2">{qtyProduct}</Text>

            <Button
              variant="unstyled"
              onClick={decQty}
              color={qtyProduct > 1 ? "#0095DA" : "#c0cada"}
            >
              <MinusIcon fontSize="10" />
            </Button>
          </Box>

          <HStack spacing="1">
            <Text>{Rupiah(price)}</Text>
          </HStack>

          <CloseButton onClick={btnDelete} />
        </Flex>

        {/* Mobile */}
        <Flex
          mt="4"
          align="center"
          width="full"
          justify="space-between"
          display={{
            base: "flex",
            md: "none",
          }}
        >
          <Link fontSize="sm" textDecor="underline" onClick={btnDelete}>
            Hapus Produk
          </Link>
          <Box
            display="flex"
            borderRadius="10px"
            boxShadow="base"
            justifyContent="space-between"
          >
            <Button
              variant="unstyled"
              onClick={addQty}
              isDisabled={productStock <= qtyProduct}
              color={productStock <= qtyProduct ? "#c0cada" : "#0095DA"}
            >
              <AddIcon fontSize="10" />
            </Button>

            <Text mt="2">{qtyProduct}</Text>

            <Button
              variant="unstyled"
              onClick={decQty}
              color={qtyProduct > 1 ? "#0095DA" : "#c0cada"}
            >
              <MinusIcon fontSize="10" />
            </Button>
          </Box>
        </Flex>
      </Flex>
      <Divider />

      {/* Delete Per Product */}
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Hapus Barang dari Keranjag
            </AlertDialogHeader>

            <AlertDialogBody>
              Barang yang kamu pilih akan dihapus dari keranjang.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Kembali</Button>
              <Button colorScheme="red" onClick={btnDelete} ml={3}>
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default CartItem
