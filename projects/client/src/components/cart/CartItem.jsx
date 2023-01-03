import { AddIcon, MinusIcon } from "@chakra-ui/icons"
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Image,
  Stack,
  Select,
  Text,
  useColorModeValue,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Checkbox,
  Divider,
  useNumberInput,
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
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { FiGift } from "react-icons/fi"
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
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: qtyProduct,
      min: 1,
      max: qtyProduct,
    })
  const inc = getIncrementButtonProps(addQty)
  const dec = getDecrementButtonProps(decQty)
  const input = getInputProps(qtyProduct)
  const qty = Number(input.value)
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
            // alt={name}
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
                Kategori
                {/* {CategoryId} */}
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
          <InputGroup w="40%">
            <InputLeftElement>
              <MinusIcon
                fontSize="10"
                {...dec}
                color={qtyProduct > 1 ? "#0095DA" : "#c0cada"}
                onClick={decQty}
              />
            </InputLeftElement>
            <Input width="10em" textAlign="center" _hover={"none"} {...input} />
            <InputRightElement>
              <AddIcon
                fontSize="10"
                {...inc}
                color={productStock <= qtyProduct ? "#c0cada" : "#0095DA"}
                onClick={addQty}
              />
            </InputRightElement>
          </InputGroup>

          <HStack spacing="1">
            <Text>{Rupiah(price)}</Text>
          </HStack>

          {/* <PriceTag price={price} currency={currency} /> */}

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
          {/* <Select
            maxW="64px"
            aria-label="Select quantity"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Select> */}
          <InputGroup w="40%">
            <InputLeftElement>
              <MinusIcon
                fontSize="10"
                {...dec}
                color={qtyProduct > 1 ? "#0095DA" : "#c0cada"}
                onClick={decQty}
              />
            </InputLeftElement>
            <Input width="10em" textAlign="center" _hover={"none"} {...input} />
            <InputRightElement>
              <AddIcon
                fontSize="10"
                {...inc}
                color={productStock <= qtyProduct ? "#c0cada" : "#0095DA"}
                onClick={addQty}
              />
            </InputRightElement>
          </InputGroup>
          {/* <PriceTag price={price} currency={currency} /> */}
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
