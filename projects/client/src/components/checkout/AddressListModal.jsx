import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  Input,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Own library imports
import filterAddresses from "../../lib/checkout/filterAddresses";
import renderAdresses from "../../lib/checkout/renderAddresses";

const AddressListModal = ({ isOpen, onClose, addresses }) => {
  // Search functionality
  const [addressList, setAddressList] = useState(addresses);

  useEffect(() => {
    setAddressList(addresses);
  }, [addresses]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={["xs", "md", "2xl", "3xl"]}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize={["1.375rem", "1.5rem", "1.625rem", "1.625rem"]}
          fontWeight="700"
          letterSpacing="-0.2px"
          lineHeight="1.125rem"
          marginBlockEnd="1rem"
          marginBlockStart="1.5rem"
          p="0"
          textAlign="center"
        >
          Daftar Alamat
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody p="1rem 3rem">
          <Box px="0.1875rem">
            <Input
              id="query"
              type="text"
              backgroundImage="/assets/address/search-icon.svg"
              backgroundSize={["1.3125rem", "1.5rem"]}
              backgroundRepeat="no-repeat"
              backgroundPosition="8px center"
              focusBorderColor="rgb(62, 191, 184)"
              placeholder="Cari alamat atau nama penerima"
              _placeholder={{ color: "rgb(169, 168, 172)" }}
              height={["85.714%", "100%"]}
              color="rgba(49, 53, 59, 0.96)"
              fontSize={["0.875rem", "1rem"]}
              lineHeight="1.25rem"
              onChange={(e) =>
                filterAddresses(
                  e.target.value.toLowerCase(),
                  addresses,
                  setAddressList
                )
              }
              padding="0.5rem 2.75rem"
              _hover="none"
              width="100%"
            />
          </Box>

          <Box height="26.5625rem" overflow="auto" mt="1rem">
            {renderAdresses(addressList, onClose)}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddressListModal;
