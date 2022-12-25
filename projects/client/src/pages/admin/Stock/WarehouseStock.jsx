import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import {
  Box,
  Th,
  Tr,
  Td,
  Table,
  Thead,
  Tbody,
  Container,
  Flex,
  VStack,
  Text,
  Image,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../../api"
import SidebarAdmin from "../../../components/admin/sidebarAdminDashboard"
import Search from "../../../components/admin/stock/Search"
import { Rupiah } from "../../../lib/currency/Rupiah"
import EditStock from "../../../components/admin/stock/EditStock"

const WarehouseStock = ({}) => {
  // Selector Redux
  const authSelector = useSelector((state) => state.auth)
  const params = useParams()

  // Alert Functionality
  const toast = useToast()

  // Produck Data & Category
  const [data, setData] = useState([])
  console.log(
    "data",
    data.map((val) => val.ProductStock)
  )
  const [category, setCategory] = useState([])

  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(3)
  const [pages, setPages] = useState(0)
  const [rows, setRows] = useState(0)

  // Modal Edit Stock Props
  const [openModal, setOpenModal] = useState(false)
  const [stockEdit, setStockEdit] = useState("")
  const [idEdit, setIdEdit] = useState("")

  // Alert Confirmation
  const [delConfirm, setDelConfirm] = useState(null)
  const cancelRef = useRef()

  const fetchProductWarehouse = async () => {
    try {
      if (authSelector.RoleId === 2) {
        const response = await axiosInstance.get(
          `admin/stock/all-product/${authSelector.WarehouseId}`
        )

        setData(response.data.data.ProductStock)
      }

      const allWarehouse = await axiosInstance.get("admin/stock/all-warehouse")

      const warehouseId = allWarehouse.data.data.Warehouse.filter((val) => {
        return val.warehouse_name == params.id
      })

      const response = await axiosInstance.get(
        `admin/stock/all-product/${warehouseId[0].id}`
      )

      setData(response.data.data.ProductStock)
    } catch (err) {
      console.log(err)
    }
  }

  // const fetchProductWarehouse = async () => {
  //   try {
  //     if (authSelector.RoleId === 2) {
  //       const response = await axiosInstance.get(
  //         `admin/stock/all-product/${authSelector.WarehouseId}`
  //       )
  //       console.log("res", response)

  //       setData(response.data.result)
  //     }

  //     const allWarehouse = await axiosInstance.get("admin/stock/all-warehouse")

  //     const warehouseId = allWarehouse.data.result.filter((val) => {
  //       return val.warehouse_name == params.id
  //     })

  //     const response = await axiosInstance.get(
  //       `admin/stock/all-product/${warehouseId[0].id}`
  //     )
  //     console.log("res", response)

  //     setData(response.data.result)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleEdit = (stock, id) => {
    setOpenModal(true)
    setStockEdit(stock)
    setIdEdit(id)
  }

  // Delete Stock Functionality
  const btnDelete = async (id) => {
    try {
      await axiosInstance.patch(`/admin/stock/delete-stock/${id}`)

      fetchProductWarehouse()

      toast({ title: "Stok Terhapus", status: "success", duration: "1000ms" })
    } catch (err) {
      console.log(err)
      toast({
        title: "Gagal Menghapus Stok",
        status: "error",
      })
    }
  }

  // const hapus = () => {
  //   setDelConfirm(null)
  //   btnDelete(delConfirm.id)
  // }

  const renderProduct = () => {
    return data.map((val) =>
      val.Product.ProductPictures.map((value) => {
        return (
          <Tr h="auto" key={val.id}>
            <Td w="100px">
              <Image
                fit="fill"
                src={`http://localhost:8000/public/${value.product_picture}`}
                alt="gambar produk"
              />
            </Td>
            <Td>{val.Product.product_name || "Tidak ada Data"}</Td>
            <Td>{val.Product.Category.category || "Tidak ada Data"}</Td>
            <Td>{Rupiah(val.Product.price) || "Tidak ada Data"}</Td>
            <Td w="50px">{val.stock}</Td>
            <Td justify="space-between">
              <Button
                alignContent="left"
                colorScheme="messenger"
                _hover={{ bgColor: "telegram" }}
                onClick={() => handleEdit(val.stock, val.id)}
              >
                <EditIcon />
              </Button>
              <Button colorScheme="red" onClick={() => btnDelete(val.id)}>
                <DeleteIcon />
              </Button>
            </Td>
          </Tr>
        )
      })
    )
  }

  useEffect(() => {
    fetchProductWarehouse()
  }, [page])
  return (
    <>
      <Container bg="#e0e7eb" maxW="vw" p="0">
        <Flex h="100vh" p="0">
          <VStack h="full" w="30%" minW="220px" bg="#008deb">
            {SidebarAdmin()}
          </VStack>

          <VStack h="full" w="full" overflowX="scroll">
            <Text>Product Stock Data : {params.id}</Text>
            <Search />
            <Table>
              <Thead>
                <Tr>
                  <Th>Foto Produk</Th>
                  <Th>Nama Produk</Th>
                  <Th>Kategori</Th>
                  <Th>Harga Produk</Th>
                  <Th>Stok Produk</Th>
                  <Th>Opsi</Th>
                </Tr>
              </Thead>
              <Tbody>{renderProduct()}</Tbody>
            </Table>
          </VStack>
        </Flex>
      </Container>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditStock
          data={data}
          stockEdit={stockEdit}
          setStockEdit={setStockEdit}
          idEdit={idEdit}
          setOpenModal={setOpenModal}
          fetchProductWarehouse={fetchProductWarehouse}
        />
      </Modal>
    </>
  )
}

export default WarehouseStock
