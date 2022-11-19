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
      ml="4px"
      mb="2px"
      mt="7.5rem"
      lineHeight="1.375rem"
      whiteSpace="nowrap"
    >
      &#169; 2009-2022,PT Tokopedia
    </Text>
  );
};

export default Footer;
