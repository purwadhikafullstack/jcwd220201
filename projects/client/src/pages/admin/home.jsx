import { Box, Container, Flex, Spacer, Text, VStack } from "@chakra-ui/react"

import SidebarAdmin from "../../components/admin/sidebarAdminDashboard"

const AdminHome = () => {
  return (
    <Container bg="#e0e7eb" maxW="vw" p="0">
      <Flex h="100vh" p="0">
        <VStack h="full" w="30%" minW="220px" bg="#008deb">
          {SidebarAdmin()}
        </VStack>

        <VStack h="full" w="full" overflowX="scroll">
          <Flex h="20%" w="full" justifyContent="flex-end" direction="column">
            <Box padding="4">Admin Dashboard Homepage</Box>
          </Flex>

          <Flex h="80%" w="full" justifyContent="center" direction="column">
            <Spacer />

            <Box border="1px solid">INI NANTI ISI LOGO</Box>
            <Spacer />

            <Box border="1px solid">
              <Text>Hello emailadress</Text>
            </Box>

            <Spacer />
          </Flex>
        </VStack>
      </Flex>
    </Container>
  )
}

export default AdminHome
