import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../../api"
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
  Modal,
  Table,
  InputGroup,
  InputRightAddon,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react"
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai"
import ReactPaginate from "react-paginate"
import { Link, useNavigate } from "react-router-dom"
import SidebarAdmin from "../../../components/admin/sidebarAdminDashboard"
import { useSelector } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import Select from "react-select"

const Stock = () => {
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const toast = useToast()

  // React Paginate
  // const [page, setPage] = useState(0)
  // const [limit, setLimit] = useState(1)
  // const [pages, setPages] = useState(0)
  // const [rows, setRows] = useState(0)
  const [product, setProduct] = useState([])

  // Render Warehouse
  const [warehouse, setWarehouse] = useState([])
  // const [filter, setFilter] = useState("All")
  // const fetchAllWarehouse = async () => {
  //   try {
  //     const response = await axiosInstance.get(`/admin/stock/all-warehouse`)

  //     setWarehouse(response.data.data.Warehouse)
  //   } catch (err) {
  //     console.log(err.response)
  //   }
  // }
  const [maxPage, setMaxPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("warehouse_name")
  const [sortDir, setSortDir] = useState("ASC")
  const [page, setPage] = useState(1)

  const fetchAllWarehouse = async () => {
    const productPerPage = 8
    try {
      const response = await axiosInstance.get(`/admin/stock/all-warehouse`, {
        params: {
          _page: page,
          _limit: productPerPage,
          _sortBy: sortBy,
          _sortDir: sortDir,
        },
      })
      setTotalCount(response.data.dataCount)
      setMaxPage(Math.ceil(response.data.dataCount / productPerPage))

      if (page === 1) {
        setWarehouse(response.data.data)
      } else {
        setWarehouse(response.data.data)
      }
    } catch (err) {
      console.log(err.response)
    }
  }

  // const fetchAllWarehouse = async () => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `/admin/stock/all-warehouse?page=${page}&limit=${limit}`
  //     )

  //     setWarehouse(response.data.result)
  //     setPage(response.data.page)
  //     setPages(response.data.totalPage)
  //     setRows(response.data.totalRows)
  //   } catch (err) {
  //     console.log(err.response)
  //   }
  // }

  const toWarehouse = (warehouse_name) => {
    navigate(`/admin/update-stock/${warehouse_name}`)
  }

  // const changePage = ({ selected }) => {
  //   setPage(selected)
  // }

  const formik = useFormik({
    initialValues: {
      stock: "",
      ProductId: "",
      WarehouseId: "",
      id: "",
    },
    onSubmit: async (values) => {
      try {
        const { stock, ProductId, WarehouseId } = values
        let createStock = { stock, ProductId, WarehouseId }

        await axiosInstance.post("/admin/stock/create-stock", createStock)
        formik.setFieldValue(stock, "")
        formik.setFieldValue(ProductId, "")
        formik.setFieldValue(WarehouseId, "")
        formik.setSubmitting(false)

        fetchProduct()
        fetchAllWarehouse()

        toast({
          title: "Stok berhasil ditambahkan",
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Stok gagal ditambahkan",
          status: "error",
          description:
            "Produk telah ada , tidak bisa menambah produk yang sama",
        })
      }
    },
    validationSchema: Yup.object({
      stock: Yup.number().required("Stok harus diisi"),
      ProductId: Yup.number().required("Produk harus dipilih"),
      WarehouseId: Yup.number().required("Warehouse harus dipilih"),
    }),
    validateOnChange: false,
  })

  // Product Options Functionality
  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("/product-admin")

      setProduct(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  const productOptions = product.map((val) => {
    return { value: val.id, label: val.product_name }
  })
  // ===============================================================

  const warehouseOptions = warehouse.map((val) => {
    return { value: val.id, label: val.warehouse_name }
  })

  const formChange = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  const nextPage = () => {
    setPage(page + 1)
    // setIsLoading(false)
  }

  const previousPage = () => {
    setPage(page - 1)
    // setIsLoading(false)
  }

  // const filterWarehouse = (event) => {
  //   const value = event.value

  //   setFilter(value)
  // }

  const customStyles = {
    control: (base) => ({
      ...base,
      width: "min-content",
      minWidth: "25vh",
    }),
  }

  useEffect(() => {
    fetchAllWarehouse()
    fetchProduct()
  }, [page, sortBy, sortDir])
  // useEffect(() => {
  //   fetchAllWarehouse()
  //   fetchProduct()
  // }, [page])
  return (
    <>
      <Container bg="#e0e7eb" maxW="vw" p="0">
        <Flex h="100vh" p="0">
          <VStack h="full" w="30%" minW="220px" bg="#008deb">
            {SidebarAdmin()}
          </VStack>

          <VStack h="90%" w="full" overflowX="scroll">
            <Grid templateColumns="repeat(4, 1fr)" gap="10">
              <GridItem>
                <FormLabel>Filter Warehouse</FormLabel>
                {/* <Input bgColor="white" placeholder="Warehouse ..." /> */}
                <Select
                  styles={customStyles}
                  // onChange={filterWarehouse}
                  placeholder="Pilih ..."
                  options={warehouseOptions}
                />
              </GridItem>
              <GridItem>
                <FormControl isInvalid={formik.errors.stock}>
                  <FormLabel>Input Stok</FormLabel>
                  <Input
                    bgColor="white"
                    placeholder="Stok ..."
                    type="number"
                    name="stock"
                    value={formik.values.stock}
                    onChange={formChange}
                  />
                  <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.ProductId}>
                  <FormLabel>Pilih Produk</FormLabel>
                  <Select
                    styles={customStyles}
                    name="ProductId"
                    bgColor="white"
                    fontSize="15px"
                    placeholder="Pilih Produk ..."
                    onChange={(e) => {
                      formik.setFieldValue("ProductId", e.value)
                    }}
                    value={{ label: formik.values.ProductId }}
                    options={productOptions}
                  />
                  <FormErrorMessage>{formik.errors.ProductId}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl maxW="100%" isInvalid={formik.errors.WarehouseId}>
                  <FormLabel>Pilih Warehouse</FormLabel>
                  <Select
                    styles={customStyles}
                    placeholder="Pilih Warehouse ..."
                    name="WarehouseId"
                    onChange={(e) => {
                      formik.setFieldValue("WarehouseId", e.value)
                    }}
                    value={{ label: formik.values.WarehouseId }}
                    options={warehouseOptions}
                  />
                  <FormErrorMessage>
                    {formik.errors.WarehouseId}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>
            <Button
              colorScheme="teal"
              onClick={formik.handleSubmit}
              _hover={{ boxShadow: "lg", transform: "translateY(5px)" }}
            >
              Tambah Stok
            </Button>

            <Table>
              <Thead>
                <Tr>
                  <Th>Nama Warehouse</Th>
                  <Th>Alamat</Th>
                  <Th>Kota</Th>
                  <Th>Provinsi</Th>
                  <Th>Warehouse Admin</Th>
                </Tr>
              </Thead>
              <Tbody>
                {warehouse.map((val) =>
                  val.WarehousesUsers.map((value) => (
                    <Tr h="auto">
                      <Td
                        cursor="pointer"
                        _hover={{ color: "teal.400" }}
                        onClick={() => toWarehouse(val.warehouse_name)}
                      >
                        {val.warehouse_name || "Not found"}
                      </Td>
                      <Td>{val.address}</Td>
                      <Td>{val.city}</Td>
                      <Td>{val.province}</Td>
                      <Td>{value.User.name || "Need Assign"}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
            <Box p="20px" fontSize={"16px"}>
              <Box textAlign={"center"}>
                <Button
                  onClick={previousPage}
                  disabled={page === 1 ? true : null}
                  _hover={false}
                  _active={false}
                >
                  <AiOutlineLeftCircle fontSize={"20px"} />
                </Button>

                <Box display={"inline"}>{page}</Box>

                <Button
                  onClick={nextPage}
                  disabled={page >= maxPage ? true : null}
                  _hover={false}
                  _active={false}
                >
                  <AiOutlineRightCircle fontSize={"20px"} />
                </Button>
                <Box>
                  Page: {page} of {maxPage}
                </Box>
              </Box>
            </Box>
            {/* <ReactPaginate
              breakLabel="..."
              containerClassName="address-pagination-buttons"
              nextLabel="Berikutnya"
              onPageChange={changePage}
              pageRangeDisplayed={5}
              pageClassName="address-pagination-pages"
              pageCount={Math.min(10, pages)}
              previousLabel="Sebelumnya"
            /> */}
          </VStack>
        </Flex>
      </Container>
    </>
  )
}

export default Stock
