import {
  Box,
  Button,
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
} from "@chakra-ui/react"

import React, { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

import { axiosInstance } from "../../api"

import Category from "../../components/admin/category.jsx"
import PageButton from "../../components/admin/pageButton.jsx"

// =======================================
// =======================================

const CategoryContent = () => {
  // =======================================

  const [categoriesData, setCategoriesData] = useState([])
  const [editData, setEditData] = useState(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [totalCount, setTotalCount] = useState(0)

  const {
    isOpen: editModalIsOpen,
    onOpen: editModalOnOpen,
    onClose: editModalOnClose,
  } = useDisclosure()

  const toast = useToast()

  // =======================================
  // Fetch Data from Databases

  // Categories Data
  const fetchCategoryData = async () => {
    try {
      const categories = await axiosInstance.get(`/categories`, {
        params: {
          _limit: limit,
          _page: page,
          _sortDir: "ASC",
        },
      })
      // console.log(categories.data.data)
      // console.log(categories.data.dataCount)

      setTotalCount(categories.data.dataCount)

      setCategoriesData(categories.data.data)

      editFormik.handleReset()
      createFormik.handleReset()
    } catch (err) {
      console.log(err)
    }
  }

  // =======================================
  // Form control

  // Create Category Form Control
  const createFormik = useFormik({
    initialValues: {
      category: "",
    },
    onSubmit: async (values) => {
      try {
        let { category } = values

        let newCategory = {
          category: category,
        }

        await axiosInstance.post(`/categories`, newCategory)

        fetchCategoryData()

        toast({
          title: "Category Created",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      } catch (err) {
        // console.log(err)
        toast({
          title: "Failed to Create Category",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    },
    validationSchema: Yup.object({
      category: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  // Edit Category Form Control
  const editFormik = useFormik({
    initialValues: {
      category: "",
    },
    onSubmit: async (values) => {
      try {
        let updatedCategory = {
          ...values,
        }

        await axiosInstance.patch(`categories/${values.id}`, updatedCategory)

        editModalOnClose()
        fetchCategoryData()
        toast({
          title: "Category Updated",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      } catch (err) {
        // console.log(err)
        toast({
          title: "Failed to Update Category",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    },
    validationSchema: Yup.object({
      category: Yup.string().required(),
    }),
    validateOnChange: false,
  })

  // =======================================
  // Handler

  // Handle Create Category Form Change
  const handleCreateFormChange = ({ target }) => {
    const { name, value } = target

    createFormik.setFieldValue(name, value)
  }

  // Handle Edit Category Form Change
  const handleEditFormChange = ({ target }) => {
    const { name, value } = target

    editFormik.setFieldValue(name, value)
  }

  // Handle Delete Button
  const handleDeleteButton = async (id) => {
    try {
      await axiosInstance.delete(`/categories/${id}`)

      fetchCategoryData()

      toast({
        title: "Category Deleted.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } catch (err) {
      // console.log(err)
      toast({
        title: "Failed to Delete Category",
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

  // Render Categories
  const renderCategoryData = () => {
    return categoriesData.map((val, index) => {
      // console.log(val.id)
      return (
        <Category
          key={val.id.toString()}
          id={val.id}
          idx={index}
          category={val.category}
          page={page}
          limit={limit}
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
    fetchCategoryData()
  }, [page])

  // =======================================
  // Display

  return (
    <>
      <Flex h="70%" w="full" direction="column">
        <Flex w="full" justifyContent="center">
          <form onSubmit={createFormik.handleSubmit}>
            <HStack mt="3" wrap="wrap" justifyContent="center">
              <FormControl maxW="100%" isInvalid={createFormik.errors.category}>
                <FormLabel>Category Name</FormLabel>
                <Input
                  borderColor="black"
                  value={createFormik.values.category}
                  name="category"
                  onChange={handleCreateFormChange}
                />
              </FormControl>

              <Box w="full" h="20%"></Box>

              <Button
                disabled={createFormik.isSubmitting ? true : false}
                maxW="100%"
                type="submit"
                colorScheme="teal"
              >
                Add Category
              </Button>
            </HStack>
          </form>
        </Flex>

        <Box w="full" h="2.5%"></Box>

        <TableContainer maxW="970px" overflowY="scroll">
          <Table variant="unstyled">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Category Name</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>{renderCategoryData()}</Tbody>
          </Table>
        </TableContainer>

        <Spacer />

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
      </Flex>

      <Modal isOpen={editModalIsOpen} onClose={editModalOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit Category {editData?.id ? editData.id : ""}
          </ModalHeader>
          <ModalCloseButton />

          <form onSubmit={editFormik.handleSubmit}>
            <ModalBody>
              <FormControl maxW="100%" isInvalid={editFormik.errors.category}>
                <FormLabel>Category</FormLabel>
                <Input
                  borderColor="black"
                  placeholder={
                    editData?.category ? editData.category : "Category"
                  }
                  value={editFormik.values.category}
                  name="category"
                  onChange={handleEditFormChange}
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
    </>
  )
}

export default CategoryContent
