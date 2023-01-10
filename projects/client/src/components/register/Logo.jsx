import { Image, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  // Media query
  const [isLargerThanSm] = useMediaQuery("(min-width: 20rem)");
  const [isLargerThanMd] = useMediaQuery("(min-width: 30rem)");

  // Redirects functionality
  const navigate = useNavigate();

  return (
    <Image
      src="/assets/logo.png"
      alt="logo"
      cursor="pointer"
      width={["6.826rem", "8.262rem", "10rem"]}
      maxW="100%"
      my="1.25rem"
      onClick={() => navigate("/")}
    />
  );
};

export default Logo;
