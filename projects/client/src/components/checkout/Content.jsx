import { Box, Flex, Text } from "@chakra-ui/react";
import Address from "./Address";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";

const Content = () => {
  return (
    <Box
      color="rgba(0, 0, 0, 0.54)"
      fontSize="0.875rem"
      px="5.6875rem"
      mx="auto"
      minHeight="82.08vh"
    >
      <Flex mt="1.875rem">
        <Box mr="2.8125rem" width="41.058rem">
          <Address />
          <CartItems />
        </Box>
        <Box alignSelf="flex-start" position="sticky" top="0">
          <OrderSummary />
        </Box>
      </Flex>
    </Box>
  );
};

export default Content;
