import { Box, HStack, Image, Text } from "@chakra-ui/react";

// Own library imports
import { IDR } from "../../lib/currency/Rupiah";

const CartItem = ({ details, index, solitary = false }) => {
  const {
    quantity,
    Product: { product_name: productName, description, price, ProductPictures },
  } = details;

  return (
    <Box
      borderBottom="6px solid rgb(243, 244, 245)"
      color="rgba(49, 53, 59, 0.96)"
      display="flex"
      flexDirection="column"
      fontSize="0.9375rem"
      lineHeight="1rem"
    >
      {!solitary && (
        <Text
          boxSizing="border-box"
          fontWeight="700"
          lineHeight="1.25rem"
          mt="1rem"
        >
          Pesanan {index + 1}
        </Text>
      )}

      <HStack spacing="1%" mt="1rem" height="4rem">
        <Box width="10%" height="100%">
          <Image
            src={`http://localhost:8000/public/${ProductPictures[0].product_picture}`}
            boxSize="3.75rem"
          />
        </Box>
        <Box width="89%" maxW="700px" height="100%">
          <Text
            fontSize="0.875rem"
            lineHeight="1.125rem"
            overflowY="hidden"
            whiteSpace="wrap"
          >
            {productName}
          </Text>
          <Text
            fontSize="0.75rem"
            height="2.5rem"
            lineHeight="1.125rem"
            overflowY="hidden"
            whiteSpace="wrap"
          >
            {description}
          </Text>
        </Box>
      </HStack>
      <HStack spacing="auto" my="1rem">
        <HStack spacing="0.375rem">
          <Text fontWeight="700">Subtotal</Text>
          <Text color="rgba(0, 0, 0, 0.54)">({quantity} barang)</Text>
        </HStack>
        <Text fontWeight="700">{`${IDR(price * quantity)}`}</Text>
      </HStack>
    </Box>
  );
};

export default CartItem;
