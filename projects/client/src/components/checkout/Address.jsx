import {
  Box,
  Button,
  Flex,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import AddressListModal from "./AddressListModal";
import NoAddressCard from "./NoAddressCard";

// Own library imports
import { CheckoutContext } from "./CheckoutContextProvider";
import renderShippingCouriers from "../../lib/checkout/renderShippingCouriers";
import renderShippingServices from "../../lib/checkout/renderShippingServices";
import { IDR } from "../../lib/currency/Rupiah";

const Address = () => {
  // Get address and shipping data
  const {
    address: {
      shippingAddress,
      addresses,
      isLoading,
      noAddressFound,
      displayNoAddressFound,
    },
    shipping: {
      isFetchingCourier,
      isReloading,
      shippingOptions,
      shippingServices,
      selectedCourierName,
      serviceType,
      displayServiceButton,
      setSelectedCourier,
      setServiceType,
    },
  } = useContext(CheckoutContext);

  const [displayCourier, setDisplayCourier] = useState(false);
  const [displayService, setDisplayService] = useState(false);
  const [isServiceSelected, setIsServiceSelected] = useState(false);

  // Modal functionality
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      borderBottom="6px solid rgb(243, 244, 245)"
      display="flex"
      flexDirection="column"
    >
      <Text as="b" color="rgb(49, 53, 59)" fontSize="1.4375rem" mb="1.375rem">
        Checkout
      </Text>
      <Text
        as="b"
        borderBottom="1px solid rgb(219, 222, 226)"
        color="rgb(49, 53, 59)"
        fontSize="0.875rem"
        pb="0.875rem"
      >
        Alamat Pengiriman
      </Text>
      {displayNoAddressFound ? (
        <NoAddressCard />
      ) : (
        <>
          <Box py="0.625rem" borderBottom="1px solid rgb(219, 222, 226)">
            <Flex alignItems="center">
              <Text as="b" color="rgb(49, 53, 59)" mr="0.1875rem" pb="4px">
                {!isLoading && shippingAddress.recipient}
              </Text>
              <Text color="rgb(49, 53, 59)" mr="0.25rem" pb="4px">
                {!isLoading && `(${shippingAddress.label})`}
              </Text>
              {!isLoading && shippingAddress.is_default ? (
                <Box
                  backgroundColor="rgba(62, 191, 184, 0.2)"
                  borderRadius="3px"
                  color="rgb(49, 151, 149)"
                  fontSize="0.625rem"
                  fontWeight="800"
                  height="1.25rem"
                  lineHeight="1rem"
                  pt="1px"
                  pb="4px"
                  px="0.5rem"
                >
                  Utama
                </Box>
              ) : null}
            </Flex>
            <Text color="rgb(49, 53, 59)">
              {!isLoading && shippingAddress.phone}
            </Text>
            <Text
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              width="75%"
            >
              {!isLoading && shippingAddress.address}
            </Text>
            <Text>
              {!isLoading &&
                `${shippingAddress.city}, ${shippingAddress.postal_code}`}
            </Text>
          </Box>
          <Box py="0.9375rem" display="flex">
            <Button
              border="1px solid rgb(229, 231, 233)"
              borderRadius="0.5rem"
              color="rgba(49, 53, 59, 0.96)"
              colorScheme="whiteAlpha"
              fontSize="0.9375rem"
              fontWeight="700"
              onClick={onOpen}
            >
              Pilih Alamat Lain
            </Button>
            <Box ml="0.625rem" position="relative" zIndex="1">
              <Button
                border="1px solid rgb(229, 231, 233)"
                borderRadius="0.5rem"
                cursor="pointer"
                color="rgba(49, 53, 59, 0.96)"
                colorScheme="whiteAlpha"
                focusBorderColor="none"
                fontSize="0.9375rem"
                fontWeight="700"
                isDisabled={isReloading}
                isLoading={isFetchingCourier}
                onBlur={() => setDisplayCourier(false)}
                onMouseDown={() => setDisplayCourier(!displayCourier)}
                textAlign="center"
                w="15.125rem"
              >
                {selectedCourierName
                  ? selectedCourierName
                  : "Pilih Jasa Pengiriman"}
              </Button>
              <UnorderedList
                backgroundColor="white"
                border="1px solid rgb(226, 232, 240)"
                borderRadius="0.375rem"
                maxH="8.25rem"
                listStyleType="none"
                ml="0"
                mt="7px"
                opacity="1"
                overflowY="scroll"
                position="absolute"
                visibility={displayCourier ? "visible" : "hidden"}
                w="15.125rem"
                zIndex="1"
              >
                {renderShippingCouriers(
                  shippingOptions,
                  setSelectedCourier,
                  setDisplayCourier,
                  setIsServiceSelected
                )}
              </UnorderedList>
            </Box>
            {displayServiceButton && shippingServices ? (
              <Box ml="0.625rem" position="relative" zIndex="1">
                <Button
                  backgroundColor="rgb(49, 151, 149)"
                  border="1px solid rgb(229, 231, 233)"
                  borderRadius="0.5rem"
                  cursor="pointer"
                  color="white"
                  colorScheme="teal"
                  focusBorderColor="none"
                  fontSize="0.9375rem"
                  fontWeight="700"
                  isDisabled={isFetchingCourier || isReloading}
                  onBlur={() => setDisplayService(false)}
                  onMouseDown={() => setDisplayService(!displayService)}
                  textAlign="center"
                  w="15.125rem"
                >
                  {serviceType && isServiceSelected
                    ? `${serviceType["service"]["service"]} (${IDR(
                        serviceType["service"]["cost"][0]["value"]
                      )})`
                    : "Pilih Layanan Pengiriman"}
                </Button>
                {displayService && (
                  <UnorderedList
                    backgroundColor="white"
                    border="1px solid rgb(226, 232, 240)"
                    borderRadius="0.375rem"
                    maxH="8.25rem"
                    listStyleType="none"
                    ml="0"
                    mt="7px"
                    opacity="1"
                    overflowY="scroll"
                    position="absolute"
                    w="15.125rem"
                    zIndex="1"
                  >
                    {renderShippingServices(
                      shippingServices,
                      setServiceType,
                      setDisplayService,
                      setIsServiceSelected
                    )}
                  </UnorderedList>
                )}
              </Box>
            ) : null}
          </Box>
          {!isLoading && (
            <AddressListModal
              isOpen={isOpen}
              onClose={onClose}
              addresses={addresses}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Address;
