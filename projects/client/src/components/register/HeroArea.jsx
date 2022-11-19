import { Image, Text, Flex, useMediaQuery } from "@chakra-ui/react";

const HeroArea = () => {
  const [isLargerThanLg] = useMediaQuery("(min-width: 62em)");
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      pr="5rem"
      display={isLargerThanLg ? "default" : "none"}
    >
      <Image
        src="https://ecs7.tokopedia.net/img/content/register_new.png"
        alt="Ilustrasi"
        maxW="22.5rem"
      />
      <Text as="b" fontSize="1.4rem">
        Jual Beli Mudah Hanya di Tokopedia
      </Text>
      <Text fontSize="0.8125rem" color="rgb(109, 117, 136)" textAlign="center">
        Gabung dan rasakan kemudahan bertransaksi di Tokopedia
      </Text>
    </Flex>
  );
};

export default HeroArea;
