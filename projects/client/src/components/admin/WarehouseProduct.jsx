import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  Modal,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect, useRef, useState } from "react"
import { axiosInstance } from "../../api"
import { BiEdit } from "react-icons/bi"
import { RiDeleteBin5Fill } from "react-icons/ri"
import * as Yup from "yup"
import EditProduct from "./editProduct"
import PageButton from "./pageButton"
import Select from "react-select"
import { Carousel } from "react-responsive-carousel"
import { Rupiah } from "../../lib/currency/Rupiah"
import { useSearchParams } from "react-router-dom"

const WarehouseProduct = () => {
  const [products, setproducts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [idEdit, setIdEdit] = useState("")
  const [nameEdit, setNameEdit] = useState("")
  const [descEdit, setDescEdit] = useState("")
  const [catEdit, setCatEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [weightEdit, setWeightEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")
  const [images, setImages] = useState([])
  const inputFileRef = useRef()
  const [categories, setCategories] = useState([])
  const [preview, setPreview] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("product_name")
  const [sortDir, setSortDir] = useState("DESC")
  const [filter, setFilter] = useState("All")
  const [currentSearch, setCurrentSearch] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const btnRef = useRef()
  const [openAlert, setOpenAlert] = useState(false)
  const [idDelete, setIdDelete] = useState(0)
  const [disable, setDisable] = useState(true)

  const toast = useToast()

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/product-admin`, {
        params: {
          _limit: limit,
          _page: page,
          _sortDir: sortDir,
          _sortBy: sortBy,
          CategoryId: filter,
          product_name: currentSearch,
        },
      })

      setTotalCount(response.data.dataCount)

      setproducts(response.data.data)
      formik.handleReset()
      const temporary = response.data.data.filter((item) => item.id === idEdit)
      setImageEdit(temporary[0].ProductPictures)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchImage = async () => {
    try {
      const response = await axiosInstance.get(`/product-admin/image`)

      setImages(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get(`/categories`)

      setCategories(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBtn = async () => {
    try {
      const response = await axiosInstance.delete(`/product-admin/${idDelete}`)

      fetchProduct()
      fetchImage()

      setOpenAlert(false)
      toast({
        title: "Produk telah dihapus",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "Hapus Product Gagal",
        status: "error",
        description: err.response.data.message,
      })
    }
  }

  const handleEdit = (
    product_name,
    description,
    price,
    CategoryId,
    weight,
    product_picture,
    id
  ) => {
    setOpenModal(true)
    setNameEdit(product_name)
    setDescEdit(description)
    setPriceEdit(price)
    setCatEdit(CategoryId)
    setWeightEdit(weight)
    setImageEdit(product_picture)
    setIdEdit(id)
  }

  const renderProduct = () => {
    return products.map((val) => {
      return (
        <Tr key={val.id} border={"1px solid black"} textAlign={"center"}>
          <Td width="20%" border={"1px solid black"} textAlign={"center"}>
            {val.product_name}
          </Td>
          <Td
            border={"1px solid black"}
            textAlign={"center"}
            whiteSpace="pre-wrap"
            width="30%"
          >
            <Text textAlign="justify">{val.description} </Text>
          </Td>
          <Td width="10%" border={"1px solid black"} textAlign={"center"}>
            {Rupiah(val.price)}
          </Td>
          <Td width="2vh" border={"1px solid black"} textAlign={"center"}>
            {val.CategoryId}
          </Td>
          <Td width="4vh" border={"1px solid black"} textAlign={"center"}>
            {val.weight}
          </Td>
          <Carousel width="20vh" autoPlay={true}>
            {val.ProductPictures.map((value) => (
              <Image
                src={`https://jcwd220201.purwadhikabootcamp.com/public/${value.product_picture}`}
              ></Image>
            ))}
          </Carousel>

          <Td width="23%" border={"1px solid black"} textAlign={"center"}>
            <Button
              alignContent={"left"}
              onClick={() =>
                handleEdit(
                  val.product_name,
                  val.description,
                  val.price,
                  val.CategoryId,
                  val.weight,
                  val.ProductPictures,
                  val.id
                )
              }
              mx="3"
              colorScheme={"teal"}
            >
              <BiEdit /> Edit
            </Button>
            <Button
              ref={btnRef}
              onClick={() => handleOpenAlert(val.id)}
              colorScheme="red"
              mx="4"
            >
              <RiDeleteBin5Fill /> Hapus
            </Button>
          </Td>
        </Tr>
      )
    })
  }

  const renderPageButton = () => {
    const totalPage = Math.ceil(totalCount / limit)

    const pageArray = new Array(totalPage).fill(null).map((val, i) => ({
      id: i + 1,
    }))

    return pageArray.map((val) => {
      return (
        <PageButton
          key={val.id.toString()}
          id={val.id}
          onClick={() => setPage(val.id)}
        />
      )
    })
  }

  const sortProductHandler = (event) => {
    const value = event.value
    setSortBy(value.split(" ")[0])
    setSortDir(value.split(" ")[1])
  }

  const filterProductHandler = (event) => {
    const value = event.value
    setFilter(value)
  }

  const formikSearch = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search)
    },
  })

  const searchHandler = ({ target }) => {
    const { name, value } = target
    formikSearch.setFieldValue(name, value)
  }

  const btnResetFilter = () => {
    setCurrentSearch(false)
    setSortBy(false)
    setFilter(false)
    window.location.reload(false)
  }

  useEffect(() => {
    fetchProduct()
  }, [page, sortBy, sortDir, filter, currentSearch])

  useEffect(() => {
    getCategories()
    fetchImage()
  }, [])

  const formik = useFormik({
    initialValues: {
      product_name: "",
      description: "",
      price: "",
      CategoryId: "",
      weight: "",
      product_picture: null,
      id: "",
    },

    onSubmit: async (values) => {
      try {
        const {
          product_name,
          description,
          price,
          CategoryId,
          weight,
          product_picture,
        } = values

        const formData = new FormData()
        formData.append("product_name", product_name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("CategoryId", CategoryId)
        formData.append("weight", weight)

        Object.values(product_picture).forEach((product_picture) => {
          formData.append("product_picture", product_picture)
        })

        const response = await axiosInstance.post(`/product-admin/`, formData)
        formik.setFieldValue(product_name, "")
        formik.setFieldValue(description, "")
        formik.setFieldValue(price, "")
        formik.setFieldValue(CategoryId, "")
        formik.setFieldValue(weight, "")
        formik.setFieldValue(product_picture, [])
        formik.setSubmitting(false)

        fetchProduct()
        fetchImage()
        toast({
          title: "Produk telah ditambahkan",
          status: "success",
        })
      } catch (err) {
        toast({
          title: "Produk Gagal ditambahkan",
          description: err.response.data.message,
          status: "error",
        })
        console.log(err)
      }
    },
    validationSchema: Yup.object({
      product_name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.string().required(),
      CategoryId: Yup.string().required(),
      weight: Yup.string().required("Dalam Satuan Gram"),
      product_picture: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  const handleImage = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      )
      setPreview(fileArray)
    }
  }

  const handleOpenAlert = (id) => {
    setOpenAlert(true)
    setIdDelete(id)
  }

  const categoryOption = categories.map((val) => {
    return { value: val.id, label: val.category }
  })

  const nameOption = [
    { value: "product_name ASC", label: "Name A-Z" },
    { value: "product_name DESC", label: "Name Z-A" },
  ]

  const handleDisable = () => {
    let tempField = []
    if (formik.values.product_name !== "") {
      tempField.push(formik.values.product_name)
    }
    if (formik.values.description !== "") {
      tempField.push(formik.values.description)
    }
    if (formik.values.price !== "") {
      tempField.push(formik.values.price)
    }
    if (formik.values.CategoryId !== "") {
      tempField.push(formik.values.CategoryId)
    }
    if (formik.values.weight !== "") {
      tempField.push(formik.values.weight)
    }
    if (formik.values.product_picture?.length > 0) {
      tempField.push(formik.values.product_picture)
    }

    if (tempField.length === 6) {
      setDisable(false)
    }
  }

  useEffect(() => {
    handleDisable()
  }, [
    formik.values.product_name,
    formik.values.description,
    formik.values.price,
    formik.values.CategoryId,
    formik.values.weight,
    formik.values.product_picture,
    disable,
  ])

  return (
    <>
      <Flex h="100%" direction="column">
        <Flex w="full" justifyContent="center">
          <HStack mt="3" wrap="wrap" justifyContent="center">
            <Grid templateColumns="repeat(3, 1fr)" gap="-6" ml="60" mr="60">
              <GridItem>
                <FormControl isInvalid={formik.errors.product_name}>
                  <FormLabel>Nama Produk</FormLabel>
                  <Input
                    h="6vh"
                    w="30vh"
                    borderColor="black"
                    name="product_name"
                    onChange={formChangeHandler}
                    value={formik.values.product_name}
                    backgroundColor="white"
                  />
                  <FormErrorMessage>
                    {formik.errors.product_name}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Deskripsi</FormLabel>
                  <Textarea
                    h="6vh"
                    w="30vh"
                    minH="unset"
                    minRows="1"
                    borderColor="black"
                    name="description"
                    onChange={formChangeHandler}
                    value={formik.values.description}
                    backgroundColor="white"
                  />
                  <FormErrorMessage>
                    {formik.errors.description}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={formik.errors.price}>
                  <FormLabel>Harga</FormLabel>
                  <Input
                    h="6vh"
                    w="30vh"
                    borderColor="black"
                    name="price"
                    onChange={formChangeHandler}
                    value={formik.values.price}
                    backgroundColor="white"
                  />
                  <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={formik.errors.CategoryId}>
                  <FormLabel>Category Id</FormLabel>
                  <Select
                    name="CategoryId"
                    onChange={(e) => {
                      formik.setFieldValue("CategoryId", e.value)
                    }}
                    value={{ label: formik.values.CategoryId }}
                    options={categoryOption}
                    fontSize={"15px"}
                    color={"black"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        width: "min-content",
                        minWidth: "30vh",
                        minHeight: "6vh",
                        borderColor: "black",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 999,
                      }),
                    }}
                  ></Select>
                  <FormErrorMessage>
                    {formik.errors.CategoryId}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={formik.errors.weight}>
                  <FormLabel>Berat</FormLabel>
                  <Input
                    h="6vh"
                    w="30vh"
                    borderColor="black"
                    name="weight"
                    onChange={formChangeHandler}
                    value={formik.values.weight}
                    backgroundColor="white"
                  />
                  <FormHelperText>Dalam Satuan Gram</FormHelperText>
                  <FormErrorMessage>{formik.errors.weight}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Foto Produk</FormLabel>
                  <Button
                    h="6vh"
                    w="30vh"
                    onClick={() => inputFileRef.current.click()}
                  >
                    + Tambahkan Foto
                  </Button>
                  <Input
                    accept="image/*"
                    type="file"
                    multiple={true}
                    name="product_picture"
                    ref={inputFileRef}
                    display="none"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "product_picture",
                        event.target.files
                      )
                      handleImage(event)
                    }}
                  />
                  <FormHelperText>
                    Besar file: maksimum 1 MB. Ekstensi file yang diperbolehkan:
                    .JPG .JPEG .PNG
                  </FormHelperText>
                </FormControl>
              </GridItem>
            </Grid>
            {preview?.map((item) => (
              <>
                {formik.values.product_picture ? (
                  <Image boxSize="100px" src={item}></Image>
                ) : null}
              </>
            ))}

            <Button
              onClick={formik.handleSubmit}
              isDisabled={disable}
              my="4"
              colorScheme="teal"
            >
              Add Product
            </Button>
          </HStack>
        </Flex>
        <Box w="full" h="5%"></Box>

        <Grid
          gap="4"
          templateColumns={"repeat(4, 1fr)"}
          mt="10"
          mb="4"
          ml="20%"
          zIndex="2"
        >
          <Select
            onChange={filterProductHandler}
            fontSize={"15px"}
            bgColor="white"
            color={"#6D6D6F"}
            placeholder="Filter"
            options={categoryOption}
            menuPosition="fixed"
            styles={{
              menu: (provided) => ({ ...provided, zIndex: 1, top: 0 }),
            }}
          ></Select>

          <Select
            onChange={(e) => {
              sortProductHandler(e)
            }}
            fontSize={"15px"}
            fontWeight="normal"
            fontFamily="serif"
            bgColor="white"
            color={"#6D6D6F"}
            placeholder="Sort By"
            options={nameOption}
          ></Select>

          <form onSubmit={formikSearch.handleSubmit}>
            <FormControl>
              <InputGroup textAlign={"right"}>
                <Input
                  type={"text"}
                  placeholder="Search"
                  name="search"
                  bgColor={"white"}
                  // onChange={(e) => setCurrentSearch(e.target.value)}
                  onChange={searchHandler}
                  borderRightRadius="0"
                  value={formikSearch.values.search}
                />

                <Button
                  borderLeftRadius={"0"}
                  bgColor={"white"}
                  type="submit"
                  border="1px solid #e2e8f0"
                  borderLeft={"0px"}
                >
                  search
                </Button>
              </InputGroup>
            </FormControl>
          </form>
        </Grid>
        <Box ml="47%" mb="4">
          <Button
            onClick={btnResetFilter}
            p="3"
            bgColor="white"
            variant="solid"
            _hover={{ borderBottom: "2px solid " }}
          >
            Reset Filter
          </Button>
        </Box>

        <Box py="-2" pb="2" px="12" mt="2" zIndex="0" position="relative">
          <Table responsive="md" variant="simple">
            <Thead
              zIndex="2"
              position={"sticky"}
              top={-1}
              backgroundColor={"#718096"}
            >
              <Tr border={"1px solid black"} maxW="50px">
                <Th
                  border={"1px solid black"}
                  textAlign={"center"}
                  color="black"
                  w="100px"
                >
                  Nama Produk
                </Th>
                <Th
                  border={"1px solid black"}
                  textAlign={"center"}
                  color="black"
                  w="100px"
                >
                  Deskripsi
                </Th>
                <Th
                  border={"1px solid black"}
                  textAlign={"center"}
                  color="black"
                  w="100px"
                >
                  Harga
                </Th>
                <Th
                  border={"1px solid black"}
                  textAlign={"center"}
                  color="black"
                  w="100px"
                >
                  Category Id
                </Th>
                <Th
                  border={"1px solid black"}
                  textAlign={"center"}
                  color="black"
                  w="100px"
                >
                  Berat
                </Th>
                <Th
                  border={"1px solid black"}
                  textAlign={"center"}
                  color="black"
                  w="100px"
                >
                  Foto Produk
                </Th>
                <Th
                  border={"1px solid black"}
                  textAlign={"center"}
                  color="black"
                  w="100px"
                ></Th>
              </Tr>
            </Thead>
            <Tbody backgroundColor="white" maxWidth="max-content">
              {renderProduct()}
            </Tbody>
          </Table>
        </Box>

        <Box h="4%" w="full"></Box>
        {!products.length ? (
          <Alert
            status="error"
            variant="subtle"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            alignSelf="center"
            h="200px"
            w="94%"
          >
            <AlertIcon boxSize="20px" mr="0" />
            <AlertTitle>Oops, produk tidak ditemukan !</AlertTitle>
            <AlertDescription>
              Coba kata kunci lain. Terimakasih
              <span size="lg">🤯</span>
            </AlertDescription>
          </Alert>
        ) : null}

        <HStack mt="3" w="full" alignSelf="flex-end" justifyContent="center">
          {renderPageButton()}
          <Box>
            Page {page}/{Math.ceil(totalCount / limit)}
          </Box>
        </HStack>
      </Flex>

      <AlertDialog
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        leastDestructiveRef={cancelRef}
        motionPreset="slideInBottom"
        isCentered
        finalFocusRef={btnRef}
      >
        <AlertDialogOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        >
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontStyle="bold">
              Hapus Produk
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              Apakah Yakin Ingin Menghapus Produk?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                mr="10px"
                ref={cancelRef}
                onClick={() => setOpenAlert(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => deleteBtn()} colorScheme="red">
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditProduct
          nameEdit={nameEdit}
          products={products}
          setNameEdit={setNameEdit}
          descEdit={descEdit}
          setDescEdit={setDescEdit}
          priceEdit={priceEdit}
          setPriceEdit={setPriceEdit}
          catEdit={catEdit}
          setCatEdit={setCatEdit}
          weightEdit={weightEdit}
          setWeightEdit={setWeightEdit}
          idEdit={idEdit}
          imageEdit={imageEdit}
          setImageEdit={setImageEdit}
          setOpenModal={setOpenModal}
          fetchProduct={fetchProduct}
          getCategories={getCategories}
          fetchImage={fetchImage}
          preview={preview}
          setPreview={setPreview}
          categories={categories}
          categoryOption={categoryOption}
        />
      </Modal>
    </>
  )
}

export default WarehouseProduct
