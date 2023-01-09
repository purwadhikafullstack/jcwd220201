import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import AddressForm from "./AddressForm";

const NoAddressCard = () => {
  // Modal functionality
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Alert
      backgroundColor="rgba(62, 191, 184, 0.22)"
      borderRadius="0.5rem"
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      width="100%"
      height={["10rem", "12.5rem"]}
      my="1rem"
    >
      <AlertIcon
        boxSize={["1.75rem", "2.1875rem", "2.5rem", "2rem"]}
        mr={0}
        color="teal"
      />
      <AlertTitle
        mt={4}
        mb={1}
        color="rgba(49, 53, 59, 0.96)"
        fontSize={["xs", "sm", "md", "md"]}
      >
        Tambahkan Alamat dulu, ya!
      </AlertTitle>
      <AlertDescription
        maxWidth="sm"
        color="rgb(109, 117, 136)"
        fontSize={["xs"]}
      >
        Cuma satu langkah lagi sebelum kamu bisa selesaikan pembayaran
      </AlertDescription>
      <Button
        colorScheme="teal"
        fontSize="0.875rem"
        height="2.2rem"
        mt="1rem"
        onClick={onOpen}
      >
        &#43; Tambahkan Alamat Baru
      </Button>

      <AddressForm isOpen={isOpen} onClose={onClose} />
    </Alert>
  );
};

export default NoAddressCard;
