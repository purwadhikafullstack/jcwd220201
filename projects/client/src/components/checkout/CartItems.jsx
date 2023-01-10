import { Box } from "@chakra-ui/react";
import { useContext } from "react";

// Own library imports
import { CheckoutContext } from "./CheckoutContextProvider";
import renderCartItems from "../../lib/checkout/renderCartItems";

const CartItems = () => {
  const {
    items: { cartItems },
  } = useContext(CheckoutContext);

  return cartItems ? <Box>{renderCartItems(cartItems)}</Box> : null;
};

export default CartItems;
