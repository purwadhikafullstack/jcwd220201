import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link as LinkChakra,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  ButtonGroup,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Image,
  Divider,
  useMediaQuery,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons"
import { IoMdCart } from "react-icons/io"
import {
  Link,
  Link as LinkRouterDom,
  Outlet,
  useNavigate,
  useLocation,
  createSearchParams,
  useSearchParams,
} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout, login } from "../../redux/features/authSlice"
import { axiosInstance } from "../../api"
import { useEffect, useState } from "react"
import { itemCart } from "../../redux/features/cartSlice"
import { Rupiah } from "../../lib/currency/Rupiah"
import Logo from "./Logo"

const Navbar = ({ onChange, onClick, onKeyDown }) => {
  const cartSelector = useSelector((state) => state.cart)
  const authSelector = useSelector((state) => state.auth)

  const [authCheck, setAuthCheck] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [searchValue, setSearchValue] = useState("")
  const [searchQuery, setSearchQuery] = useSearchParams()
  const [cartProduct, setCartProduct] = useState([])
  const [cartQty, setCartQty] = useState(0)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isLargerThanSm] = useMediaQuery("(min-width: 20rem)")
  const [isLargerThanMd] = useMediaQuery("(min-width: 30rem)")

  const keepUserLogin = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosInstance.get("/auth/refresh-token")

      dispatch(login(response.data.data))
      localStorage.setItem("auth_token", response.data.token)
      setAuthCheck(true)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    }
  }

  const btnLogout = () => {
    localStorage.removeItem("auth_token")
    dispatch(logout())
    navigate("/login")
  }

  const handleOnChange = (e) => {
    setSearchValue(e.target.value)
    onChange(e)
  }

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate({
        pathname: "/product",
        search: createSearchParams({ search: searchValue }).toString(),
      })
      onKeyDown(e)
    }
  }

  const fetchUserCart = async () => {
    try {
      const response = await axiosInstance.get("/carts/me")

      dispatch(itemCart(response.data.data))
      setCartProduct(response.data.data)
      const productQty = response.data.data.map((val) => val.quantity)

      let total = 0

      for (let i = 0; i < productQty.length; i++) {
        total += Number(productQty[i])
      }
      setCartQty(total)
    } catch (err) {
      console.log(err)
    }
  }

  const renderCartProduct = () => {
    return cartProduct.map((val) => {
      return (
        <>
          <Box p={4} display={{ md: "flex" }}>
            <Box>
              <Image
                maxW="40"
                maxH="40"
                borderRadius="lg"
                width={{ md: 40 }}
                src={`https://jcwd220201.purwadhikabootcamp.com/public/${val.Product?.ProductPictures[0].product_picture}`}
              />
            </Box>
            <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
              <Text
                fontWeight="bold"
                textTransform="uppercase"
                fontSize="sm"
                letterSpacing="wide"
                color="teal.600"
              >
                {val.Product.product_name}
              </Text>
              <Link
                mt={1}
                display="block"
                fontSize="lg"
                lineHeight="normal"
                href="#"
              >
                <Text fontWeight="700">{Rupiah(val.Product.price)}</Text>
              </Link>
              <Text fontWeight="bold" mt={2} color="teal.600">
                Quantity
              </Text>
              <Text mt={2} color="gray.500" fontWeight="700">
                X{val.quantity}
              </Text>
            </Box>
          </Box>
        </>
      )
    })
  }

  useEffect(() => {
    keepUserLogin()
  }, [])

  useEffect(() => {
    fetchUserCart()
  }, [cartProduct])

  useEffect(() => {
    setSearchValue(searchQuery.get("search"))
  }, [])
  return (
    <>
      <Box
        bg="white"
        px={10}
        top="0"
        pos="sticky"
        zIndex="6"
        boxShadow="0px 2px 3px 2px rgba(33, 51, 96, 0.02), 0px 4px 12px 4px rgba(0, 155, 144, 0.08)"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            w={{ base: "25", md: "full" }}
            alignItems={"center"}
          >
            <Box>
              <Logo />
            </Box>
            <HStack
              w="full"
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              boxSizing="border-box"
              gap="6"
            >
              <InputGroup maxW="93%">
                <Input
                  borderRadius="8px"
                  placeholder="Cari di WIRED!"
                  _placeholder={{ fontSize: "14px" }}
                  bgColor="white"
                  type="text"
                  id="search"
                  onChange={handleOnChange}
                  onKeyDown={handleOnKeyDown}
                  value={searchValue}
                />
                <InputRightElement>
                  <Button variant="solid" borderRadius="8px" onClick={onClick}>
                    <SearchIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>

              {/*  Cart */}
              <Box
                display="flex"
                my="auto"
                borderRight="1px solid #e0e0e0"
                color="#6c727c"
              >
                <Popover trigger="hover">
                  <PopoverTrigger>
                    <LinkRouterDom to="/cart">
                      <Button bg="inherit" size="md">
                        <IoMdCart fontSize="20px" />
                        {cartSelector.cart.length && authSelector.id ? (
                          <sup>
                            <Box
                              fontSize="11px"
                              backgroundColor="teal"
                              borderRadius="50%"
                              mt="-2px"
                              mx="-8px"
                              px="7px"
                              py="8px"
                              color="white"
                              fontWeight="700"
                            >
                              {cartQty}
                            </Box>
                          </sup>
                        ) : null}
                      </Button>
                    </LinkRouterDom>
                  </PopoverTrigger>
                  {cartSelector.cart.length ? (
                    <PopoverContent
                      overflow="scroll"
                      maxH="40vh"
                      h={{ base: 0, md: "40vh" }}
                    >
                      <PopoverHeader
                        display="flex"
                        justifyContent="space-between"
                      >
                        <Text>Keranjang</Text>
                        <LinkRouterDom to="/cart">
                          <Text>Lihat Keranjang</Text>
                        </LinkRouterDom>
                      </PopoverHeader>
                      <PopoverBody>{renderCartProduct()}</PopoverBody>
                    </PopoverContent>
                  ) : (
                    <PopoverContent>
                      <PopoverHeader
                        display="flex"
                        justifyContent="space-between"
                      >
                        <Text>Keranjang</Text>
                        <LinkRouterDom to="/cart">
                          <Text>Lihat Keranjang</Text>
                        </LinkRouterDom>
                      </PopoverHeader>
                      <PopoverBody>
                        <Image src="assets/cart/keranjangkosong.png" />
                        <Text align="center" fontWeight="semibold">
                          Keranjangmu Masih Kosong nih ?
                        </Text>
                      </PopoverBody>
                    </PopoverContent>
                  )}
                </Popover>
              </Box>
              {/* ====================================================================================== */}
            </HStack>
            <Center>
              <Divider orientation="vertical" border="1 px" />
            </Center>
          </HStack>

          {/* Profile Popup */}
          <Flex alignItems={"center"}>
            <Menu>
              {authSelector.name ? (
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Flex>
                    <Avatar
                      size={"sm"}
                      name={authSelector.profile_picture}
                      src={authSelector.profile_picture}
                    />
                    <Text my="auto" p="8px">
                      {authSelector.name}
                    </Text>
                  </Flex>
                </MenuButton>
              ) : (
                <ButtonGroup gap="2" display={{ base: "none", md: "flex" }}>
                  <LinkRouterDom to="/login">
                    <Button variant="outline" colorScheme="teal" size="md">
                      Masuk
                    </Button>
                  </LinkRouterDom>
                  <LinkRouterDom to="/register">
                    <Button
                      variant="solid"
                      size="md"
                      color="white"
                      _hover={{ bg: "teal.300" }}
                      bg="teal.400"
                    >
                      Daftar
                    </Button>
                  </LinkRouterDom>
                </ButtonGroup>
              )}

              <MenuList>
                <LinkRouterDom to="/profile">
                  <MenuItem>Profil</MenuItem>
                </LinkRouterDom>
                <LinkRouterDom to="/address">
                  <MenuItem>Alamat</MenuItem>
                </LinkRouterDom>
                <MenuItem>Pesanan</MenuItem>
                <MenuDivider />
                <MenuItem>
                  <Button
                    w="full"
                    variant="unstyled"
                    textAlign="left"
                    fontWeight="semibold"
                  >
                    <LinkRouterDom onClick={() => btnLogout()}>
                      Logout
                    </LinkRouterDom>
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* Mobile View */}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <InputGroup maxW="100%">
                <Input
                  // id="search"
                  float="right"
                  borderRadius="8px"
                  border="1px solid #CCCCCC"
                  placeholder="Cari di WIRED!"
                  _placeholder={{ fontSize: "14px" }}
                  bgColor="white"
                  onChange={handleOnChange}
                  onKeyDown={handleOnKeyDown}
                  value={searchValue}
                />
                <InputRightElement>
                  <Button variant="solid" borderRadius="5" onClick={onClick}>
                    <SearchIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
              {/* Cart on Mobile View */}
              <Box display="flex" my="auto" color="#6c727c">
                <Popover trigger="hover">
                  <PopoverTrigger>
                    <LinkRouterDom to="/cart">
                      <Button bg="inherit" size="md">
                        <IoMdCart fontSize="20px" />
                        {cartSelector.cart.length && authSelector.id ? (
                          <sup>
                            <Box
                              fontSize="11px"
                              backgroundColor="teal"
                              borderRadius="50%"
                              mt="-2px"
                              mx="-8px"
                              px="7px"
                              py="8px"
                              color="white"
                              fontWeight="700"
                            >
                              {cartQty}
                            </Box>
                          </sup>
                        ) : null}
                      </Button>
                    </LinkRouterDom>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Text>Keranjang</Text>
                      <LinkRouterDom to="/cart">
                        <Text>Lihat Keranjang</Text>
                      </LinkRouterDom>
                    </PopoverHeader>
                    <PopoverBody>{renderCartProduct()}</PopoverBody>
                  </PopoverContent>
                </Popover>
              </Box>
              {authSelector.name ? null : (
                <ButtonGroup gap="2" display={{ base: "flex", md: "none" }}>
                  <LinkRouterDom to="/login">
                    <Button variant="outline" colorScheme="teal" size="md">
                      Masuk
                    </Button>
                  </LinkRouterDom>
                  <Button
                    variant="solid"
                    size="md"
                    color="white"
                    _hover={{ bg: "teal.300" }}
                    bg="teal.400"
                  >
                    Daftar
                  </Button>
                </ButtonGroup>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Outlet />
    </>
  )
}

export default Navbar
