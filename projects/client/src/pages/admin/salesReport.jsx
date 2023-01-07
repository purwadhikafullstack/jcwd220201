import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Select,
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
import { axiosInstance } from "../../api"
import SidebarAdmin from "../../components/admin/sidebarAdminDashboard"
import Warehouse from "../../components/admin/warehouse"

const SalesReport = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("product_name")
  const [filter, setFilter] = useState("All")
  const [filterMonth, setFilterMonth] = useState("")
  const [filterWare, setFilterWare] = useState("")
  const [currentSearch, setCurrentSearch] = useState("")
  const [nameSearch, setNameSearch] = useState("")
  const [catSearch, setCatSearch] = useState("")
  const [warehouse, setWarehouse] = useState([])
  const [categories, setCategories] = useState([])
  const [sales, setSales] = useState([])

  const fetchReport = async () => {
    try {
      const response = await axiosInstance.get(`/sales/report`, {
        params: {
          _page: page,
          _limit: limit,
          _sortBy: sortBy,
          CategoryId: filter,
          payment_date: filterMonth,
          product_name: nameSearch,
          category: catSearch,
        },
      })

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

  const filterWarehouseBtn = ({ target }) => {
    const { value } = target
    setFilterWare(value)
  }

  const filterCategoryBtn = ({ target }) => {
    const { value } = target
    setFilter(value)
  }

  const filterMonthBtn = ({ target }) => {
    const { value } = target
    setFilterMonth(value)
  }

  const searchBtnHandler = (e) => {
    setNameSearch(e.target.value)
  }

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      setNameSearch(nameSearch)
    }
  }

  const sortHandler = ({ target }) => {
    const { value } = target
    setSortBy(value)
  }

  //   console.log(
  //     "sal",
  //     sales.map((val) => val.category)
  //   )

  // return renderSales = () => {
  //   return sales.map((val) => {
  //       return (
  //         <Tr>
  //             <Td>

  //             </Td>
  //         </Tr>

  //       )
  //   })
  // }

  useEffect(() => {
    fetchReport()
    fethWarehouse()
    getCategory()
  }, [filterMonth, filterWare, filter, page, sortBy, nameSearch, catSearch])

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
                Sales Report
              </Box>
            </Flex>
            <Flex>
              <Box mt="3vh">
                <Grid
                  p="5px"
                  gap="5"
                  w="full"
                  gridTemplateColumns="repeat(5,1fr)"
                >
                  {/* Sort */}
                  <GridItem
                    w="full"
                    justifySelf="center"
                    border="1px solid #dfe1e3"
                    borderRadius="8px"
                    onChange={sortHandler}
                  >
                    <Select>
                      <option value="">sort</option>
                      <option value={"ASC"}>Ascending</option>
                      <option value={"DESC"}>Descending</option>
                    </Select>
                  </GridItem>

                  {/* Month */}
                  <GridItem
                    w="full"
                    justifySelf="center"
                    border="1px solid #dfe1e3"
                    borderRadius="8px"
                    onChange={filterMonthBtn}
                  >
                    <Select>
                      <option value="">---By Month---</option>
                      <option value={1}>January</option>
                      <option value={2}>February</option>
                      <option value={3}>March</option>
                      <option value={4}>April</option>
                      <option value={5}>May</option>
                      <option value={6}>June</option>
                      <option value={7}>July</option>
                      <option value={8}>August</option>
                      <option value={9}>September</option>
                      <option value={10}>October</option>
                      <option value={11}>November</option>
                      <option value={12}>December</option>
                    </Select>
                  </GridItem>

                  {/* Category */}
                  <GridItem
                    w="full"
                    justifySelf="center"
                    border="1px solid #dfe1e3"
                    borderRadius="8px"
                    onChange={filterCategoryBtn}
                  >
                    <Select>
                      <option value="">Select Category</option>
                      {categories.map((val) => (
                        <option value={val.id}>{val.category}</option>
                      ))}
                    </Select>
                  </GridItem>

                  {/* Warehouse */}
                  <GridItem
                    w="full"
                    justifySelf="center"
                    onChange={filterWarehouseBtn}
                    border="1px solid #dfe1e3"
                    borderRadius="8px"
                  ></GridItem>

                  <Select>
                    <option value=""> Select By Warehouse</option>
                    {sales.WarehouseId ===
                    sales.map((val) => val.WarehouseId)[0]
                      ? sales.map((val) => (
                          <option value={val.WarehouseId}>
                            {val.warehouse_name}
                          </option>
                        ))[0]
                      : Warehouse.map((val) => (
                          <option value={val.id}>{val.warehouse_name}</option>
                        ))}
                  </Select>

                  {/* Search */}
                  <GridItem
                    w="full"
                    justifySelf="center"
                    border="1px solid #dfe1e3"
                    borderRadius="8px"
                  >
                    <InputGroup>
                      <Input
                        onChange={searchBtnHandler}
                        onKeyDown={handleKeyEnter}
                        value={nameSearch}
                      />
                    </InputGroup>
                  </GridItem>
                </Grid>
              </Box>

              <TableContainer
                border="1px solid #dfe1e3"
                mt="3vh"
                borderRadius="8px"
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th w="100px">
                        <Text fontSize="10px">Payment_Date</Text>
                      </Th>
                      <Th w="100px">
                        <Text fontSize="10px">ProductId</Text>
                      </Th>
                      <Th w="100px">
                        <Text fontSize="10px">CategoryId</Text>
                      </Th>
                      <Th w="200px">
                        <Text fontSize="10px">product_name</Text>
                      </Th>

                      <Th w="100px">
                        <Text fontSize="10px">price</Text>
                      </Th>
                      <Th w="100px">
                        <Text fontSize="10px">quantity</Text>
                      </Th>
                      <Th w="100px">
                        <Text fontSize="10px">Total</Text>
                      </Th>
                      <Th w="100px">
                        <Text fontSize="10px">Warehouse</Text>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {sales.map((val) => (
                      <Tr>
                        <Td>
                          {/* RAW QUERY */}
                          <Text>
                            {val.payment_date.split("T")[0]} /{" "}
                            {val.payment_date.split("T")[1].split(".000Z")}
                          </Text>
                        </Td>
                        <Td>
                          <Text>{val.productId}</Text>
                        </Td>
                        <Td>
                          <Text>{val.category}</Text>
                        </Td>
                        <Td maxW="200px">
                          <Text overflow="hidden" textOverflow="ellipsis">
                            {val.product_name}
                          </Text>
                        </Td>

                        <Td>
                          <Text>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(val.price)}
                          </Text>
                        </Td>
                        <Td>
                          <Text>{val.quantity}</Text>
                        </Td>

                        <Td>
                          <Text>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(val.total)}
                          </Text>
                        </Td>
                        <Td>
                          <Text>{val.warehouse_name}</Text>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </>
  )
}

export default SalesReport
