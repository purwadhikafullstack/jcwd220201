import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Text,
  Link,
  Divider,
  Button,
  useMediaQuery,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { submit } from "../../redux/features/register/registerSlice";

const RegisterForm = () => {
  // Global state access
  const dispatch = useDispatch();

  // Media query
  const [isLargerThanSm] = useMediaQuery("(min-width: 20rem)");
  const [isLargerThanMd] = useMediaQuery("(min-width: 30rem)");

  // Monitor user input
  const [isError, setIsError] = useState(false);

  // Form functionality
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Format email salah")
        .required("Email harus diisi"),
    }),
  });

  // Modal functionality
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (formik.errors.email) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [formik.touched.email, formik.errors.email]);

  return (
    <Box p="1rem">
      <Flex
        direction="column"
        align="center"
        justify="center"
        boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
        p={
          isLargerThanMd
            ? "1.5rem 2.5rem 2rem"
            : isLargerThanSm
            ? "1.303rem 2.173rem 1.738rem"
            : "1.132rem 1.888rem 1.510rem"
        }
        maxW="25rem"
      >
        <Text
          as="b"
          fontSize={
            isLargerThanMd
              ? "1.571rem"
              : isLargerThanSm
              ? "1.23rem"
              : "0.963rem"
          }
          color="rgba(0,0,0,0.7)"
          textAlign="center"
        >
          Daftar Sekarang
        </Text>
        <Text
          color="rgba(0, 0, 0, 0.54)"
          fontSize={
            isLargerThanMd ? "1rem" : isLargerThanSm ? "0.783rem" : "0.613rem"
          }
        >
          Sudah punya akun Wired?{" "}
          <Link
            href=""
            fontSize={
              isLargerThanMd ? "1rem" : isLargerThanSm ? "0.783rem" : "0.613rem"
            }
            color="teal"
          >
            Masuk
          </Link>
        </Text>
        <Flex align="center" width="100%" py="2">
          <Divider flexBasis="25%" />
          <Text
            fontSize={
              isLargerThanMd
                ? "0.8571428571428571rem"
                : isLargerThanSm
                ? "0.7rem"
                : "0.571rem"
            }
            color="rgb(108, 114, 124)"
            textAlign="center"
            flexBasis="50%"
            pb="5px"
          >
            atau daftar dengan
          </Text>
          <Divider flexBasis="25%" />
        </Flex>
        <FormControl mt="0.8rem" mb="0.5rem" isInvalid={isError}>
          <FormLabel
            color="rgba(0,0,0,0.54)"
            fontSize={
              isLargerThanMd
                ? "0.875rem"
                : isLargerThanSm
                ? "0.723rem"
                : "0.597rem"
            }
            lineHeight="1.15"
          >
            Email
          </FormLabel>
          <Input
            type="email"
            id="email"
            {...formik.getFieldProps("email")}
            fontSize={
              isLargerThanMd
                ? "0.875rem"
                : isLargerThanSm
                ? "0.723rem"
                : "0.597rem"
            }
            height={
              isLargerThanMd
                ? "2.5rem"
                : isLargerThanSm
                ? "2.065rem"
                : "1.706rem"
            }
            focusBorderColor={
              isError ? "rgb(229, 62, 62)" : "rgb(62, 191, 184)"
            }
            transition="border-width 200ms linear"
          />
          {isError ? (
            <FormErrorMessage
              fontSize={
                isLargerThanMd
                  ? "0.75rem"
                  : isLargerThanSm
                  ? "0.62rem"
                  : "0.512rem"
              }
              lineHeight="1.125"
            >
              {formik.errors.email}
            </FormErrorMessage>
          ) : (
            <FormHelperText
              fontSize={
                isLargerThanMd
                  ? "0.75rem"
                  : isLargerThanSm
                  ? "0.62rem"
                  : "0.512rem"
              }
              lineHeight="1.125"
              color="rgba(0, 0, 0, 0.54)"
            >
              Example: email@wired.com
            </FormHelperText>
          )}
        </FormControl>
        <Button
          my="1rem"
          w="100%"
          h={
            isLargerThanMd ? "2.5rem" : isLargerThanSm ? "2.065rem" : "1.706rem"
          }
          color={
            isError || !formik.values.email
              ? "rgb(108, 114, 124)"
              : "rgb(255, 255, 255)"
          }
          fontSize={
            isLargerThanMd ? "1rem" : isLargerThanSm ? "0.782rem" : "0.611rem"
          }
          fontWeight="700"
          cursor={isError || !formik.values.email ? "not-allowed" : "pointer"}
          colorScheme={isError || !formik.values.email ? "gray" : "teal"}
          onClick={onOpen}
        >
          Daftar
        </Button>
        <Text
          color="rgb(108, 114, 124)"
          fontSize={
            isLargerThanMd ? "0.75rem" : isLargerThanSm ? "0.62rem" : "0.512rem"
          }
          align="center"
        >
          Dengan mendaftar, saya menyetujui{" "}
        </Text>
        <Text
          color="rgb(108, 114, 124)"
          fontSize={
            isLargerThanMd ? "0.75rem" : isLargerThanSm ? "0.62rem" : "0.512rem"
          }
          align="center"
        >
          <Link
            href=""
            fontSize={
              isLargerThanMd
                ? "0.75rem"
                : isLargerThanSm
                ? "0.62rem"
                : "0.512rem"
            }
            color="teal"
          >
            Syarat dan Ketentuan
          </Link>{" "}
          serta{" "}
          <Link
            href=""
            fontSize={
              isLargerThanMd
                ? "0.75rem"
                : isLargerThanSm
                ? "0.62rem"
                : "0.512rem"
            }
            color="teal"
          >
            Kebijakan Privasi
          </Link>
        </Text>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={isLargerThanMd ? "lg" : isLargerThanSm ? "md" : "sm"}
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
            {formik.values.email}
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
            Apakah email yang anda masukkan sudah benar?
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="center"
            py={
              isLargerThanMd ? "1rem" : isLargerThanSm ? "0.577rem" : "0.332rem"
            }
          >
            <Button
              onClick={onClose}
              mr="0.375rem"
              width={
                isLargerThanMd
                  ? "10.25rem"
                  : isLargerThanSm
                  ? "6.673rem"
                  : "4.341rem"
              }
              height="3rem"
              maxW="100%"
              border="1px solid"
              fontSize={
                isLargerThanMd
                  ? "1rem"
                  : isLargerThanSm
                  ? "0.826rem"
                  : "0.682rem"
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
              height="3rem"
              maxW="100%"
              fontSize={
                isLargerThanMd
                  ? "1rem"
                  : isLargerThanSm
                  ? "0.826rem"
                  : "0.682rem"
              }
              fontWeight="700"
              colorScheme="teal"
              lineHeight="22px"
              whiteSpace="nowrap"
              onClick={() => {
                dispatch(submit());
              }}
            >
              Ya, Benar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RegisterForm;
