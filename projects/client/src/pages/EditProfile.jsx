import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  InputRightElement,
  Stack,
  Text,
  useToast,
  InputGroup,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../api"
import { useFormik } from "formik"
import { login } from "../redux/features/authSlice"
import { useEffect } from "react"
import * as Yup from "yup"
import { Navigate, useNavigate } from "react-router-dom"

const EditProfile = () => {
  const authSelector = useSelector((state) => state.auth)
  const [editMode, setEditMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPW, setShowConfirmPW] = useState(false)
  const [users, setUsers] = useState([])
  const [tabNumber, setTabNumber] = useState(1)
  const inputFileRef = useRef()

  const dispatch = useDispatch()
  const token = localStorage.getItem("auth_token")
  const navigate = useNavigate()

  const toast = useToast()

  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:8000/auth`)

      setUsers(response.data[0])
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      profile_picture: null,
      gender: "",
      phone: "",
      date_of_birth: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: async ({
      name,
      profile_picture,
      gender,
      phone,
      date_of_birth,
      password,
      confirm_password,
    }) => {
      try {
        const userData = new FormData()

        if (name && name !== authSelector.name) {
          userData.append("name", name)
        }

        if (profile_picture) {
          userData.append("profile_picture", profile_picture)
        }
        if (gender && gender !== authSelector.gender) {
          userData.append("gender", gender)
        }
        if (phone && phone !== authSelector.phone) {
          userData.append("phone", phone)
        }
        if (date_of_birth && date_of_birth !== authSelector.date_of_birth) {
          userData.append("date_of_birth", date_of_birth)
        }
        if (password && password !== authSelector.password) {
          userData.append("password", password)
        }
        if (confirm_password && confirm_password !== authSelector.password) {
          userData.append("confirm_password", confirm_password)
        }

        const userResponse = await axiosInstance.patch("auth/profile", userData)

        dispatch(login(userResponse.data.data))
        setEditMode(false)
        navigate("/")
        toast({ title: "Profile Edited" })
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed Edit",
          status: "error",
          description: err.response.data.message,
        })
      }
    },
    validationSchema:
      tabNumber === 2
        ? Yup.object({
            password: Yup.string(),
            confirm_password: Yup.string()
              .required()
              .oneOf([Yup.ref("password"), null], "password not match"),
          })
        : null,
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Container maxW="container.md" py="4" pb="10">
      <Box
        backgroundColor={"#F0FFF4"}
        borderColor="gray.300"
        borderWidth="1px"
        p="6"
        borderRadius="8px"
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab onClick={() => setTabNumber(1)}>Ubah Biodata Diri</Tab>
            <Tab onClick={() => setTabNumber(2)}>Ubah Kata Sandi</Tab>
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
                    Ubah Profil Pengguna
                  </Heading>
                  <Center>
                    <Avatar
                      size="2xl"
                      name={authSelector.name}
                      src={
                        formik.values.profile_picture
                          ? URL.createObjectURL(formik.values.profile_picture)
                          : authSelector.profile_picture
                      }
                    />
                  </Center>
                  <FormControl isInvalid={formik.errors.profile_picture}>
                    <FormLabel>Foto Profil</FormLabel>
                    <Button
                      w="full"
                      onClick={() => inputFileRef.current.click()}
                    >
                      Pilih Foto
                    </Button>
                    <Input
                      accept="image/*"
                      type="file"
                      name="profile_picture"
                      ref={inputFileRef}
                      display="none"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "profile_picture",
                          event.target.files[0]
                        )
                      }
                    />
                    <FormErrorMessage>
                      {formik.errors.profile_picture}
                    </FormErrorMessage>
                    <FormHelperText>
                      Besar file: maksimum 1 MB. Ekstensi file yang
                      diperbolehkan: .JPG .JPEG .PNG
                    </FormHelperText>
                  </FormControl>

                  <FormControl isInvalid={formik.errors.name}>
                    <FormLabel>Nama</FormLabel>
                    <Input
                      onChange={formChangeHandler}
                      name="name"
                      defaultValue={authSelector.name}
                    />
                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={formik.errors.gender}>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select
                      onChange={formChangeHandler}
                      defaultValue={authSelector.gender}
                      name="gender"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                    <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={formik.errors.phone}>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <Input
                      onChange={formChangeHandler}
                      name="phone"
                      defaultValue={authSelector.phone}
                    />
                    <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={formik.errors.date_of_birth}>
                    <FormLabel>Tanggal Lahir</FormLabel>

                    <Input
                      onChange={formChangeHandler}
                      name="date_of_birth"
                      defaultValue={authSelector.date_of_birth}
                      type="date"
                    />
                    <FormErrorMessage>
                      {formik.errors.date_of_birth}
                    </FormErrorMessage>
                  </FormControl>
                  <>
                    <Center>
                      <Button
                        width="80%"
                        colorScheme="teal"
                        onClick={formik.handleSubmit}
                      >
                        Simpan
                      </Button>
                    </Center>
                    <Center>
                      <Button
                        width="80%"
                        colorScheme="red"
                        onClick={() => navigate(-1)}
                      >
                        Batalkan
                      </Button>
                    </Center>
                  </>
                </Stack>
              </HStack>
            </TabPanel>
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
                    Ubah Profil Pengguna
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
                      >
                        Simpan
                      </Button>
                    </Center>
                    <Center>
                      <Button
                        width="80%"
                        colorScheme="red"
                        onClick={() => navigate(-1)}
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
  )
}

export default EditProfile
