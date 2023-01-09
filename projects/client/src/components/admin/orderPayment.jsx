import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Flex,
  Modal,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { useState } from "react"
import { axiosInstance } from "../../api"
import SidebarAdmin from "./sidebarAdminDashboard"

const OrderPayment = () => {
  const [payment, setPayment] = useState([])
  const toast = useToast()
  const [reject, setReject] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [sending, setSending] = useState(false)

  const fetchOrder = async () => {
    try {
      const response = await axiosInstance.get(`/payment`)

      setPayment(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const confirmOrder = async (id) => {
    try {
      setSending(true)
      await axiosInstance.patch(`/payment/confirm/${id}`)

      fetchOrder()
      toast({
        title: "email dikirim",
      })
      setSending(false)
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

      setReject(response.data.data)

      fetchOrder()
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

  const renderOrder = () => {
    return payment.map((val) => {
      return (
        <Tr key={val.id}>
          <Td textAlign={"center"}>{val.payment_date}</Td>
          <Td textAlign={"center"}>{val.total_price}</Td>
          <Td textAlign={"center"}>{val.StatusId}</Td>
          <Td textAlign={"center"}>{val.UserId}</Td>
          <Td textAlign={"center"}>{val.shipping_cost}</Td>
          <Td>
            <Button
              alignContent={"left"}
              onClick={() => confirmOrder(val.id)}
              disabled={sending}
              mx="3"
              colorScheme={"teal"}
            >
              confirm
            </Button>
            <Button colorScheme="red" onClick={onOpen}>
              Reject
            </Button>
            <AlertDialog isOpen={isOpen} onClose={onClose}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontStyle="bold">
                    Pembatalan Pembayaran
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Apakah pembayaran ini ingin dibatalkan?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button mr="10px" ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        rejectOrder(val.id)
                      }}
                    >
                      Reject
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <>
      <Container bg="#e0e7eb" maxW="vw" p="0">
        <Flex h="100vh" p="0">
          <VStack h="full" w="30%" minW="220px" bg="#008deb">
            {SidebarAdmin()}
          </VStack>

          <VStack h="full" w="full" overflowX="scroll">
            <Flex h="20%" w="full" justifyContent="flex-end" direction="column">
              <Box
                padding="4"
                textAlign="center"
                fontWeight="bold"
                fontSize="200x"
              >
                Order Payment Status
              </Box>
            </Flex>
            <Flex>
              <Container maxW="container.lg" py="8" pb="5" px="1">
                <TableContainer
                  border={"1px solid black"}
                  w="1800px"
                  mt={8}
                  overflowY="unset"
                >
                  <Table responseonsive="md" variant="simple">
                    <Thead position={"sticky"} top={-1}>
                      <Tr border={"1px solid black"} maxW="50px">
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          Payment_Date
                        </Th>

                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          Total_Price
                        </Th>

                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          Status Id
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          User Id
                        </Th>
                        <Th
                          border={"1px solid black"}
                          textAlign={"center"}
                          color="black"
                          w="100px"
                        >
                          shipping cost
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody maxWidth="max-content">{renderOrder()}</Tbody>
                  </Table>
                </TableContainer>
              </Container>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </>
  )
}

export default OrderPayment
