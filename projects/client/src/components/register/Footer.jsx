import { Text, useMediaQuery } from "@chakra-ui/react";

const Footer = () => {
  const [isLargerThanSm] = useMediaQuery("(min-width: 20rem)");
  const [isLargerThanMd] = useMediaQuery("(min-width: 30rem)");

  return (
    <Text
      color="rgba(49, 53, 59, 0.68)"
      fontSize={["0.553rem", "0.67rem", "0.812rem"]}
      mt="7.5rem"
      mb="0.125rem"
      lineHeight="1.375rem"
      whiteSpace="nowrap"
      display="block"
      textAlign="center"
    >
      &copy; 2009 - 2023, PT Wired.
    </Text>
  );
};

export default Footer;
