import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Link,
  useMediaQuery,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

// Own library imports
import axiosInstance from "../../api";

// Component imports
import TogglePasswordIcon from "./TogglePasswordIcon";

const FinishRegistrationForm = ({ props: { UserContext } }) => {
  // Media query
  const [isLargerThanSm] = useMediaQuery("(min-width: 20rem)");
  const [isLargerThanMd] = useMediaQuery("(min-width: 30rem)");

  // Get user context
  const { email } = useContext(UserContext);

  // Monitor user input
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle password functionality
  const [show, setShow] = useState(false);

  // Alert functionality
  const toast = useToast();

  // Redirects functionality
  const navigate = useNavigate();

  // Form functionality
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Nama harus diisi")
        .min(3, "Nama lengkap terlalu pendek, minimum 3 karakter"),
      password: Yup.string()
        .required("Kata sandi harus diisi")
        .min(8, "Kata sandi terlalu pendek, minimum 8 karakter"),
    }),
    onSubmit: async ({ name, password }) => {
      try {
        // Disable on error
        if (nameError || passwordError) {
          return;
        }

        setIsLoading(true);

        // Update user credentials
        const response = await axiosInstance.post(`/api/register/account`, {
          name,
          email,
          password,
        });
        // Alert success
        toast({
          title: `${response.data.message}`,
          status: "success",
          duration: 2000,
        });
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    },
  });

  // Trigger name error effect
  useEffect(() => {
    if (formik.values.name && formik.errors.name) {
      setNameError(true);
    } else if (formik.touched.name && formik.errors.name) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [formik.values.name, formik.touched.name, formik.errors.name]);

  // Trigger password error effect
  useEffect(() => {
    if (formik.values.password && formik.errors.password) {
      setPasswordError(true);
    } else if (formik.touched.password && formik.errors.password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [formik.values.password, formik.touched.password, formik.errors.password]);

  return (
    <Box>
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
        w={
          isLargerThanMd
            ? "20.367rem"
            : isLargerThanSm
            ? "17.704rem"
            : "15.488rem"
        }
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
          Daftar dengan Email
        </Text>
        <Text
          color="rgba(0, 0, 0, 0.54)"
          fontSize={
            isLargerThanMd ? "1rem" : isLargerThanSm ? "0.783rem" : "0.613rem"
          }
        >
          {email}
        </Text>
        <FormControl mt="1.25rem" mb="0.5rem" isInvalid={nameError}>
          <FormLabel
            color="rgba(0, 0, 0, 0.54)"
            fontSize={
              isLargerThanMd
                ? "0.875rem"
                : isLargerThanSm
                ? "0.723rem"
                : "0.597rem"
            }
            lineHeight="1.15"
          >
            Nama Lengkap
          </FormLabel>
          <Input
            type="text"
            id="name"
            {...formik.getFieldProps("name")}
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
              nameError ? "rgb(229, 62, 62)" : "rgb(62, 191, 184)"
            }
            transition="border-width 200ms linear"
          />
          {nameError ? (
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
              {formik.errors.name}
            </FormErrorMessage>
          ) : null}
        </FormControl>
        <FormControl mt="1rem" isInvalid={passwordError}>
          <FormLabel
            color="rgba(0, 0, 0, 0.54)"
            fontSize={
              isLargerThanMd
                ? "0.875rem"
                : isLargerThanSm
                ? "0.723rem"
                : "0.597rem"
            }
            lineHeight="1.15"
          >
            Kata Sandi
          </FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              id="password"
              {...formik.getFieldProps("password")}
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
                passwordError ? "rgb(229, 62, 62)" : "rgb(62, 191, 184)"
              }
              transition="border-width 200ms linear"
            />
            <InputRightElement
              children={
                <TogglePasswordIcon
                  callback={() => {
                    setShow(!show);
                  }}
                />
              }
            />
          </InputGroup>
          {passwordError ? (
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
              {formik.errors.password}
            </FormErrorMessage>
          ) : (
            <FormHelperText
              color="rgba(49,53,59,0.68)"
              fontSize={
                isLargerThanMd
                  ? "0.75rem"
                  : isLargerThanSm
                  ? "0.62rem"
                  : "0.512rem"
              }
              lineHeight="1.125"
            >
              Minimum 8 karakter
            </FormHelperText>
          )}
        </FormControl>
        <Button
          color={
            nameError ||
            !formik.values.name ||
            passwordError ||
            !formik.values.password
              ? "rgb(108, 114, 124)"
              : "rgb(255, 255, 255)"
          }
          fontSize={
            isLargerThanMd ? "1rem" : isLargerThanSm ? "0.782rem" : "0.611rem"
          }
          fontWeight="700"
          cursor={
            nameError ||
            !formik.values.name ||
            passwordError ||
            !formik.values.password
              ? "not-allowed"
              : "pointer"
          }
          colorScheme={
            nameError ||
            !formik.values.name ||
            passwordError ||
            !formik.values.password
              ? "gray"
              : "teal"
          }
          w="100%"
          h={
            isLargerThanMd ? "2.5rem" : isLargerThanSm ? "2.065rem" : "1.706rem"
          }
          mt="2rem"
          isLoading={isLoading}
          onClick={formik.handleSubmit}
        >
          Selesai
        </Button>
        <Text
          color="rgb(108, 114, 124)"
          fontSize={
            isLargerThanMd ? "0.75rem" : isLargerThanSm ? "0.62rem" : "0.512rem"
          }
          align="center"
          mt="0.875rem"
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
    </Box>
  );
};

export default FinishRegistrationForm;
