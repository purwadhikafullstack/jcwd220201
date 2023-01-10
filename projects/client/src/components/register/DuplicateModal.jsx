import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const DuplicateModal = ({ props: { email, RegisterContext } }) => {
  // Get register context
  const { isOpen, onClose, setIsLoading } = useContext(RegisterContext);

  // Redirects functionality
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsLoading(false);
        onClose();
      }}
      size={["xs", "xs", "sm", "md"]}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        p={["1rem 1rem 0.5rem", "1.5rem 1.5rem 1rem", "2rem 2rem 1.5rem"]}
      >
        <ModalHeader
          textAlign="center"
          fontSize={["0.726rem", "1.116rem", "1.3213rem", "1.714rem"]}
          fontWeight="700"
          mb={["0.290rem", "0.504rem", "0.596rem", "0.875rem"]}
          p="0"
        >
          Email Sudah Terdaftar
        </ModalHeader>
        <ModalBody
          color="rgb(108, 114, 124)"
          textAlign="center"
          fontSize={["0.419rem", "0.644rem", "0.762rem", "0.989rem"]}
          lineHeight="1.5rem"
          m={[
            "0 1rem 0.332rem",
            "0 1rem 0.577rem",
            "0 1rem 0.683rem",
            "0 1rem 1rem",
          ]}
          p="0"
        >
          Lanjut masuk dengan email ini {email}?
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="center"
          py={["0.332rem", "0.577rem", "0.683rem", "1rem"]}
        >
          <Button
            onClick={() => {
              onClose();
              setIsLoading(false);
            }}
            mr="0.375rem"
            width={["4.341rem", "6.673rem", "7.9rem", "10.25rem"]}
            height={["1.746rem", "2.478rem", "2.739rem", "3rem"]}
            maxW="100%"
            border="1px solid"
            fontSize={["0.482rem", "0.826rem", "0.913rem", "1rem"]}
            fontWeight="700"
            colorScheme="white"
            color="teal"
            lineHeight="22px"
            whiteSpace="nowrap"
          >
            Ubah
          </Button>
          <Button
            width={["4.341rem", "6.673rem", "7.9rem", "10.25rem"]}
            height={["1.746rem", "2.478rem", "2.7391rem", "3rem"]}
            maxW="100%"
            fontSize={["0.482rem", "0.826rem", "0.913rem", "1rem"]}
            fontWeight="700"
            colorScheme="teal"
            lineHeight="22px"
            whiteSpace="nowrap"
            onClick={() => {
              navigate("/login");
            }}
          >
            Ya, Masuk
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DuplicateModal;
