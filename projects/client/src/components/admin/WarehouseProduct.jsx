import {
  Box,
  Button,
  Container,
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
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect, useRef, useState } from "react"
import { axiosInstance } from "../../api"
import { BiEdit } from "react-icons/bi"
import { RiDeleteBin5Fill } from "react-icons/ri"
import * as Yup from "yup"
import EditProduct from "./editProduct"
import PageButton from "./pageButton"

import { Rupiah } from "../../lib/currency/Rupiah"

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
      const temporary = response.data.data.filter((item) => item.id === idEdit)
      setImageEdit(temporary[0].ProductPictures)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchImage = async () => {
    try {
      const responseImg = await axiosInstance.get(`/product-admin/image`)

      setImages(responseImg.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getCategories = async () => {
    try {
      const responCat = await axiosInstance.get(`/categories`)

      setCategories(responCat.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBtn = async (id) => {
    try {
      await axiosInstance.delete(`/product-admin/${id}`)
      fetchProduct()
      fetchImage()
      toast({
        title: "Produk telah dihapus",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "Edit Product Gagal",
        status: "error",
        description: "Hanya Super Admin yang dapat menghapus produk",
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
    console.log(products, "product")
    return products.map((val) => {
      return (
        <Tr key={val.id} border={"1px solid black"} textAlign={"center"}>
          <Td border={"1px solid black"} textAlign={"center"}>
            {val.product_name}
          </Td>
          <Td
            border={"1px solid black"}
            textAlign={"center"}
            whiteSpace="pre-wrap"
            width="50%"
          >
            {" "}
            <Text textAlign="justify">{val.description} </Text>
          </Td>
          <Td border={"1px solid black"} textAlign={"center"}>
            {Rupiah(val.price)}
          </Td>
          <Td border={"1px solid black"} textAlign={"center"}>
            {val.CategoryId}
          </Td>
          <Td border={"1px solid black"} textAlign={"center"}>
            {val.weight}
          </Td>

          <Image
            src={`http://localhost:8000/public/${val.ProductPictures[0].product_picture}`}
          ></Image>

          <Td border={"1px solid black"} textAlign={"center"}>
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
              <BiEdit />
            </Button>
            <Button onClick={() => deleteBtn(val.id)} colorScheme="red" mx="3">
              <RiDeleteBin5Fill />
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

  const sortProductHandler = ({ target }) => {
    const { value } = target
    setSortBy(value.split(" ")[0])
    setSortDir(value.split(" ")[1])
  }

  const filterProductHandler = ({ target }) => {
    const { value } = target

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

        await axiosInstance.post(`/product-admin/`, formData)
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
          title: "Nama Produk Telah Ada",
          description: "Hanya Super Admin yang dapat menambahkan produk",
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
      weight: Yup.string().required("2 kg"),
      product_picture: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  const handleImage = (e) => {
    console.log(e.target.files, "123")
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      )
      setPreview(fileArray)
      console.log(fileArray, "file")
    }
  }

  return (
    <>
      <Flex h="100%" w="full" direction="column">
        <Flex w="full" justifyContent="center">
          <HStack mt="3" wrap="wrap" justifyContent="center">
            <Grid templateColumns="repeat(3, 1fr)" gap="4">
              <GridItem>
                <FormControl isInvalid={formik.errors.product_name}>
                  <FormLabel>Nama Produk</FormLabel>
                  <Input
                    borderColor="black"
                    name="product_name"
                    onChange={formChangeHandler}
                  />
                  <FormErrorMessage>
                    {formik.errors.product_name}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl
                  maxW="100%"
                  minColumn="1"
                  isInvalid={formik.errors.description}
                >
                  <FormLabel>Deskripsi</FormLabel>
                  <Textarea
                    minRows="1"
                    borderColor="black"
                    name="description"
                    onChange={formChangeHandler}
                  />
                  <FormErrorMessage>
                    {formik.errors.description}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.price}>
                  <FormLabel>Harga</FormLabel>
                  <Input
                    borderColor="black"
                    name="price"
                    onChange={formChangeHandler}
                  />
                  <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.CategoryId}>
                  <FormLabel>Category Id</FormLabel>
                  <Select
                    borderColor="black"
                    name="CategoryId"
                    onChange={formChangeHandler}
                  >
                    <option value="">Select Category</option>
                    {categories.map((val) => (
                      <option value={val.id}>{val.category}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {formik.errors.CategoryId}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.weight}>
                  <FormLabel>Berat</FormLabel>
                  <Input
                    borderColor="black"
                    name="weight"
                    onChange={formChangeHandler}
                  />
                  <FormErrorMessage>{formik.errors.weight}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl maxW="100%">
                  <FormLabel>Foto Produk</FormLabel>
                  <Button w="full" onClick={() => inputFileRef.current.click()}>
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
                      console.log(event.target.files, "eve")
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

            <Box w="full" h="8%"></Box>

            <Button
              disabled={formik.isSubmitting}
              onClick={formik.handleSubmit}
              my="4"
              colorScheme="teal"
            >
              Add Product
            </Button>
          </HStack>
        </Flex>
        <Box w="full" h="2.5%"></Box>

        <Grid
          gap="4"
          templateColumns={"repeat(4, 1fr)"}
          mt="10"
          mb="4"
          ml="20%"
        >
          <Select
            onChange={filterProductHandler}
            fontSize={"15px"}
            bgColor="white"
            color={"#6D6D6F"}
            placeholder="Filter"
          >
            <option value="">Select Category</option>
            {categories.map((val) => (
              <option value={val.id}>
                {val.id}. {val.category}
              </option>
            ))}
          </Select>

          <Select
            onChange={sortProductHandler}
            fontSize={"15px"}
            fontWeight="normal"
            fontFamily="serif"
            bgColor="white"
            color={"#6D6D6F"}
            placeholder="Sort By"
          >
            <option value="product_name ASC" selected>
              Name A-Z
            </option>
            <option value="product_name DESC">Name Z-A</option>
          </Select>

          <form onSubmit={formikSearch.handleSubmit}>
            <FormControl>
              <InputGroup textAlign={"right"}>
                <Input
                  type={"text"}
                  placeholder="Search"
                  name="search"
                  bgColor={"white"}
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
        <Box ml="50%">
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

        <Container maxW="container.xl" py="8" pb="5" px="1">
          <TableContainer
            border={"1px solid black"}
            w="1800px"
            mt={8}
            overflowY="unset"
          >
            <Table responsive="md" variant="simple">
              <Thead position={"sticky"} top={-1} backgroundColor={"#718096"}>
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
                    w="300px"
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
                </Tr>
              </Thead>
              <Tbody maxWidth="max-content"> {renderProduct()}</Tbody>
            </Table>
          </TableContainer>
        </Container>

        <HStack w="full" alignSelf="flex-end" justifyContent="center">
          {renderPageButton()}
          <Box>
            Page {page}/{Math.ceil(totalCount / limit)}
          </Box>
        </HStack>
        <Box h="4%" w="full"></Box>
      </Flex>

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
        />
      </Modal>
    </>
  )
}

export default WarehouseProduct
