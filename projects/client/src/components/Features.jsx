import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react"
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc"

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  )
}

const Features = () => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title="CS Support"
          text="Jika anda mempunyai keluhan terkait produk yang ingin disampaikan, Customer Service kami siap menyambut anda dengan sepenuh hati ."
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title="Pembayaran Bank"
          text="Saat ini kami hanya menyediakan pembayaran melalui Transfer Bank, sertakan Bukti Pembayaran anda lalu akan kami proses secepat kilat ."
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title="Pilih Kurir"
          text="Pilih Kurir yang anda inginkan, kami menyediakan beberapa pilihan kurir terbaik untuk anda ."
        />
      </SimpleGrid>
    </Box>
  )
}

export default Features
