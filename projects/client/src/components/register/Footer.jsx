import { Text, useMediaQuery } from "@chakra-ui/react";

const Footer = () => {
  const [isLargerThanSm] = useMediaQuery("(min-width: 20rem)");
  const [isLargerThanMd] = useMediaQuery("(min-width: 30rem)");

  return (
    <Text
      color="rgb(96, 96, 96)"
      fontSize={
        isLargerThanMd ? "0.812rem" : isLargerThanSm ? "0.67rem" : "0.553rem"
      }
      mt="7.5rem"
      mb="0.125rem"
      lineHeight="1.375rem"
      whiteSpace="nowrap"
      display="block"
      textAlign="center"
    >
      &#169; 2009-2022,PT Wired
    </Text>
  );
};

export default Footer;
