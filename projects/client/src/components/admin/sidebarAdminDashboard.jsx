import {
  Box,
  ButtonGroup,
  Spacer,
  Button,
  Stack,
  Heading,
  Divider,
  Flex,
  Avatar,
  Text,
  HStack,
} from "@chakra-ui/react"
import { useNavigate, NavLink, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/features/authSlice"

const SidebarAdmin = () => {
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const btnLogout = () => {
    localStorage.removeItem("auth_token")
    dispatch(logout())
    navigate("/")
  }
  return (
    <>
      <Heading textAlign="center" as="h1" size="lg" letterSpacing={"tighter"}>
        WIRED!
        <br />
        Admin Dashboard
      </Heading>
      <Divider border="1px solid" />
      <Heading size="md">
        {authSelector.RoleId === 1 ? "Admin" : "Warehouse Admin"}
      </Heading>
      <Flex>
        <Avatar
          size="lg"
          name={authSelector.profile_picture}
          src={authSelector.profile_picture}
        />
        <Text borderRight="2px solid" my="auto" p="8px">
          {authSelector.name}
        </Text>
        <Button
          my="4"
          p="8px"
          fontWeight="semibold"
          color="black"
          variant="link"
        >
          <Link to="/profile">Edit Profile</Link>
        </Button>
      </Flex>
      <Flex></Flex>
      <Spacer />
      <Stack color="white" w="full" direction="column">
        <ButtonGroup flexDirection="column" spacing="0" variant="unstyled">
          <NavLink
            to="/admin/dashboard"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#005e9d" : "#008deb",
            })}
          >
            <Button
              whiteSpace="initial"
              w="100%"
              pl="10%"
              textAlign="left"
              borderRadius="0px"
              _hover={{ bg: "#005e9d" }}
            >
              Dashboard
            </Button>
          </NavLink>

          <NavLink
            to="/admin/user"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#005e9d" : "#008deb",
            })}
          >
            <Button
              whiteSpace="initial"
              w="100%"
              pl="10%"
              textAlign="left"
              borderRadius="0px"
              _hover={{ bg: "#005e9d" }}
            >
              Manage User Data
            </Button>
          </NavLink>
          <NavLink
            to="/admin/warehouseData"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#005e9d" : "#008deb",
            })}
          >
            <Button
              whiteSpace="initial"
              w="100%"
              pl="10%"
              textAlign="left"
              borderRadius="0px"
              _hover={{ bg: "#005e9d" }}
            >
              Manage Warehouse Data
            </Button>
          </NavLink>
          <NavLink
            to="/admin/product"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#005e9d" : "#008deb",
            })}
          >
            <Button
              whiteSpace="initial"
              w="100%"
              pl="10%"
              textAlign="left"
              borderRadius="0px"
              _hover={{ bg: "#005e9d" }}
            >
              Manage Product
            </Button>
          </NavLink>
          {/* Product Stock */}
          {/* Role Admin */}
          {authSelector.RoleId === 1 ? (
            <NavLink
              to="/admin/update-stock"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#005e9d" : "#008deb",
              })}
            >
              <Button
                whiteSpace="initial"
                w="100%"
                pl="10%"
                textAlign="left"
                borderRadius="0px"
                _hover={{ bg: "#005e9d" }}
              >
                Manage Product Stock
              </Button>
            </NavLink>
          ) : null}
          {/* Role Warehouse Admin */}
          {authSelector.RoleId === 2 ? (
            <NavLink
              to="/admin/update-stock"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#005e9d" : "#008deb",
              })}
            >
              <Button
                whiteSpace="initial"
                w="100%"
                pl="10%"
                textAlign="left"
                borderRadius="0px"
                _hover={{ bg: "#005e9d" }}
              >
                Update Stock
              </Button>
            </NavLink>
          ) : null}
          {/* ====================================================================== */}
          <NavLink
            to="/order/all-order"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#005e9d" : "#008deb",
            })}
          >
            <Button
              whiteSpace="initial"
              w="100%"
              pl="10%"
              textAlign="left"
              borderRadius="0px"
              _hover={{ bg: "#005e9d" }}
            >
              Manage User Order
            </Button>
          </NavLink>
          <NavLink
            // to="/admin/warehouseData" ISI INI YA TEMAN2
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#005e9d" : "#008deb",
            })}
          >
            <Button
              whiteSpace="initial"
              w="100%"
              pl="10%"
              textAlign="left"
              borderRadius="0px"
              _hover={{ bg: "#005e9d" }}
            >
              Manage Stock Mutation
            </Button>
          </NavLink>
        </ButtonGroup>
        <ButtonGroup flexDirection="column" spacing="0" variant="unstyled">
          <NavLink
            // to="/admin/warehouseData" ISI INI YA TEMAN2
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#005e9d" : "#008deb",
            })}
          >
            <Button
              whiteSpace="initial"
              w="100%"
              pl="10%"
              textAlign="left"
              borderRadius="0px"
              _hover={{ bg: "#005e9d" }}
            >
              Sales Report
            </Button>
          </NavLink>{" "}
          <NavLink
            // to="/admin/warehouseData" ISI INI YA TEMAN2
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#005e9d" : "#008deb",
            })}
          >
            <Button
              whiteSpace="initial"
              w="100%"
              pl="10%"
              textAlign="left"
              borderRadius="0px"
              _hover={{ bg: "#005e9d" }}
            >
              Product Stock History
            </Button>
          </NavLink>
        </ButtonGroup>
      </Stack>

      <Spacer />

      <Box color="white" w="50%">
        <Button
          w="100%"
          variant="outlined"
          borderRadius="0px"
          border="1px solid"
          _hover={{ bg: "#005e9d" }}
          onClick={btnLogout}
        >
          LOGOUT
        </Button>
      </Box>
      <Box h="4%" w="full"></Box>
    </>
  )
}

export default SidebarAdmin
