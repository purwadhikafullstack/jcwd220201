import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Center,
  chakra,
  Stack,
  Button,
  ButtonGroup,
  CardFooter,
  Spacer,
  Container,
} from "@chakra-ui/react"
import SlideBanner from "../../components/SlideBanner"
import Footer from "./Footer"
import "../../styles/globals.css"
import Features from "../../components/Features"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { axiosInstance } from "../../api"
import ProductCard from "../../components/product/ProductCard"

const MainContent = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const navigate = useNavigate()

  const fetchProducts = async () => {
    const maxProductInPage = 5
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _page: page,
          _limit: maxProductInPage,
        },
      })

      setProducts(response.data.data)
      setTotalCount(response.data.dataCount)
      setMaxPage(Math.ceil(response.data.dataCount / maxProductInPage))

      if (page === 1) {
        setProducts(response.data.data)
      } else {
        setProducts(response.data.data)
      }
      renderProducts()
    } catch (err) {
      console.log(err)
    }
  }

  const fetchAllCategory = async () => {
    try {
      const responseCategory = await axiosInstance.get("/products/category")

      setCategories(responseCategory.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const renderProducts = () => {
    return products.map((val) => (
      <ProductCard
        key={val.id.toString()}
        product_name={val.product_name}
        product_picture={`https://jcwd220201.purwadhikabootcamp.com/public/${val.Product?.ProductPictures?.product_picture}`}
        price={val.price}
        id={val.id}
      />
    ))
  }

  useEffect(() => {
    fetchProducts()
    fetchAllCategory()
  }, [page])

  return (
    <>
      <Box
        h={{ lg: "150vh", md: "100vh", base: "100vh" }}
        px={{ lg: "5%", md: "5%", base: "5%" }}
        py="auto"
        mt="50px"
        position="relative"
      >
        {/* Carousel Component */}
        <SlideBanner />

        {/* Kategori Card */}
        <Flex fontSize="18px" mt="2" fontWeight="semibold" color="#213360">
          <Box p="3">Kategori</Box>
          <Spacer />
          <Link to="#kategori">
            <Button
              p="3"
              bgColor="white"
              variant="solid"
              borderRadius="none"
              _hover={{ borderBottom: "2px solid #dfe1e3" }}
            >
              Lihat Semua
            </Button>
          </Link>
        </Flex>
        <SimpleGrid
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          align="center"
          background="white"
          gap="58px"
          pos="relative"
          mx="auto"
          maxW="auto"
        >
          {categories.map((val) => (
            <Card boxShadow="lg">
              <CardHeader>
                <Heading key={val.id} size="16px" fontWeight="700">
                  {val.category}
                </Heading>
              </CardHeader>
              <CardBody> {` `}</CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Divider mt="7vh" border="1px solid #D5D7DD" />

        <Box
          mt="3"
          p={4}
          display={{ md: "flex" }}
          justifyContent="center"
          gap="50"
          left="0"
          right="0"
          top="0"
          bottom="0"
        >
          <Box flexShrink={0}>
            <Image
              borderRadius="lg"
              width={{ md: 30, lg: "lg" }}
              h={{ base: "30vh" }}
              src="https://t3.ftcdn.net/jpg/01/67/14/56/240_F_167145659_vnGRSdZDS3n3VMrLxJ3VRV68ExCUrjed.jpg"
              alt="information1"
            />
          </Box>
          <Spacer />
          <Box flexShrink={0}>
            <Image
              borderRadius="lg"
              width={{ md: 30, lg: "lg" }}
              h={{ base: "30vh" }}
              src="https://t3.ftcdn.net/jpg/02/27/20/72/240_F_227207295_XnYyYPECxoQPcOTID1v3B5CFMjchJ0Ph.jpg"
              alt="information1"
            />
          </Box>
        </Box>

        <Divider mt="5" border="1px solid #D5D7DD" mb="2" />

        {/* Product Card Popular */}
        <Flex fontSize="18px" fontWeight="semibold" color="#213360">
          <Box p="3">Produk Populer</Box>
          <Spacer />
          <Link to="/product">
            <Button
              p="3"
              bgColor="white"
              variant="solid"
              borderRadius="none"
              _hover={{ borderBottom: "2px solid #dfe1e3" }}
            >
              Lihat Semua
            </Button>
          </Link>
        </Flex>
        <Grid
          templateColumns={{ base: "repeat(1,fr)", md: "repeat(5,1fr)" }}
          gap="1em"
          minH="-moz-max-content"
          minChildWidth="250px"
          align="center"
        >
          {renderProducts()}
        </Grid>

        <Divider mt="7" border="1px solid #D5D7DD" mb="8" />
        <Features />

        {/* Footer Component */}
        <Box>
          <Divider />
          <Footer />
        </Box>
      </Box>
    </>
  )
}
export default MainContent
