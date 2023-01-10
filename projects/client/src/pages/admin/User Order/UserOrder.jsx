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
  useToast,
} from "@chakra-ui/react"
import CancelButton from "../../../components/admin/CancelButton"
import SendButton from "../../../components/admin/SendButton"
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

  const toast = useToast()

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
      console.log(err)
    }
  }

  const confirmOrder = async (id) => {
    try {
      await axiosInstance.patch(`/payment/confirm/${id}`)

      fetchAllOrder()
      toast({
        title: "email dikirim",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "konfirmasi pembayaran gagal",
        status: "error",
      })
    }
  }

  const rejectOrder = async (id) => {
    try {
      const response = await axiosInstance.patch(`/payment/reject/${id}`)

      fetchAllOrder()
      toast({
        title: "email reject dikirim",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "reject pembayaran gagal",
        status: "error",
      })
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
                              <Button
                                alignContent={"left"}
                                onClick={() => confirmOrder(val.id)}
                                mx="3"
                                colorScheme={"telegram"}
                              >
                                Konfirmasi
                              </Button>
                              <Button
                                alignContent={"left"}
                                onClick={() => rejectOrder(val.id)}
                                mx="3"
                                colorScheme={"red"}
                              >
                                Batalkan
                              </Button>
                            </Td>
                          ) : val.status === "diproses" ? (
                            <Td>
                              <HStack>
                                <SendButton id={val.id} />
                                <CancelButton
                                  id={val.id}
                                  warehouseId={val.WarehouseId}
                                />
                              </HStack>
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
