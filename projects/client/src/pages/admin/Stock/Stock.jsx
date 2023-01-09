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
  const [filter, setFilter] = useState("All")
  const [maxPage, setMaxPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [limit, setLimit] = useState(8)
  const [sortBy, setSortBy] = useState("warehouse_name")
  const [sortDir, setSortDir] = useState("ASC")
  const [page, setPage] = useState(1)

  const fetchAllWarehouse = async () => {
    const productPerPage = 8
    try {
      const response = await axiosInstance.get(`/admin/stock/all-warehouse`, {
        params: {
          _limit: productPerPage,
          _page: page,
          _sortBy: sortBy,
          _sortDir: sortDir,
          _sortDir: "DESC",
          WarehouseId: filter,
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

  const toWarehouse = (warehouse_name) => {
    navigate(`/admin/manage-stock/${warehouse_name}`)
  }

  // const changePage = ({ selected }) => {
  //   setPage(selected)
  // }

  const warehouseOptions = warehouse.map((val) => {
    return { value: val.id, label: val.warehouse_name }
  })

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  const filterWarehouse = (event) => {
    const value = event.value

    setFilter(value)
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
  }, [page, sortBy, sortDir, filter])

  return (
    <>
      <Container bg="#e0e7eb" maxW="vw" p="0">
        <Flex h="100vh" p="0">
          <VStack h="full" w="30%" minW="220px" bg="#008deb">
            {SidebarAdmin()}
          </VStack>

          <VStack h="90%" w="full" overflowX="scroll">
            <Grid templateColumns="repeat(1, 1fr)" gap="10">
              <GridItem>
                <FormLabel>Filter Warehouse</FormLabel>
                <Select
                  styles={customStyles}
                  onChange={filterWarehouse}
                  placeholder="Pilih ..."
                  options={warehouseOptions}
                />
              </GridItem>
            </Grid>

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
