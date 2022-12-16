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
} from "@chakra-ui/react"
import { Carousel } from "react-responsive-carousel"
import { useState } from "react"
import { useParams } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css"
// import "../products/ProductDetail.css"
import { axiosInstance } from "../../api"
import { useEffect } from "react"
import Navbar from "../layout/Navbar"

const ProductDetail = () => {
  const [produck, setProducts] = useState({
    id: "",
    product_name: "",
    description: "",
    price: 0,
    weight: 0,
    Category: "",
  })
  const params = useParams()

  const [productImg, setProductImg] = useState([])
  const [productStock, setProductStock] = useState([])

  const fetchProductDetail = async () => {
    try {
      const response = await axiosInstance.get(`/products/${params.id}`)

      setProducts(response.data.data)
      setProductImg(response.data.data.ProductPictures)
      setProductStock(response.data.data.ProductStocks)
      console.log("response", response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProductDetail()
  }, [])

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
            <Carousel swipeable={true} showStatus={false} dynamicHeight={false}>
              {productImg.map((val) => (
                <Image
                  // className="image-prod-detail"
                  h={{ base: "100%", sm: "400px", lg: "500px" }}
                  src={val.product_picture}
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
                Rp {produck.price.toLocaleString()}
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
                  {productStock.map((val) => (
                    <ListItem>
                      <Text as="span" fontWeight="thin">
                        Stock:
                      </Text>{" "}
                      {val.stock}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>
            <HStack alignSelf="center" maxW="320px">
              <Button>-</Button>
              <NumberInput>
                <NumberInputField />
              </NumberInput>
              <Button>+</Button>
            </HStack>

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
            >
              Masukkan Keranjang
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  )
}

export default ProductDetail
