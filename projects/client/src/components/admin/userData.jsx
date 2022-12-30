import {
  Box,
  Container,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { axiosInstance } from "../../api"

import PageButton from "../../components/admin/pageButton.jsx"

const UserData = () => {
  // State etc
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const toast = useToast()

  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [totalCount, setTotalCount] = useState(0)

  // Fetch User Data
  const fetchUserData = async () => {
    try {
      const respons = await axiosInstance.get(`/admin-user/user`, {
        params: {
          _limit: limit,
          _page: page,
          _sortDir: "DESC",
        },
      })

      setTotalCount(respons.data.dataCount)
      setUsers(respons.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  // Role blocking
  if (authSelector.RoleId !== 1) {
    navigate("/admin/dashboard")
    toast({
      title: "Admin Unauthorized",
    })
  }

  const getUser = async () => {
    try {
      const resp = await axiosInstance.get(`/auth`)

      setUserId(resp.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  // Render Stuff
  // Render User
  const renderUser = () => {
    return users.map((val) => {
      return (
        <Tr key={val.id}>
          <Td textAlign="center" border="1px solid black">
            {val.name}
          </Td>
          <Td textAlign="center" border="1px solid black">
            {val.email}
          </Td>
          <Td textAlign="center" border="1px solid black">
            {val.phone}
          </Td>
          <Td textAlign="center" border="1px solid black">
            {val.gender}
          </Td>
          <Td textAlign="center" border="1px solid black">
            {val.date_of_birth}
          </Td>
        </Tr>
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

  // Use Effect
  useEffect(() => {
    fetchUserData()
    getUser()
  }, [page])

  // Render Stuff
  return (
    <>
      <Flex h="100%" w="full" direction="column">
        <Container maxW="container.sm" py="8" pb="5" px="1">
          <TableContainer border={"1px solid black"} mt={8} overflowY="unset">
            <Table responsive="md" variant="simple">
              <Thead position={"sticky"} top={-1} backgroundColor={"#718096"}>
                <Tr border={"1px solid black"} maxW="50px">
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  >
                    Name
                  </Th>
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  >
                    Email
                  </Th>
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  >
                    Phone
                  </Th>
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  >
                    Gender
                  </Th>
                  <Th
                    border={"1px solid black"}
                    textAlign={"center"}
                    color="black"
                    w="100px"
                  >
                    Date of Birth
                  </Th>
                </Tr>
              </Thead>
              <Tbody maxWidth="max-content"> {renderUser()}</Tbody>
            </Table>
          </TableContainer>
        </Container>

        <HStack w="full" alignSelf="flex-end" justifyContent="center">
          {renderPageButton()}
          <Box>
            Page {page}/{Math.ceil(totalCount / limit)}
          </Box>
        </HStack>
        <Box h="4%" w="full"></Box>
      </Flex>
    </>
  )
}

export default UserData
