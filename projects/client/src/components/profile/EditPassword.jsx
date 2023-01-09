import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputRightElement,
  Stack,
  useToast,
  InputGroup,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../../api"
import { useFormik } from "formik"
import { login } from "../../redux/features/authSlice"
import { useEffect } from "react"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"

const EditPassword = () => {
  const authSelector = useSelector((state) => state.auth)
  const [editMode, setEditMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/auth")

      setUsers(response.data[0])
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    onSubmit: async ({ password, confirm_password }) => {
      try {
        const response = await axiosInstance.patch(
          `auth/profile/password/${authSelector.id}`,
          {
            password,
            confirm_password,
          }
        )

        dispatch(login(response.data.data))
        setEditMode(false)
        if (authSelector.RoleId === 1 || authSelector.RoleId === 2) {
          navigate("/admin/dashboard")
        } else {
          navigate("/")
        }

        toast({ title: "Password Edited" })
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed Edit",
          status: "error",
          description: err.response.data.message,
        })
      }
    },
    validationSchema: Yup.object({
      password: Yup.string(),
      confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "password not match"),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  const handleCancel = () => {
    if (authSelector.RoleId === 1 || authSelector.RoleId === 2) {
      navigate("/admin/dashboard")
    } else {
      navigate("/")
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <Container
        borderRadius="6px"
        backgroundColor="teal.400"
        maxW="container.lg"
        py="10"
        pb="10"
        pr="10"
        pl="10"
      >
        <Box
          backgroundColor="white"
          borderColor="gray.300"
          borderWidth="1px"
          p="6"
          borderRadius="8px"
        >
          <Tabs isManual variant="soft-rounded" colorScheme="gray">
            <TabList mb="1em">
              <Tab _selected={{ color: "white", bg: "teal" }}>
                Ubah Kata Sandi
              </Tab>
              <Link to="/profile">
                <Tab>Ubah Biodata Diri</Tab>
              </Link>
            </TabList>
            <TabPanels>
              <TabPanel>
                <HStack
                  spacing="6"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Stack
                    spacing={6}
                    w={"full"}
                    maxW={"lg"}
                    bg={"white"}
                    rounded={"xl"}
                    boxShadow={"lg"}
                    p={6}
                  >
                    <Heading
                      lineHeight={1.1}
                      fontSize={{ base: "2xl", sm: "3xl" }}
                    >
                      Ubah Kata Sandi
                    </Heading>

                    <FormControl isInvalid={formik.errors.password}>
                      <FormLabel>Kata Sandi</FormLabel>
                      <InputGroup>
                        <Input
                          onChange={formChangeHandler}
                          name="password"
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
                      <FormErrorMessage>
                        {formik.errors.password}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors.confirm_password}>
                      <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                      <Input
                        onChange={formChangeHandler}
                        name="confirm_password"
                        type="confirm_password"
                      />
                      <FormErrorMessage>
                        {formik.errors.confirm_password}
                      </FormErrorMessage>
                    </FormControl>

                    <>
                      <Center>
                        <Button
                          width="80%"
                          colorScheme="teal"
                          onClick={formik.handleSubmit}
                          type="submit"
                        >
                          Simpan
                        </Button>
                      </Center>
                      <Center>
                        <Button
                          width="80%"
                          colorScheme="red"
                          onClick={handleCancel}
                        >
                          Batalkan
                        </Button>
                      </Center>
                    </>
                  </Stack>
                </HStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  )
}

export default EditPassword
