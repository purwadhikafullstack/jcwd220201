import { Box, ButtonGroup, Spacer, Button, Stack } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"

const sidebarAdmin = () => {
  return (
    <>
      <Box border="1px" w="60%" h="100px" mt="10" mb="10">
        Logo
      </Box>

      <Stack color="white" w="full" direction="column">
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
              Manage Product
            </Button>{" "}
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
              Manage Orders
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
        >
          Logout
        </Button>
      </Box>
      <Box h="4%" w="full"></Box>
    </>
  )
}

export default sidebarAdmin
