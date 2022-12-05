import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { axiosInstance } from "../../api"

const ProductCard = ({ id, product_name, price }) => {
  const [productData, setProductData] = useState({
    product_name: "",
    price: 0,
    id: "",
    category_id: "",
  })
  const [productImg, setProductImg] = useState([])
  const [productId, setProductId] = useState(0)

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

  // const productDetail = () => {
  //   setProductId(id)
  // }

  useEffect(() => {
    fetchProductById()
    fetchProductImage()
  }, [productId])

  return (
    <>
      <Flex
        // w="full"
        w={{ base: "full", lg: "15em" }}
        h="full"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        bg="white"
        rounded="xl"
        shadow="2xl"
        // onClick={() => productDetail()}
      >
        <Box w="full" h="full">
          <Link to={`/product-detail/${id}/${product_name}`}>
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
                src={productImg.product_picture}
              />
            </Box>
          </Link>
          <Box p="1">
            <Box fontWeight="semibold" lineHeight="tight">
              {product_name}
            </Box>

            <Box>Rp{price}</Box>
            {/* <Box>{productData.category_id}</Box> */}
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default ProductCard
