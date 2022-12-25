import { Flex } from "@chakra-ui/react";
import Header from "../components/checkout/Header";
import Content from "../components/checkout/Content";
import CheckoutContextProvider from "../components/checkout/CheckoutContextProvider";
import Footer from "../components/checkout/Footer";

const Checkout = () => {
  return (
    <Flex direction="column">
      <Header />
      <CheckoutContextProvider>
        <Content />
      </CheckoutContextProvider>
      <Footer />
    </Flex>
  );
};

export default Checkout;
