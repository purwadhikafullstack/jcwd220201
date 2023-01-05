import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../../api"
import Search from "../../../components/admin/stock/Search"

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

  // Pagination & Search
  // const [page, setPage] = useState(0)
  // const [limit, setLimit] = useState(1)
  // const [pages, setPages] = useState(0)
  // const [rows, setRows] = useState(0)
  const [product, setProduct] = useState([])

  // Render Warehouse
  const [warehouse, setWarehouse] = useState([])
  console.log("ware", warehouse)
  const fetchAllWarehouse = async () => {
    try {
      const response = await axiosInstance.get(`/admin/stock/all-warehouse`)

      setWarehouse(response.data.data.Warehouse)
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
  }, [])
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
                <FormLabel>Cari Warehouse</FormLabel>
                <Input bgColor="white" placeholder="Warehouse ..." />
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
                </FormControl>
                <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
              </GridItem>
              <GridItem>
                <FormControl maxW="100%">
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
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl maxW="100%">
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
