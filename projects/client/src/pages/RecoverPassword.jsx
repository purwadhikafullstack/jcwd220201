import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { BiHide, BiShow } from "react-icons/bi"
import { IoMdArrowRoundBack } from "react-icons/io"
import { Link, useNavigate, useParams } from "react-router-dom"
import * as Yup from "yup"
import { axiosInstance } from "../api"

const RecoverPassword = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(false)

  const [passwordFalse, setPasswordFalse] = useState(false)
  const passwordNotMatch = () => {
    setPasswordMatch(true)
    setPasswordFalse(true)
  }
  const navigate = useNavigate()
  const [pass, setPass] = useState("")
  const { token } = useParams()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Password Confirmation is Required"),
    }),
    onSubmit: async ({ password }) => {
      try {
        const response = await axiosInstance.patch(
          `/auth/recover-password`,
          {
            password,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setPass(response.data.data)
        toast({
          title:
            "Password successfully changed, use your new password to login",
          status: "success",
        })
        navigate("/login")
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed to changed your password",
          status: "error",
          description: err.response.data.message,
        })
      }
    },
  })
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  const toggleConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword)
  }

  return (
    <>
      <Stack>
        <Box
          display={"flex"}
          fontSize="14px"
          justifyContent={"center"}
          mt={"50px"}
        >
          <Box
            w="500px"
            boxShadow={"0 0 10px 3px rgb(0 0 0 / 10%)"}
            borderRadius={"10px"}
            p="24px 40px 32px "
            textAlign={"center"}
            bgColor={"white"}
            mt="120px"
          >
            <Text
              fontSize="22px"
              fontWeight={"bold"}
              textAlign={"left"}
              color="teal.600"
              fontFamily="Open Sauce One',sans-serif"
            >
              Perbarui kata sandi
            </Text>

            <form onSubmit={formik.handleSubmit}>
              <Box m="20px 0 8px" mt="20px">
                <FormControl isInvalid={formik.errors.password}>
                  <InputGroup>
                    <Input
                      value={formik.values.password}
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      onChange={formik.handleChange}
                      placeholder="Masukkan kata sandi"
                      focusBorderColor="#81E6D9"
                      variant="flushed"
                    />
                    <InputRightElement width={"4.5rem"}>
                      <Button
                        mt={"-2px"}
                        ml={"19px"}
                        size={"md"}
                        bg={"white"}
                        onClick={togglePassword}
                        color="teal.400"
                      >
                        {passwordShown ? <BiShow /> : <BiHide />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {passwordFalse ? (
                    <FormErrorMessage fontSize={"11px"}>
                      {formik.errors.password}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
                <Box mt={"20px"}>
                  <FormControl isInvalid={formik.errors.confirmPassword}>
                    <InputGroup>
                      <Input
                        value={formik.values.confirmPassword}
                        name="confirmPassword"
                        type={showConfirmNewPassword ? "text" : "password"}
                        onChange={formik.handleChange}
                        focusBorderColor="#81E6D9"
                        placeholder="Konfirmasi kata sandi"
                        variant="flushed"
                      />
                      <InputRightElement width={"4.5rem"}>
                        <Button
                          ml={"19px"}
                          size={"md"}
                          bg={"#white"}
                          onClick={toggleConfirmNewPassword}
                          color="teal.400"
                        >
                          {showConfirmNewPassword ? <BiShow /> : <BiHide />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {formik.values.confirmPassword !== formik.values.password &&
                    passwordMatch ? (
                      <FormHelperText
                        color="#4A5568"
                        fontSize={"15px"}
                        textAlign={"left"}
                      >
                        Password baru tidak sesuai
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Box>
              </Box>

              <Button
                display={"flex"}
                w="100%"
                bgColor="teal.500"
                _hover={false}
                m="16px 0"
                color={"white"}
                isDisabled={!formik.values.password}
                type={"submit"}
                onClick={passwordNotMatch}
                mt="20px"
              >
                <Text fontWeight={"bold"}>Atur ulang kata sandi</Text>
              </Button>
            </form>
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
        </Box>
      </Stack>
    </>
  )
}

export default RecoverPassword
