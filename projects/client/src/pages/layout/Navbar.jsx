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
import { Link, Outlet } from "react-router-dom"
const Navbar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleToggle = () => (isOpen ? onClose() : onOpen())
  return (
    <>
      <Flex
        {...props}
        align="center"
        justify="space-between"
        wrap="wrap"
        mb="6"
        p="8"
        boxShadow="0px 2px 3px 2px rgba(33, 51, 96, 0.02), 0px 4px 12px 4px rgba(0, 155, 144, 0.08)"
        position="sticky"
        top="0"
        bg="white"
        zIndex="3"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            WIRED!
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
              borderRadius="8px"
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
            <Link to="/login">
              <Button variant="outline" colorScheme="teal" size="md">
                Masuk
              </Button>
            </Link>
            <Button
              variant="solid"
              size="md"
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
