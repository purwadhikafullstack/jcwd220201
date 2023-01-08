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
  Tooltip,
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
import ReactPaginate from "react-paginate"
import { Carousel } from "react-responsive-carousel"
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai"

const WarehouseStock = ({}) => {
  // Selector Redux
  const authSelector = useSelector((state) => state.auth)
  const params = useParams()

  // Alert Functionality
  const toast = useToast()

  // Produck Data & Category
  const [data, setData] = useState([])
  console.log("data", data)
  const [sortBy, setSortBy] = useState("product_name")
  const [sortDir, setSortDir] = useState("ASC")
  const [maxPage, setMaxPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [filter, setFilter] = useState(0)
  // const [currentSearch, setCurrentSearch] = useState("")
  const [page, setPage] = useState(1)

  // const [category, setCategory] = useState([])

  // Modal Edit Stock Props
  const [openModal, setOpenModal] = useState(false)
  const [stockEdit, setStockEdit] = useState("")
  const [idEdit, setIdEdit] = useState("")

  // Alert Confirmation
  const [delConfirm, setDelConfirm] = useState(null)
  const cancelRef = useRef()

  const fetchProductWarehouse = async () => {
    const productPerPage = 10
    try {
      if (authSelector.RoleId === 2) {
        const response = await axiosInstance.get(
          `/admin/stock/all-product/${authSelector.WarehouseId}`,
          {
            params: {
              _page: page,
              _limit: productPerPage,
              // product_name: currentSearch,
              // CategoryId: filter,
              _sortBy: sortBy,
              _sortDir: sortDir,
            },
          }
        )
        setTotalCount(response.data.dataCount)
        setMaxPage(Math.ceil(response.data.dataCount / productPerPage))

        if (page === 1) {
          setData(response.data.data)
        } else {
          setData(response.data.data)
        }
      }

      const allWarehouse = await axiosInstance.get("/admin/stock/all-warehouse")
      const warehouseId = allWarehouse.data.data.filter((val) => {
        return val.warehouse_name == params.id
      })

      const response = await axiosInstance.get(
        `/admin/stock/all-product/${warehouseId[0].id}`,
        {
          params: {
            _page: page,
            _limit: productPerPage,
            // product_name: currentSearch,
            // CategoryId: filter,
            _sortBy: sortBy,
            _sortDir: sortDir,
          },
        }
      )

      setTotalCount(response.data.dataCount)
      setMaxPage(Math.ceil(response.data.dataCount / productPerPage))

      if (page === 1) {
        setData(response.data.data)
      } else {
        setData(response.data.data)
      }
      // setData(response.data.data.ProductStock)
    } catch (err) {
      console.log(err)
    }
  }

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
    return data.map((val) => {
      return (
        <Tr h="auto" key={val.id} boxShadow="base">
          <Td w="100px">
            <Carousel>
              {val.Product.ProductPictures.map((value) => (
                <Image
                  fit="fill"
                  src={`http://localhost:8000/public/${value.product_picture}`}
                  alt="gambar produk"
                />
              ))}
            </Carousel>
          </Td>
          <Td>{val.Product.product_name || "Tidak ada Data"}</Td>
          <Td>{val.Product.Category.category || "Tidak ada Data"}</Td>
          <Td>{Rupiah(val.Product.price) || "Tidak ada Data"}</Td>
          <Td w="10rem">{val.stock || "Tidak ada Data"}</Td>
          <Td justify="space-between">
            <Tooltip label="Edit Stok" fontSize="md">
              <Button
                alignContent="left"
                colorScheme="messenger"
                _hover={{ bgColor: "telegram", transform: "translateZ(5px)" }}
                onClick={() => handleEdit(val.stock, val.id)}
              >
                <EditIcon />
              </Button>
            </Tooltip>
            <Tooltip label="Hapus Stok" fontSize="md">
              <Button
                _hover={{ bgColor: "telegram", transform: "translateX(5px)" }}
                colorScheme="red"
                onClick={() => btnDelete(val.id)}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </Td>
        </Tr>
      )
    })
  }
  const nextPage = () => {
    setPage(page + 1)
    // setIsLoading(false)
  }

  const previousPage = () => {
    setPage(page - 1)
    // setIsLoading(false)
  }

  useEffect(() => {
    fetchProductWarehouse()
  }, [page, sortBy, sortDir, filter])

  return (
    <>
      <Container bg="#e0e7eb" maxW="vw" p="0">
        <Flex h="100vh" p="0">
          <VStack h="full" w="30%" minW="220px" bg="#008deb">
            {SidebarAdmin()}
          </VStack>

          <VStack h="full" w="full" overflowX="scroll">
            <Text>Product Stock Data : {params.id}</Text>

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
