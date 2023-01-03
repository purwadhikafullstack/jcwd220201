import { extendTheme } from "@chakra-ui/react";
import AddressCard from "./address/addressCard";

const theme = extendTheme({
  components: {
    AddressCard,
  },
});

export default theme;
