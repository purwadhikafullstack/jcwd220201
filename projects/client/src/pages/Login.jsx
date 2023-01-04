import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link as LinkChakra,
  Stack,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import {
  useNavigate,
  Link as LinkRouterDom,
  useLocation,
} from "react-router-dom"
import * as Yup from "yup"
import { axiosInstance } from "../api"
import { login } from "../redux/features/authSlice"

const LoginPage = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        })
        console.log(
          "res",
          response.data.data.WarehousesUsers.map((val) => val.WarehouseId)[0]
        )

        localStorage.setItem("auth_token", response.data.token)
        dispatch(
          login({
            id: response.data.data.id,
            RoleId: response.data.data.RoleId,
            name: response.data.data.name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            gender: response.data.data.gender,
            date_of_birth: response.data.data.date_of_birth,
            profile_picture: response.data.data.profile_picture,
            WarehouseId: response.data.data.WarehousesUsers.map(
              (val) => val.WarehouseId
            )[0],
          })
        )
        toast({
          title: "Login success",
          description: response.data.message,
          status: "success",
          duration: 1000,
        })

        formik.setFieldValue("email", "")
        formik.setFieldValue("password", "")
        formik.setSubmitting(false)
      } catch (err) {
        console.log(err)
        toast({
          status: "error",
          title: "Login failed",
          description: err.response.data.message,
        })
      }
      navigate(location.state.from)
    },
    validationSchema: Yup.object({
      email: Yup.string().required(),
      password: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <>
      <Container
        bg="teal.400"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
      >
        <Flex>
          <Box
            bg="white"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 10 }}
          >
            <Box p={4}>
              <Heading
                align={"right"}
                as="h3"
                size="2xl"
                letterSpacing={"tighter"}
                textColor="black"
                textAlign="center"
                justifySelf="center"
                mb="30px"
                mt="-5"
              >
                {/* WIRED! */}
                <Center>
                  <Image boxSize="30%" src="logo.png"></Image>
                </Center>
              </Heading>
              <Wrap spacing={{ base: 10, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack
                        pl={0}
                        spacing={1}
                        mb="-20"
                        mr="-80"
                        alignItems="flex-start"
                      >
                        <Image
                          alt={"Login Image"}
                          objectFit={"cover"}
                          maxH="70%"
                          maxW="65%"
                          src={
                            "https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg?w=740&t=st=1668700968~exp=1668701568~hmac=2fc7a4e39aedc62a508eeccea0651ff5742d91ff72a3cda488b0861ddaf4a62f"
                          }
                        />
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box
                      m={10}
                      color="#0B0E3F"
                      borderRadius="10px"
                      boxShadow={"0 0 10px 3px rgb(0 0 0 / 10%)"}
                      p="24px 40px 32px "
                    >
                      <Heading textColor="black" fontSize={"2xl"} mb="5px">
                        Masuk Ke Akun Anda
                      </Heading>
                      <Text fontSize={"lg"} color={"gray.600"} mb="20px">
                        Untuk berbelanja semua produk kami ✌️
                      </Text>
                      <VStack spacing={5}>
                        <FormControl isInvalid={formik.errors.email}>
                          <FormLabel>Email</FormLabel>
                          <Input
                            value={formik.values.email}
                            name="email"
                            type="email"
                            onChange={formChangeHandler}
                          />
                          <FormErrorMessage>
                            {formik.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.errors.password}>
                          <FormLabel>Password</FormLabel>
                          <InputGroup>
                            <Input
                              value={formik.values.password}
                              name="password"
                              onChange={formChangeHandler}
                              type={showPassword ? "text" : "password"}
                            />
                            <InputRightElement h={"full"}>
                              <Button
                                variant={"ghost"}
                                onClick={() =>
                                  setShowPassword(
                                    (showPassword) => !showPassword
                                  )
                                }
                              >
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormHelperText mt="5" mb="-2" textAlign="right">
                            <LinkChakra
                              onClick={() => {
                                navigate("/forgot-password")
                              }}
                            >
                              Lupa Password?
                            </LinkChakra>
                          </FormHelperText>
                          <FormErrorMessage>
                            {formik.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                        <Button
                          onClick={formik.handleSubmit}
                          isDisabled={!formik.values.email}
                          type={"submit"}
                          bgColor="teal.500"
                          color={"white"}
                        >
                          Masuk
                        </Button>
                      </VStack>
                      <Stack>
                        <Text align={"center"} mt="20px" mr="2">
                          Belum Punya Akun?
                          <LinkRouterDom
                            style={{ color: "teal" }}
                            to="/register"
                          >
                            Daftar
                          </LinkRouterDom>
                        </Text>
                      </Stack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
      <Text
        color="rgb(96, 96, 96)"
        mt="7.5rem"
        mb="0.125rem"
        lineHeight="1.375rem"
        whiteSpace="nowrap"
        display="block"
        textAlign="center"
      >
        © 2022 PT WIRED! Indonesia
      </Text>
    </>
  )
}

export default LoginPage
