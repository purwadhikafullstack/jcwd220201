import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { MdOutlineMail } from "react-icons/md";

const Verify = ({ props: { email } }) => {
  return (
    <Flex direction="column" align="center" maxW="100%">
      <Text
        p="1rem"
        width="100%"
        color="white"
        backgroundColor="teal"
        fontSize="1.125rem"
        fontWeight="500"
        lineHeight="1.2937rem"
        textAlign="center"
        mb="2rem"
      >
        Verifikasi
      </Text>
      <Box mb="0.9375rem">
        <MdOutlineMail size="2.75rem" color="teal" />
      </Box>
      <Text as="b" fontSize="1rem" color="rgb(49, 53, 59)" mb="0.625rem">
        Cek Email Kamu
      </Text>
      <Text
        width="27.259rem"
        maxW="100%"
        textAlign="center"
        mb="1.5625rem"
        fontSize="0.875rem"
        lineHeight="1.3125rem"
        overflowWrap="break-word"
      >
        Link verifikasi telah dikirim melalui e-mail ke {email}.
      </Text>
      <Text color="rgb(82, 86, 94)" fontSize="0.75rem">
        Tidak menerima kode?{" "}
        <Link color="teal" fontWeight="600">
          Kirim ulang
        </Link>
      </Text>
    </Flex>
  );
};

export default Verify;
