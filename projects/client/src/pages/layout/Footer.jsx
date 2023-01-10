import {
  Box,
  chakra,
  Container,
  Link as LinkChakra,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Heading,
  Button,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react"
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa"
import { BiMailSend } from "react-icons/bi"
import { Link as LinkRouterDom } from "react-router-dom"
import Logo from "./Logo"

const Footer = () => {
  return (
    <>
      <Box
        borderStyle="solid"
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
        pos="relative"
      >
        <Container as={Stack} maxW={"6xl"} py={10} left="100%">
          <SimpleGrid
            templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
            spacing={8}
          >
            <Stack spacing={6}>
              <Logo />

              <Text fontSize={"sm"}>
                &copy; {new Date().getFullYear()} PT WIRED! Indonesia. Made With
                💗
              </Text>
              <ButtonGroup variant="ghost">
                <IconButton
                  as="a"
                  href="#https://instagram.com/wiredindonesia"
                  aria-label="Instagram"
                  icon={<FaInstagram fontSize="1.25rem" />}
                />
                <IconButton
                  as="a"
                  href="https://github.com/purwadhikafullstack/jcwd220201"
                  aria-label="GitHub"
                  icon={<FaGithub fontSize="1.25rem" />}
                />
                <IconButton
                  as="a"
                  href="#https://twitter.com/wiredindonesia"
                  aria-label="Twitter"
                  icon={<FaTwitter fontSize="1.25rem" />}
                />
              </ButtonGroup>
            </Stack>
            <Stack align={"flex-start"}>
              <Text fontWeight="500" fontSize="lg" mb="2">
                Wired
              </Text>
              <LinkChakra href={"#"}>Tentang Wired</LinkChakra>
              <LinkChakra href={"#"}>Hubungi Kami</LinkChakra>
              <LinkChakra href={"#"}>Testimoni</LinkChakra>

              <LinkChakra href={"#"}>Harga</LinkChakra>
            </Stack>
            <Stack align={"flex-start"}>
              <Text fontWeight="500" fontSize="lg" mb="2">
                Bantuan
              </Text>
              <LinkChakra href={"#"}>Persyaratan Layanan</LinkChakra>
              <LinkChakra href={"#"}>Privasi</LinkChakra>
              <LinkChakra href={"#"}>Status</LinkChakra>
              <LinkChakra href={"#"}>Legal</LinkChakra>
            </Stack>
            <Stack align={"flex-start"}>
              <Text fontWeight="500" fontSize="lg" mb="2">
                Berlangganan
              </Text>
              <Stack direction={"row"}>
                <Input
                  placeholder={"Email Anda ..."}
                  bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                  border={0}
                  _focus={{
                    bg: "whiteAlpha.300",
                  }}
                />
                <IconButton
                  bg={useColorModeValue("green.400", "green.800")}
                  color={useColorModeValue("white", "gray.800")}
                  _hover={{
                    bg: "green.600",
                  }}
                  aria-label="Subscribe"
                  icon={<BiMailSend />}
                />
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  )
}

export default Footer
