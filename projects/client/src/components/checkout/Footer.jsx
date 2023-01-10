import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      borderTop="1px solid rgb(243, 244, 245)"
      height="6.375rem"
      justifyContent="center"
      alignItems="center"
      maxHeight="6.375rem"
      mt="2.875rem"
      py="1.875rem"
    >
      <Text
        color="rgba(49, 53, 59, 0.68)"
        fontSize={["0.523rem", "0.653rem", "0.812rem", "0.812rem"]}
        fontWeight="700"
        lineHeight="1.125rem"
      >
        &copy; 2009 - 2023, PT Wired.
      </Text>
    </Flex>
  );
};

export default Footer;
