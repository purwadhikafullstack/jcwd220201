import { useContext } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useStyleConfig,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { GrLocation } from "react-icons/gr";
import { BsCheck2 } from "react-icons/bs";

// Own library imports
import { CheckoutContext } from "./CheckoutContextProvider";
import selectAddress from "../../lib/checkout/selectAddress";
import fetchAddresses from "../../lib/checkout/fetchAddresses";

const AddressCard = (props) => {
  const { variant, ...rest } = props;
  const styles = useStyleConfig("AddressCard", { variant });
  const [isSmSize] = useMediaQuery("min-width: 30rem");

  const {
    address: { setShippingAddress, setAddresses },
    shipping: { setIsReloading, shippingServices },
  } = useContext(CheckoutContext);
  const { id, label, recipient, phone, address, is_default } = rest.address;

  // Alert functionality
  const { onClose } = rest;
  const toast = useToast();

  return (
    <Box
      __css={styles}
      {...rest}
      width="auto"
      height={["11.4rem", "12.5rem", "10.25rem", "10.25rem"]}
      mt={is_default ? 0 : "default"}
    >
      <Flex
        color="rgba(49, 53, 59, 0.96)"
        direction="column"
        pr="1rem"
        width="100%"
        _before={{
          content: '""',
          position: "absolute",
          top: "0.75rem",
          left: "0",
          width: "0.375rem",
          height: "2.125rem",
          borderTopRightRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          backgroundColor: "rgb(49, 151, 149)",
        }}
      >
        <Flex>
          <Text
            fontSize={["0.75rem", "0.875rem"]}
            fontWeight="700"
            height="1.25rem"
          >
            {label}
          </Text>
          {is_default ? (
            <Box
              backgroundColor="rgb(243, 244, 245)"
              borderRadius="3px"
              color="rgb(159, 166, 176)"
              fontSize="0.625rem"
              fontWeight="800"
              lineHeight="1rem"
              ml="0.25rem"
              pt="1px"
              px="0.5rem"
            >
              Utama
            </Box>
          ) : null}
        </Flex>
        <Text
          fontSize={["0.857rem", "1rem"]}
          fontWeight="700"
          lineHeight="1.25rem"
          maxW="21.875rem"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {recipient}
        </Text>
        <Text
          fontSize={["0.75rem", "0.875rem"]}
          lineHeight="1.25rem"
          maxW="21.875rem"
          mt="0.25rem"
        >
          {phone}
        </Text>
        <Text
          fontSize={["0.75rem", "0.875rem"]}
          lineHeight="1.25rem"
          maxW="21.875rem"
          whiteSpace="nowrap"
          width={["50%", "100%", "100%", "100%"]}
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {address}
        </Text>
        <HStack spacing="0.25rem" mt={["0.625rem", "1rem"]}>
          <GrLocation size={isSmSize ? "1.4rem" : "1.3rem"} />
          <Text fontSize={["0.75rem", "0.875rem"]} lineHeight="1.125rem">
            Sudah Pinpoint
          </Text>
        </HStack>
      </Flex>
      {variant === "selected" ? (
        <Box mx="auto">
          <BsCheck2 size="1.625rem" color="rgb(49, 151, 149)" />
        </Box>
      ) : (
        <Button
          borderRadius="0.5rem"
          colorScheme="teal"
          fontWeight="bold"
          fontSize="0.75rem"
          height="2rem"
          onClick={async () => {
            // Update address data
            if (shippingServices) {
              setIsReloading(true);
            }
            const res = await selectAddress(id);

            // Set shipping address
            setShippingAddress(rest.address);

            // Update address list
            const {
              data: { addresses },
            } = await fetchAddresses();

            setAddresses(addresses);

            // Display result
            toast({
              title: res.data.message,
              status: res.status === 200 ? "success" : "error",
            });

            // Close modal
            onClose();
          }}
          px="36px"
          width={["100%", "100%", "16.071%", "15.217%"]}
        >
          Pilih
        </Button>
      )}
    </Box>
  );
};

export default AddressCard;
