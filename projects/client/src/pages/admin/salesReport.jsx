import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { axiosInstance } from "../../api"
import PageButton from "../../components/admin/pageButton"
import SidebarAdmin from "../../components/admin/sidebarAdminDashboard"
import { Rupiah } from "../../lib/currency/Rupiah"
import Select from "react-select"
import { useFormik } from "formik"

const SalesReport = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("")
  const [sortDir, setSortDir] = useState("DESC")
  const [filter, setFilter] = useState("")
  const [filterMonth, setFilterMonth] = useState("")
  const [filterWare, setFilterWare] = useState("")
  const [currentSearch, setCurrentSearch] = useState("")
  const [nameSearch, setNameSearch] = useState("")
  const [warehouse, setWarehouse] = useState([])
  const [categories, setCategories] = useState([])
  const [sales, setSales] = useState([])

  const authSelector = useSelector((state) => state.auth)

  const fetchReport = async () => {
    try {
      let response
      if (authSelector.RoleId === 1) {
        response = await axiosInstance.get(`/sales/report`, {
          params: {
            _page: page,
            _limit: limit,
            _sortBy: sortBy,
            _sortDir: sortDir,
            category: filter,
            payment_date: filterMonth,
            product_name: nameSearch,
            WarehouseId: filterWare,
          },
        })
      } else {
        response = await axiosInstance.get(`/sales/report`, {
          params: {
            _page: page,
            _limit: limit,
            _sortBy: sortBy,
            _sortDir: sortDir,
            category: filter,
            payment_date: filterMonth,
            product_name: nameSearch,
            WarehouseId: authSelector.WarehouseId,
          },
        })
        setFilterWare(authSelector.WarehouseId)
      }

      setTotalCount(response.data.dataCount)
      setSales(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fethWarehouse = async () => {
    try {
      const response = await axiosInstance.get(`/warehouses`)

      setWarehouse(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getCategory = async () => {
    try {
      const response = await axiosInstance.get(`/categories`)

      setCategories(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const filterWarehouseBtn = (event) => {
    const value = event.value

    setFilterWare(value)
    fetchReport()
  }

  const filterCategoryBtn = (event) => {
    const value = event.value

    setFilter(value)
    fetchReport()
  }

  const filterMonthBtn = (event) => {
    const value = event.value
    setFilterMonth(value)
  }

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setNameSearch(nameSearch)
    }
  }

  const formikSearch = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setNameSearch(search)
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

  useEffect(() => {
    fetchReport()
  }, [filterMonth, filterWare, filter, page, sortBy, nameSearch])

  useEffect(() => {
    fethWarehouse()
    getCategory()
  }, [])

  const warehouseOption = warehouse.map((val) => {
    return { value: val.id, label: val.warehouse_name }
  })

  const catOption = categories.map((val) => {
    return { value: val.category, label: val.category }
  })

  const monthsOption = [
    { label: "Januari", value: "1" },
    { label: "Februari", value: "2" },
    { label: "Maret", value: "3" },
    { label: "April", value: "4" },
    { label: "Mei", value: "5" },
    { label: "Juni", value: "6" },
    { label: "Juli", value: "7" },
    { label: "Augustus", value: "8" },
    { label: "September", value: "9" },
    { label: "Oktober", value: "10" },
    { label: "November", value: "11" },
    { label: "Desember", value: "12" },
  ]

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
                <Text fontSize="40px"> Sales Report</Text>
              </Box>
            </Flex>

            <Flex h="80%" w="full" direction="column">
              <Flex>
                <Box mt="3vh">
                  <Grid
                    p="5px"
                    gap="4"
                    w="full"
                    ml="12"
                    gridTemplateColumns="repeat(5,1fr)"
                  >
                    {/* Month */}
                    <GridItem
                      w="full"
                      justifySelf="center"
                      border="1px solid #dfe1e3"
                      borderRadius="8px"
                    >
                      <Select
                        onChange={filterMonthBtn}
                        options={monthsOption}
                        fontSize={"15px"}
                        bgColor="white"
                        placeholder="Filter By Month"
                      ></Select>
                    </GridItem>

                    {/* Category */}
                    <GridItem
                      w="full"
                      justifySelf="center"
                      border="1px solid #dfe1e3"
                      borderRadius="8px"
                    >
                      <Select
                        onChange={filterCategoryBtn}
                        options={catOption}
                        fontSize={"15px"}
                        bgColor="white"
                        placeholder="Filter By Category"
                      ></Select>
                    </GridItem>

                    {/* Warehouse */}
                    <GridItem
                      w="full"
                      justifySelf="center"
                      border="1px solid #dfe1e3"
                      borderRadius="8px"
                    >
                      <Select
                        onChange={filterWarehouseBtn}
                        fontSize={"15px"}
                        bgColor="white"
                        placeholder="Filter By Warehouse"
                        options={warehouseOption}
                      ></Select>
                    </GridItem>

                    {/* Search */}
                    <form onSubmit={formikSearch.handleSubmit}>
                      <GridItem
                        w="full"
                        justifySelf="center"
                        border="1px solid #dfe1e3"
                        borderRadius="8px"
                      >
                        <InputGroup>
                          <Input
                            type={"text"}
                            placeholder="Search By Name"
                            name="search"
                            bgColor={"white"}
                            h="4.1vh"
                            onChange={searchHandler}
                            borderRightRadius="0"
                            value={formikSearch.values.search}
                            // onChange={searchBtnHandler}
                            onKeyDown={handleKeyEnter}
                            // value={nameSearch}
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
                      </GridItem>
                    </form>

                    {/* Reset */}
                    <Box ml="20%">
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
                  </Grid>
                </Box>
              </Flex>

              <Container maxW="container.xl">
                <TableContainer
                  border={"1px solid black"}
                  mt={8}
                  overflowY="unset"
                >
                  <Table variant="striped" colorScheme="blue">
                    <Thead position={"sticky"} top={-1}>
                      <Tr border={"1px solid black"} maxW="50px">
                        <Th
                          w="100px"
                          border={"1px solid black"}
                          textAlign={"center"}
                        >
                          <Text fontSize="12px">Warehouse name</Text>
                        </Th>

                        <Th
                          w="100px"
                          border={"1px solid black"}
                          textAlign={"center"}
                        >
                          <Text fontSize="12px">Category</Text>
                        </Th>
                        <Th
                          w="100px"
                          border={"1px solid black"}
                          textAlign={"center"}
                        >
                          <Text fontSize="12px">product_name</Text>
                        </Th>
                        <Th
                          w="100px"
                          border={"1px solid black"}
                          textAlign={"center"}
                        >
                          <Text fontSize="12px">Total price</Text>
                        </Th>
                        <Th
                          w="100px"
                          border={"1px solid black"}
                          textAlign={"center"}
                        >
                          <Text fontSize="12px">nama user</Text>
                        </Th>

                        <Th
                          w="100px"
                          border={"1px solid black"}
                          textAlign={"center"}
                        >
                          <Text fontSize="12px">Payment_Date</Text>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody bgColor="white">
                      {sales?.map((val) => (
                        <Tr key={val.id}>
                          <Td textAlign={"center"}>{val.warehouse_name}</Td>
                          <Td textAlign={"center"}>{val.category}</Td>
                          <Td textAlign={"center"}>{val.product_name}</Td>
                          <Td textAlign={"center"}>
                            {Rupiah(val.total_price)}
                          </Td>
                          <Td textAlign={"center"}>{val.name}</Td>
                          <Td textAlign={"center"}>{val.payment_date}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Container>

              {!sales.length ? (
                <Alert
                  status="error"
                  variant="subtle"
                  flexDir="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  alignSelf="center"
                  h="200px"
                  mt="2"
                  w="84%"
                >
                  <AlertIcon boxSize="20px" mr="0" />
                  <AlertTitle>Oops, produk tidak ditemukan !</AlertTitle>
                  <AlertDescription>Coba kata kunci lain</AlertDescription>
                </Alert>
              ) : null}

              <HStack
                mt="2"
                w="full"
                alignSelf="flex-end"
                justifyContent="center"
              >
                {renderPageButton()}
                <Box>
                  Page {page}/{Math.ceil(totalCount / limit)}
                </Box>
              </HStack>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </>
  )
}

export default SalesReport
