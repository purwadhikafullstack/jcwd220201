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
  Link,
  chakra,
  Stack,
  Button,
  ButtonGroup,
  CardFooter,
  Spacer,
} from "@chakra-ui/react"
import SlideBanner from "../../components/SlideBanner"
import Footer from "./Footer"
import "../../styles/globals.css"
import Features from "../../components/Features"

const MainContent = () => {
  return (
    <>
      <Box
        h={{ lg: "205vh", md: "100vh", base: "100vh" }}
        px={{ lg: "5%", md: "5%", base: "5%" }}
        py="auto"
        mt="50px"
        position="relative"
      >
        {/* Carousel Component */}
        <SlideBanner />

        {/* Kategori Card */}
        <Text fontSize="24px" fontStyle="normal" mt="5" color="#213360">
          Kategori Pilihan
        </Text>
        <SimpleGrid
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          align="center"
          background="white"
          gap="58px"
          pos="relative"
          mx="auto"
          maxW="auto"
        >
          <Card boxShadow="lg">
            <CardHeader>
              <Heading size="16px" fontWeight="700">
                Category 1
              </Heading>
            </CardHeader>
            <CardBody>ICON/LOGO</CardBody>
          </Card>
          <Card boxShadow="lg">
            <CardHeader>
              <Heading size="16px">Category 2</Heading>
            </CardHeader>
            <CardBody>ICON/LOGO</CardBody>
          </Card>
          <Card boxShadow="lg">
            <CardHeader>
              <Heading size="16px">Category 3</Heading>
            </CardHeader>
            <CardBody>ICON/LOGO</CardBody>
          </Card>
          <Card boxShadow="lg">
            <CardHeader>
              <Heading size="16px">Category 4</Heading>
            </CardHeader>
            <CardBody>ICON/LOGO</CardBody>
          </Card>
          <Card boxShadow="lg">
            <CardHeader>
              <Heading size="16px">Category 5</Heading>
            </CardHeader>
            <CardBody>ICON/LOGO</CardBody>
          </Card>
          <Card boxShadow="lg">
            <CardHeader>
              <Heading size="16px">Category 6</Heading>
            </CardHeader>
            <CardBody>ICON/LOGO</CardBody>
          </Card>
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
              width={{ md: 30, lg: "2xl" }}
              h={{ base: "30vh" }}
              src="https://t3.ftcdn.net/jpg/01/67/14/56/240_F_167145659_vnGRSdZDS3n3VMrLxJ3VRV68ExCUrjed.jpg"
              alt="information1"
            />
          </Box>
          <Spacer />
          <Box flexShrink={0}>
            <Image
              borderRadius="lg"
              width={{ md: 30, lg: "2xl" }}
              h={{ base: "30vh" }}
              src="https://t3.ftcdn.net/jpg/02/27/20/72/240_F_227207295_XnYyYPECxoQPcOTID1v3B5CFMjchJ0Ph.jpg"
              alt="information1"
            />
          </Box>
        </Box>

        <Divider mt="5" border="1px solid #D5D7DD" mb="5" />

        {/* Product Card */}
        <Text fontSize="24px" fontStyle="normal" mt="5" color="#213360" mb="2">
          Produk Populer (Route to all Product)
        </Text>
        <Flex flexDirection="row" flexWrap="wrap" gap="14">
          <Card maxW="sm">
            <CardBody>
              <Image
                src="https://t4.ftcdn.net/jpg/05/29/47/27/240_F_529472773_u6uKNUsbouFJ4V9mJouTJb31OFHaAhtF.jpg"
                alt="Iphone 14"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Iphone 14 Pro</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium non rerum, sit inventore deserunt nihil?
                </Text>
                <Text color="blue.600" fontSize="md">
                  IDR {(21_999_000).toLocaleString()}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="teal">
                  Beli Sekarang
                </Button>
                <Button variant="ghost" colorScheme="teal">
                  Keranjang
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image
                src="https://t3.ftcdn.net/jpg/04/95/54/52/240_F_495545222_yoR3alEQjWsPbDcclWEdjask7Ww6j2sS.jpg"
                alt="Iphone 14"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Smart TV</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium non rerum, sit inventore deserunt nihil?
                </Text>
                <Text color="blue.600" fontSize="md">
                  IDR {(21_999_000).toLocaleString()}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="teal">
                  Beli Sekarang
                </Button>
                <Button variant="ghost" colorScheme="teal">
                  Keranjang
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image
                src="https://t3.ftcdn.net/jpg/00/49/11/66/240_F_49116622_Jcqds9q666zT5eBJwdlmJqANipC803fA.jpg"
                alt="Iphone 14"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Kulkas</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium non rerum, sit inventore deserunt nihil?
                </Text>
                <Text color="blue.600" fontSize="md">
                  IDR {(21_999_000).toLocaleString()}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="teal">
                  Beli Sekarang
                </Button>
                <Button variant="ghost" colorScheme="teal">
                  Keranjang
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
          <Card maxW="sm">
            <CardBody>
              <Image
                src="https://t3.ftcdn.net/jpg/00/49/11/66/240_F_49116622_Jcqds9q666zT5eBJwdlmJqANipC803fA.jpg"
                alt="Iphone 14"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Kulkas</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium non rerum, sit inventore deserunt nihil?
                </Text>
                <Text color="blue.600" fontSize="md">
                  IDR {(21_999_000).toLocaleString()}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="teal">
                  Beli Sekarang
                </Button>
                <Button variant="ghost" colorScheme="teal">
                  Keranjang
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Flex>

        <Divider mt="7" border="1px solid #D5D7DD" mb="8" />
        <Features />
        {/* Footer Component */}
        <Footer />
      </Box>
    </>
  )
}
export default MainContent
