import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { axiosInstance } from "../../api"
import { Rupiah } from "../../lib/currency/Rupiah"

const ProductCard = ({ id, product_name, price }) => {
  const [productData, setProductData] = useState({
    product_name: "",
    price: 0,
    id: "",
    category_id: "",
    product_picture: "",
  })
  const [productImg, setProductImg] = useState([])
  const [productId, setProductId] = useState(0)

  const navigate = useNavigate()

  const fetchProductById = async () => {
    try {
      const response = await axiosInstance.get(`/products/${id}`)
      setProductData(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchProductImage = async () => {
    try {
      const responseImg = await axiosInstance.get(`/products/image/${id}`)

      setProductImg(responseImg.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const toProductDetail = () => {
    setProductId(id)
    navigate(`/product-detail/${id}/${product_name}`)
  }

  useEffect(() => {
    fetchProductById()
    fetchProductImage()
  }, [productId])

  return (
    <>
      <Flex
        w={{ base: "full", lg: "15em" }}
        h="full"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        bg="white"
        rounded="xl"
        shadow="2xl"
      >
        <Box w="full" h="full" onClick={() => toProductDetail()}>
          <Box
            w="100%"
            height="200px"
            pos="relative"
            overflow="hidden"
            roundedTop="lg"
          >
            <Image
              objectFit="fill"
              alt="pict of product"
              src={`https://jcwd220201.purwadhikabootcamp.com/public/${productImg.product_picture}`}
            />
          </Box>
          <Box p="1">
            <Box fontWeight="semibold" lineHeight="tight">
              {product_name}
            </Box>

            <Box>{Rupiah(price)}</Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default ProductCard
