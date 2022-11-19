import { Box, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <Box>
      <Heading>ini products</Heading>
      <Link to={"/login"}>login</Link>
    </Box>
  );
};

export default Product;
