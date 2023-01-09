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
import { Rupiah } from "../../../lib/currency/Rupiah"

const UserOrder = () => {
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // Render Warehouse
  const [data, setData] = useState([])

  const fetchAllOrder = async () => {
    try {
      let url = `/order/all-user`
      if (authSelector.WarehouseId) {
        url += `?WarehouseId=${authSelector.WarehouseId}`
      }
      const response = await axiosInstance.get(url)

      setData(response.data.data)
      setLoading(false)
    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    fetchAllOrder()
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
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Produk</Th>
                  <Th>Quantity</Th>
                  <Th>Total Harga</Th>
                  <Th>Warehouse</Th>
                  <Th>Status Order</Th>
                  <Th>Konfirmasi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading
                  ? null
                  : data.map((val) => {
                      return (
                        <Tr h="auto">
                          <Td cursor="pointer" _hover={{ color: "teal.400" }}>
                            {val.name}
                          </Td>
                          <Td>
                            <Text>{val.product_name}</Text>
                          </Td>
                          <Td>{val.quantity}</Td>
                          <Td>{Rupiah(val.total_price)}</Td>
                          <Td>{val.warehouse_name}</Td>
                          <Td textTransform="capitalize">{val.status}</Td>
                          {val.status === "menunggu konfirmasi pembayaran" ? (
                            <Td>
                              <Button>fraya</Button>
                              <Button>fraya</Button>
                            </Td>
                          ) : val.status === "diproses" ? (
                            <Td>
                              <Button>ariel</Button>
                              <Button>ariel</Button>
                            </Td>
                          ) : null}
                        </Tr>
                      )
                    })}
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

export default UserOrder
