import { Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box
      borderBottom="1px solid rgb(243, 244, 245)"
      display="flex"
      h="3.75rem"
      justifyContent="center"
      mx="auto"
      px="5.6875rem"
      w="100%"
    >
      <Image
        cursor="pointer"
        src="/assets/logo.png"
        width={["7.172rem", "9.172rem", "12rem", "12rem"]}
        height="3.6875rem"
        objectFit="contain"
        onClick={() => navigate("/")}
      />
    </Box>
  );
};

export default Header;
