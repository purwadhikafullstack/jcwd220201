import {
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
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link as LinkRouterDom } from "react-router-dom"
import * as Yup from "yup"
import { axiosInstance } from "../api"
import { login } from "../redux/features/authSlice"

const LoginPage = () => {
  const authSelector = useSelector((state) => state.auth)
  const toast = useToast()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

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
        console.log(response)

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
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Heading align={"right"} as="h1" size="2xl" letterSpacing={"tighter"}>
        WIRED!
      </Heading>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Masuk ke akun anda</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Untuk berbelanja semua produk kami ✌️
            </Text>
          </Stack>

          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <FormControl isInvalid={formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  value={formik.values.email}
                  name="email"
                  type="email"
                  onChange={formChangeHandler}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
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
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText mt="5" mb="5" textAlign="right">
                  <LinkChakra>Lupa Password?</LinkChakra>
                </FormHelperText>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                onClick={navigate.goBack}
                type="submit"
                colorScheme="teal"
              >
                Masuk
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Belum punya akun?{" "}
                <LinkRouterDom to="/register" color={"teal"}>
                  Daftar
                </LinkRouterDom>
              </Text>
            </Stack>
          </form>
          <Text align={"center"}>© 2022 PT WIRED! Indonesia</Text>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          maxH="80%"
          maxW="80%"
          src={
            "https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg?w=740&t=st=1668700968~exp=1668701568~hmac=2fc7a4e39aedc62a508eeccea0651ff5742d91ff72a3cda488b0861ddaf4a62f"
          }
        />
      </Flex>
    </Stack>
  )
}

export default LoginPage
