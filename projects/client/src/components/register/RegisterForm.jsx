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
} from "@chakra-ui/react";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// Own library imports
import checkDuplicate from "../../lib/register/checkDuplicate";
import AvailableModal from "./AvailableModal";
import DuplicateModal from "./DuplicateModal";

const RegisterForm = ({ props: { UserContext } }) => {
  // Create form context
  const RegisterContext = createContext();

  // States based on user input
  const [isError, setIsError] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // Redirects functionality
  const navigate = useNavigate();

  useEffect(() => {
    if (formik.errors.email) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [formik.touched.email, formik.errors.email]);

  return (
    <Box p="0 1rem">
      <Flex
        direction="column"
        align="center"
        justify="center"
        boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
        p={[
          "1.132rem 1.888rem 1.510rem",
          "1.303rem 2.173rem 1.738rem",
          "1.5rem 2.5rem 2rem",
        ]}
        maxW="25rem"
      >
        <Text
          as="b"
          fontSize={["0.963rem", "1.23rem", "1.571rem"]}
          color="rgba(0,0,0,0.7)"
          textAlign="center"
        >
          Daftar Sekarang
        </Text>
        <Text
          color="rgba(0, 0, 0, 0.54)"
          fontSize={["0.613rem", "0.783rem", "1rem"]}
        >
          Sudah punya akun Wired?{" "}
          <Link
            href=""
            fontSize={["0.613rem", "0.783rem", "1rem"]}
            color="teal"
            onClick={() => {
              navigate("/login");
            }}
            style={{ textDecoration: "none" }}
          >
            Masuk
          </Link>
        </Text>
        <Flex align="center" width="100%" py="2">
          <Divider flexBasis="23%" />
          <Text
            fontSize={["0.571rem", "0.7rem", "0.8571428571428571rem"]}
            color="rgb(108, 114, 124)"
            textAlign="center"
            flexBasis="54%"
            pb="5px"
          >
            atau daftar dengan
          </Text>
          <Divider flexBasis="23%" />
        </Flex>
        <FormControl mt="0.8rem" mb="0.5rem" isInvalid={isError}>
          <FormLabel
            color="rgba(0,0,0,0.54)"
            fontSize={["0.597rem", "0.723rem", "0.875rem"]}
            lineHeight="1.15"
          >
            Email
          </FormLabel>
          <Input
            type="email"
            id="email"
            {...formik.getFieldProps("email")}
            fontSize={["0.597rem", "0.723rem", "0.875rem"]}
            height={["1.706rem", "2.065rem", "2.5rem"]}
            focusBorderColor={
              isError ? "rgb(229, 62, 62)" : "rgb(62, 191, 184)"
            }
            transition="border-width 200ms linear"
          />
          {isError ? (
            <FormErrorMessage
              fontSize={["0.512rem", "0.62rem", "0.75rem"]}
              lineHeight="1.125"
            >
              {formik.errors.email}
            </FormErrorMessage>
          ) : (
            <FormHelperText
              fontSize={["0.512rem", "0.62rem", "0.75rem"]}
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
          h={["1.706rem", "2.065rem", "2.5rem"]}
          color={
            isError || !formik.values.email
              ? "rgb(108, 114, 124)"
              : "rgb(255, 255, 255)"
          }
          fontSize={["0.611rem", "0.782rem", "1rem"]}
          fontWeight="700"
          cursor={isError || !formik.values.email ? "not-allowed" : "pointer"}
          colorScheme={isError || !formik.values.email ? "gray" : "teal"}
          isLoading={isLoading}
          onClick={async () => {
            // Disable button if no input is found
            if (!formik.values.email || isError) {
              return;
            }

            // Change button style
            setIsLoading(true);

            // Check duplicate email address
            const res = await checkDuplicate(formik.values.email);

            if (res.status === 200) {
              setIsAvailable(true);
            } else if (res.status === 400) {
              setIsAvailable(false);
            }
            // Display appropriate modal
            onOpen();
          }}
        >
          Daftar
        </Button>
        <Text
          color="rgb(108, 114, 124)"
          fontSize={["0.512rem", "0.62rem", "0.75rem"]}
          align="center"
        >
          Dengan mendaftar, saya menyetujui{" "}
        </Text>
        <Text
          color="rgb(108, 114, 124)"
          fontSize={["0.512rem", "0.62rem", "0.75rem"]}
          align="center"
        >
          <Link
            href=""
            fontSize={["0.512rem", "0.62rem", "0.75rem"]}
            color="teal"
          >
            Syarat dan Ketentuan
          </Link>{" "}
          serta{" "}
          <Link
            href=""
            fontSize={["0.512rem", "0.62rem", "0.75rem"]}
            color="teal"
          >
            Kebijakan Privasi
          </Link>
        </Text>
      </Flex>
      {isAvailable ? (
        <RegisterContext.Provider value={{ isOpen, onClose, setIsLoading }}>
          <AvailableModal
            props={{
              email: formik.values.email,
              RegisterContext,
              UserContext,
            }}
          />
        </RegisterContext.Provider>
      ) : (
        <RegisterContext.Provider value={{ isOpen, onClose, setIsLoading }}>
          <DuplicateModal
            props={{ email: formik.values.email, RegisterContext }}
          />
        </RegisterContext.Provider>
      )}
    </Box>
  );
};

export default RegisterForm;
