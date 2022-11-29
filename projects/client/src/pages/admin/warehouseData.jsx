import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react"

import React, { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import Select from "react-select"

import { axiosInstance } from "../../api"

import Warehouse from "../../components/admin/warehouse.jsx"
import PageButton from "../../components/admin/pageButton.jsx"

import sidebarAdmin from "../../components/admin/sidebarAdminDashboard.jsx"

// =======================================
// =======================================

const ManageWarehouseData = () => {
  // =======================================

  const [warehousesData, setWarehousesData] = useState([])
  const [provincesData, setProvincesData] = useState([])
  const [selectedProvince, setSelectedProvince] = useState("")
  const [citiesData, setCitiesData] = useState([])
  const [editData, setEditData] = useState(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [totalCount, setTotalCount] = useState(0)

  const {
    isOpen: editModalIsOpen,
    onOpen: editModalOnOpen,
    onClose: editModalOnClose,
  } = useDisclosure()

  const toast = useToast()

  // =======================================
  // Fetch Data from Databases

  // Warehouses Data
  const fetchWarehouseData = async () => {
    try {
      const warehouses = await axiosInstance.get(`/warehouses`, {
        params: {
          _limit: limit,
          _page: page,
          _sortDir: "ASC",
        },
      })
      // console.log(warehouses.data.data)
      // console.log(warehouses.data.dataCount)

      setTotalCount(warehouses.data.dataCount)

      // if (page === 1) {
      setWarehousesData(warehouses.data.data)
      // } else {
      //   setWarehousesData(...warehousesData, warehouses.data.data)
      // }

      editFormik.handleReset()
      createFormik.handleReset()
    } catch (err) {
      console.log(err)
    }
  }

  // Province Data
  const fetchProvinceData = async () => {
    try {
      const provinces = await axiosInstance.get(`/provinces`)
      setProvincesData(provinces.data.data)
      // console.log(provinces.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  // City Data
  const fetchCityData = async () => {
    try {
      const cities = await axiosInstance.get(`/cities`)

      setCitiesData(cities.data.data)
      // console.log(cities.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  // =======================================
  // Dropdown List Options

  // Province Options
  const provinceOptions = provincesData.map((val) => {
    return { value: val.province, label: val.province }
  })

  // City Options
  var cityOptions = citiesData.reduce(function (filtered, val) {
    if (val.province === selectedProvince) {
      var someNewValue = {
        value: `${val.type} ${val.city_name}`,
        label: `${val.type} ${val.city_name}`,
      }
      filtered.push(someNewValue)
    }
    return filtered
  }, [])

  // =======================================
  // Form control

  // Create Warehouse Data Form Control
  const createFormik = useFormik({
    initialValues: {
      warehouse_name: "",
      address: "",
      province: "",
      city: "",
    },
    onSubmit: async (values) => {
      try {
        let { warehouse_name, address, province, city } = values

        let newWarehouse = {
          warehouse_name: warehouse_name,
          address: address,
          province: province,
          city: city,
        }

        await axiosInstance.post(`/warehouses`, newWarehouse)

        fetchWarehouseData()

        toast({
          title: "Warehouse Data Created",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      } catch (err) {
        // console.log(err)
        toast({
          title: "Failed to Delete Warehouse Data",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    },
    validationSchema: Yup.object({
      warehouse_name: Yup.string().required(),
      address: Yup.string().required(),
      province: Yup.string().required(),
      city: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  // Edit Warehouse Data Form Control
  const editFormik = useFormik({
    initialValues: {
      warehouse_name: "",
      address: "",
      province: "",
      city: "",
    },
    onSubmit: async (values) => {
      try {
        let updatedWarehouse = {
          ...values,
        }

        await axiosInstance.patch(`warehouses/${values.id}`, updatedWarehouse)

        editModalOnClose()
        fetchWarehouseData()
        toast({
          title: "Warehouse Data Updated",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      } catch (err) {
        // console.log(err)
        toast({
          title: "Failed to Update Warehouse Data",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    },
    validationSchema: Yup.object({
      warehouse_name: Yup.string().required(),
      address: Yup.string().required(),
      province: Yup.string().required(),
      city: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  // =======================================
  // Handler

  // Handle Create Warehouse Data Form Change
  const handleCreateFormChange = ({ target }) => {
    const { name, value } = target

    createFormik.setFieldValue(name, value)
  }

  // Handle Edit Warehouse Data Form Change
  const handleEditFormChange = ({ target }) => {
    const { name, value } = target

    editFormik.setFieldValue(name, value)
  }

  // Handle Delete Button
  const handleDeleteButton = async (id) => {
    try {
      await axiosInstance.delete(`/warehouses/${id}`)

      fetchWarehouseData()

      toast({
        title: "Warehouse Data Deleted.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } catch (err) {
      // console.log(err)
      toast({
        title: "Failed to Delete Warehouse Data",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  // Handle Edit Button
  const handleEditButton = (val) => {
    editModalOnOpen()
    setEditData(val)
  }

  // =======================================
  // Render Display

  // Render Warehouse Data
  const renderWarehouseData = () => {
    return warehousesData.map((val) => {
      // console.log(val.id)
      return (
        <Warehouse
          key={val.id.toString()}
          id={val.id}
          warehouse_name={val.warehouse_name}
          address={val.address}
          province={val.province}
          city={val.city}
          onDelete={() => {
            handleDeleteButton(val.id)
          }}
          onEdit={() => {
            handleEditButton(val)
          }}
        />
      )
    })
  }

  // Render Page Button
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

  // =======================================
  // All Use Effect

  useEffect(() => {
    fetchProvinceData()
    fetchCityData()
  }, [])

  useEffect(() => {
    fetchWarehouseData()
  }, [page])

  // =======================================
  // Display

  return (
    <Container bg="#e0e7eb" maxW="vw" p="0">
      <Flex h="100vh" p="0">
        <VStack h="full" w="30%" minW="220px" bg="#008deb">
          {sidebarAdmin()}
        </VStack>

        <VStack h="full" w="full" overflowX="scroll">
          <Flex h="20%" w="full" justifyContent="flex-end" direction="column">
            <Box padding="4">Manage Warehouse Data</Box>
          </Flex>

          <Flex h="80%" w="full" direction="column">
            <Flex w="full" justifyContent="center">
              <form onSubmit={createFormik.handleSubmit}>
                <HStack mt="3" wrap="wrap" justifyContent="center">
                  <FormControl
                    maxW="24%"
                    isInvalid={createFormik.errors.warehouse_name}
                  >
                    <FormLabel>Warehouse Name</FormLabel>
                    <Input
                      borderColor="black"
                      value={createFormik.values.warehouse_name}
                      name="warehouse_name"
                      onChange={handleCreateFormChange}
                    />
                  </FormControl>

                  <FormControl
                    maxW="24%"
                    isInvalid={createFormik.errors.address}
                  >
                    <FormLabel>Address</FormLabel>
                    <Input
                      borderColor="black"
                      value={createFormik.values.address}
                      name="address"
                      onChange={handleCreateFormChange}
                    />
                  </FormControl>

                  <FormControl
                    maxW="24%"
                    isInvalid={createFormik.errors.province}
                  >
                    <FormLabel>Province</FormLabel>

                    <Select
                      id="province"
                      value={{ label: createFormik.values.province }}
                      isSearchable="true"
                      options={provinceOptions}
                      onChange={(e) => {
                        createFormik.setFieldValue("province", e.value)
                        setSelectedProvince(e.value)
                        createFormik.setFieldValue("city", "")
                      }}
                    />
                  </FormControl>

                  <FormControl maxW="24%" isInvalid={createFormik.errors.city}>
                    <FormLabel>City</FormLabel>

                    <Select
                      id="city"
                      value={{ label: createFormik.values.city }}
                      isSearchable="true"
                      options={cityOptions}
                      onChange={(e) => {
                        createFormik.setFieldValue("city", e.value)
                      }}
                    />
                  </FormControl>

                  <Box w="full" h="1%"></Box>

                  <Button
                    disabled={createFormik.isSubmitting ? true : false}
                    maxW="20%"
                    type="submit"
                    colorScheme="teal"
                  >
                    Add Warehouse
                  </Button>
                </HStack>
              </form>
            </Flex>

            <Box w="full" h="2.5%"></Box>

            <TableContainer maxW="970px" overflowY="scroll">
              <Table variant="unstyled">
                <Thead>
                  <Tr>
                    <Th>Warehouse Name</Th>
                    <Th>Address</Th>
                    <Th>City</Th>
                    <Th>Province</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>{renderWarehouseData()}</Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <HStack
            w="full"
            alignSelf="flex-end"
            // pr="18px"
            justifyContent="center"
          >
            {renderPageButton()}
            <Box>
              Page {page}/{Math.ceil(totalCount / limit)}
            </Box>
          </HStack>
          <Box h="4%" w="full"></Box>
        </VStack>
      </Flex>

      <Modal isOpen={editModalIsOpen} onClose={editModalOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit Warehouse Data {editData?.id ? editData.id : ""}
          </ModalHeader>
          <ModalCloseButton />

          <form onSubmit={editFormik.handleSubmit}>
            <ModalBody>
              <FormControl
                maxW="100%"
                isInvalid={editFormik.errors.warehouse_name}
              >
                <FormLabel>Warehouse Name</FormLabel>
                <Input
                  borderColor="black"
                  placeholder={
                    editData?.warehouse_name
                      ? editData.warehouse_name
                      : "Warehouse Name"
                  }
                  value={editFormik.values.warehouse_name}
                  name="warehouse_name"
                  onChange={handleEditFormChange}
                />
              </FormControl>

              <FormControl maxW="100%" isInvalid={editFormik.errors.address}>
                <FormLabel>Address</FormLabel>
                <Input
                  borderColor="black"
                  placeholder={editData?.address ? editData.address : "Address"}
                  value={editFormik.values.address}
                  name="address"
                  onChange={handleEditFormChange}
                />
              </FormControl>

              <FormControl maxW="100%" isInvalid={editFormik.errors.province}>
                <FormLabel>Province</FormLabel>

                <Select
                  id="province"
                  placeholder={
                    editData?.province ? editData.province : provinceOptions[0]
                  }
                  value={{ label: editFormik.values.province }}
                  isSearchable="true"
                  options={provinceOptions}
                  onChange={(e) => {
                    editFormik.setFieldValue("province", e.value)
                    setSelectedProvince(e.value)
                    editFormik.setFieldValue("city", "")
                  }}
                />
              </FormControl>

              <FormControl maxW="100%" isInvalid={editFormik.errors.city}>
                <FormLabel>City</FormLabel>

                <Select
                  id="city"
                  placeholder={
                    editData?.city ? editData.city : provinceOptions[0]
                  }
                  value={{ label: editFormik.values.city }}
                  isSearchable="true"
                  options={cityOptions}
                  onChange={(e) => {
                    editFormik.setFieldValue("city", e.value)
                  }}
                />
              </FormControl>

              <Box w="full" h="1%"></Box>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={editModalOnClose}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    editFormik.setFieldValue("id", editData.id)
                  }}
                  disabled={editFormik.isSubmitting ? true : false}
                  type="submit"
                  colorScheme="teal"
                >
                  Confirm
                </Button>
              </ModalFooter>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default ManageWarehouseData
