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
  Select,
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
} from "@chakra-ui/react"
import { BiEdit } from "react-icons/bi"
import { RiDeleteBin5Fill } from "react-icons/ri"
import ReactPaginate from "react-paginate"
import { Link, useNavigate } from "react-router-dom"
import SidebarAdmin from "../../../components/admin/sidebarAdminDashboard"
import { useSelector } from "react-redux"

const Stock = () => {
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()

  // Pagination & Search
  // const [page, setPage] = useState(0)
  // const [limit, setLimit] = useState(3)
  // const [pages, setPages] = useState(0)
  // const [rows, setRows] = useState(0)

  // Render Warehouse
  const [warehouse, setWarehouse] = useState([])

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
  //     console.log("res", response)

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

  useEffect(() => {
    fetchAllWarehouse()
  }, [])
  return (
    <>
      <Container bg="#e0e7eb" maxW="vw" p="0">
        <Flex h="100vh" p="0">
          <VStack h="full" w="30%" minW="220px" bg="#008deb">
            {SidebarAdmin()}
          </VStack>

          <VStack h="90%" w="full" overflowX="scroll">
            <Search />
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
                {/* {warehouse.map((val) => (
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
                    <Td>{val.User?.name || "Need Assign"}</Td>
                  </Tr>
                ))} */}
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
