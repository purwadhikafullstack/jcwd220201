import { Box, Button, Container, Flex, HStack, VStack } from "@chakra-ui/react"

import React, { useState } from "react"

import sidebarAdmin from "../../components/admin/sidebarAdminDashboard.jsx"
import CategoryContent from "../../components/admin/categoryContent.jsx"

// =======================================
// =======================================

const ManageProduct = () => {
  // =======================================

  const [activeComponent, setActiveComponent] = useState("")

  // =======================================
  // Conditional Component

  // const component = (activeComponent) => {
  //   switch (activeComponent) {
  //     case "Product Data":
  //       return <>Product Data nanti ini diisi ya</>
  //     case "Product Stock":
  //       return <>Product Stock nanti ini diisi ya</>
  //     case "Product Category":
  //       return <CategoryContent />
  //     default:
  //       return <Box />
  //   }
  // }

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
            <Box padding="4">Manage Product</Box>
          </Flex>

          <HStack h="10%">
            <Button
              _focus={{ bg: "#005e9d" }}
              onClick={() => {
                setActiveComponent("Product Data")
              }}
            >
              Product Data
            </Button>
            <Button
              _focus={{ bg: "#005e9d" }}
              onClick={() => {
                setActiveComponent("Product Stock")
              }}
            >
              Product Stock
            </Button>
            <Button
              _focus={{ bg: "#005e9d" }}
              onClick={() => {
                setActiveComponent("Product Category")
              }}
            >
              Product Category
            </Button>
          </HStack>

          {{
            "Product Data": <Box />,
            "Product Stock": <Box />,
            "Product Category": <CategoryContent />,
          }[activeComponent] || <Box />}
        </VStack>
      </Flex>
    </Container>
  )
}

export default ManageProduct
