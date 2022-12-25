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
  // Media query
  const [isLargerThanSm] = useMediaQuery("(min-width: 20rem)");
  const [isLargerThanMd] = useMediaQuery("(min-width: 30rem)");

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
      size={isLargerThanMd ? "md" : isLargerThanSm ? "sm" : "xs"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent p="2rem 2rem 1.5rem">
        <ModalHeader
          textAlign="center"
          fontSize={
            isLargerThanMd
              ? "1.714rem"
              : isLargerThanSm
              ? "1.116rem"
              : "0.726rem"
          }
          fontWeight="700"
          mb={
            isLargerThanMd
              ? "0.875rem"
              : isLargerThanSm
              ? "0.504rem"
              : "0.290rem"
          }
          p="0"
        >
          Email Sudah Terdaftar
        </ModalHeader>
        <ModalBody
          color="rgb(108, 114, 124)"
          textAlign="center"
          fontSize={
            isLargerThanMd
              ? "0.989rem"
              : isLargerThanSm
              ? "0.644rem"
              : "0.419rem"
          }
          lineHeight="1.5rem"
          m={
            isLargerThanMd
              ? "0 1rem 1rem"
              : isLargerThanSm
              ? "0 1rem 0.577rem"
              : "0 1rem 0.332rem"
          }
          p="0"
        >
          Lanjut masuk dengan email ini {email}?
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="center"
          py={
            isLargerThanMd ? "1rem" : isLargerThanSm ? "0.577rem" : "0.332rem"
          }
        >
          <Button
            onClick={() => {
              onClose();
              setIsLoading(false);
            }}
            mr="0.375rem"
            width={
              isLargerThanMd
                ? "10.25rem"
                : isLargerThanSm
                ? "6.673rem"
                : "4.341rem"
            }
            height={
              isLargerThanMd ? "3rem" : isLargerThanSm ? "2.478rem" : "2.046rem"
            }
            maxW="100%"
            border="1px solid"
            fontSize={
              isLargerThanMd ? "1rem" : isLargerThanSm ? "0.826rem" : "0.682rem"
            }
            fontWeight="700"
            colorScheme="white"
            color="teal"
            lineHeight="22px"
            whiteSpace="nowrap"
          >
            Ubah
          </Button>
          <Button
            width={
              isLargerThanMd
                ? "10.25rem"
                : isLargerThanSm
                ? "6.673rem"
                : "4.341rem"
            }
            height={
              isLargerThanMd ? "3rem" : isLargerThanSm ? "2.478rem" : "2.046rem"
            }
            maxW="100%"
            fontSize={
              isLargerThanMd ? "1rem" : isLargerThanSm ? "0.826rem" : "0.682rem"
            }
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
