import { Image, useMediaQuery } from "@chakra-ui/react";

const Logo = () => {
  const [isLargerThanSm] = useMediaQuery("(min-width: 20rem)");
  const [isLargerThanMd] = useMediaQuery("(min-width: 30rem)");

  return (
    <Image
      src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/581fca3a.png"
      alt="logo"
      width={
        isLargerThanMd ? "10rem" : isLargerThanSm ? "8.262rem" : "6.826rem"
      }
      maxW="100%"
      py="1.25rem"
    />
  );
};

export default Logo;
