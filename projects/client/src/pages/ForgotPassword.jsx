import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { IoMdArrowRoundBack } from "react-icons/io"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import { axiosInstance } from "../api"

const ForgotPassword = () => {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
    }),
    validateOnChange: false,

    onSubmit: async ({ email }) => {
      try {
        const response = await axiosInstance.post(`/auth/forgot-password`, {
          email,
        })

        formik.handleReset()
        setMessage("Silahkan cek email anda")
        setTimeout(() => {
          setMessage("")
        }, 5000)
      } catch (err) {
        console.log(err)

        setMessage("Email tidak tersedia")
      }
    },
  })

  return (
    <>
      <Stack mt="240px" alignItems="center">
        <Flex
          w="500px"
          boxShadow={"0 0 10px 3px rgb(0 0 0 / 10%)"}
          borderRadius={"10px"}
          p="24px 40px 40px "
          textAlign={"center"}
          bgColor={"white"}
        >
          <form onSubmit={formik.handleSubmit}>
            <Text
              alignItems="center"
              mb="20px"
              fontSize={"lg"}
              color={"gray.600"}
            >
              Masukan alamat email yang sesuai.
            </Text>
            <Flex w="140%">
              <FormControl isInvalid={formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <Input
                    value={formik.values.email}
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                  />
                </InputGroup>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                {message ? <Text>{message}</Text> : null}
              </FormControl>
            </Flex>
            <Flex w="140%">
              <Button
                display={"flex"}
                w="100%"
                bgColor="teal.500"
                m="16px 0"
                color={"white"}
                isDisabled={!formik.values.email}
                type={"submit"}
              >
                <Text fontWeight={"bold"}>Send to your email</Text>
              </Button>
            </Flex>
          </form>
        </Flex>
        <Box>
          <Link to="/login">
            <Box>
              <Button
                bgColor={"white"}
                fontSize={"35px"}
                _hover={"none"}
                pb={"5px"}
              >
                <IoMdArrowRoundBack />
              </Button>
            </Box>
          </Link>
          <Text mt="2px">Back to login</Text>
        </Box>
      </Stack>
    </>
  )
}

export default ForgotPassword
