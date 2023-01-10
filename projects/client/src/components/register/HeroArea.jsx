import { Image, Text, Flex, useMediaQuery } from "@chakra-ui/react";

const HeroArea = () => {
  const [isSmallerThanLg] = useMediaQuery("(max-width: 62em)");
  return (
    <Flex
      direction="column"
      align="center"
      pr="5rem"
      display={isSmallerThanLg ? "none" : "default"}
    >
      <Image
        src="assets/register-hero-1.png"
        alt="Ilustrasi"
        width="22.5rem"
        height="18.9375rem"
        objectFit="contain"
        maxW="100%"
      />
      <Text
        as="b"
        fontSize="1.4rem"
        display="block"
        width="22.5rem"
        textAlign="center"
      >
        Belanja Mudah Hanya di Wired!
      </Text>
      <Text
        fontSize="0.8125rem"
        color="rgb(109, 117, 136)"
        display="block"
        width="22.5rem"
        textAlign="center"
      >
        Gabung dan rasakan kemudahan bertransaksi di Wired!
      </Text>
    </Flex>
  );
};

export default HeroArea;
