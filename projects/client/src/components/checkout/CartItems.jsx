import { Box } from "@chakra-ui/react";
import { useContext } from "react";

// Own library imports
import { CheckoutContext } from "./CheckoutContextProvider";
import renderCartItems from "../../lib/checkout/renderCartItems";

const CartItems = () => {
  const {
    items: { cartItems },
  } = useContext(CheckoutContext);

  if (!cartItems) {
    return;
  }

  return <Box>{renderCartItems(cartItems)}</Box>;
};

export default CartItems;
