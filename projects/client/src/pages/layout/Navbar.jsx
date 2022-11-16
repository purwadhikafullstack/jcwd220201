import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  Flex,
  useDisclosure,
  Input,
  ButtonGroup,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Outlet } from "react-router-dom"
const Navbar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleToggle = () => (isOpen ? onClose() : onOpen())
  return (
    <>
      <Flex
        px="1"
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        mb="6"
        p="6"
        {...props}
        boxShadow="md"
        position="sticky"
        top="0"
        bg="white"
        zIndex="2"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            Warehouse Co.
          </Heading>
        </Flex>

        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <HamburgerIcon />
        </Box>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          alignContent="center"
          alignSelf="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
          mr={{ base: 10, md: 100 }}
        >
          <InputGroup>
            <Input
              size="md"
              rounded="lg"
              placeholder="Cari Handhpone,Laptop,SmartTV, dan Alat Rumah Tangga"
            />
            <InputRightElement children={<SearchIcon />} />
          </InputGroup>
        </Stack>

        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <ButtonGroup gap="2">
            <Button variant="outline" colorScheme="teal">
              Masuk
            </Button>
            <Button
              variant="solid"
              color="white"
              _hover={{ bg: "teal.300" }}
              bg="teal.400"
            >
              Daftar
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
      <Outlet />
    </>
  )
}

export default Navbar
