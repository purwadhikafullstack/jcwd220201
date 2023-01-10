import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Checkbox,
  Text,
  HStack,
  Link,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

// Own library imports
import useCheckInputError from "../../lib/address/hooks/useCheckInputError";
import clearInput from "../../lib/address/clearInput";
import CitiesInput from "./CitiesInput";
import saveAddress from "../../lib/address/saveAddress";

const AddressForm = ({
  fetchAddresses,
  pageIndex,
  isOpen,
  onClose,
  setAddresses,
  setTotalPage,
  setPageIndex,
  setAddressManipulation,
}) => {
  // Get user id
  const id = useSelector((state) => state.auth.id);

  // Monitor user input
  const [recipientError, setRecipientError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [labelError, setLabelError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Alert functionality
  const toast = useToast();

  // Form functionality
  const RECIPIENT_MAX_LENGTH = 50;
  const LABEL_MAX_LENGTH = 30;
  const ADDRESS_MAX_LENGTH = 200;

  const invalidPattern = /^(?!\s*$)/;

  const errorMessage = {
    required: "Wajib diisi",
    maxPhoneLength: "Maksimal 13 angka",
  };

  const formik = useFormik({
    initialValues: {
      recipient: "",
      phone: "",
      label: "",
      address: "",
      city: "",
      province: "",
      postalCode: null,
      isDefault: false,
    },
    validationSchema: Yup.object({
      recipient: Yup.string()
        .matches(invalidPattern, errorMessage.required)
        .max(50)
        .required(errorMessage.required),
      phone: Yup.string()
        .matches(invalidPattern, errorMessage.required)
        .max(13, errorMessage.maxPhoneLength)
        .required(errorMessage.required),
      label: Yup.string()
        .matches(invalidPattern, errorMessage.required)
        .max(30)
        .required(errorMessage.required),
      city: Yup.string()
        .matches(invalidPattern, errorMessage.required)
        .required(errorMessage.required),
      address: Yup.string()
        .matches(invalidPattern, errorMessage.required)
        .max(200)
        .required(errorMessage.required),
      isDefault: Yup.boolean(),
    }),
    onSubmit: async () => {
      // Display loading animation
      setIsLoading(true);

      // Save new address
      const address = { id, newAddress: formik.values };
      const res = await saveAddress(address);

      // Update address list
      if (!pageIndex) {
        const response = await fetchAddresses();
        const { addresses: newAddressList, totalPage } = response.data.data;
        setAddresses(newAddressList);
        setTotalPage(totalPage);
      } else {
        setPageIndex(0);
      }

      setAddressManipulation(true);

      // Alert user of the result
      toast({
        title: res.data.message,
        status: res.status === 201 ? "success" : "error",
      });

      // Clear user input after saving
      clearInput(formik.values, formik.touched, formik.setFieldValue);

      // Stop loading animation
      setIsLoading(false);

      // Close form
      onClose();
    },
  });

  // Invalid input error handling
  const recipientErrorTrigger =
    formik.touched.recipient && formik.errors.recipient;
  const phoneErrorTrigger = formik.touched.phone && formik.errors.phone;
  const labelErrorTrigger = formik.touched.label && formik.errors.label;
  const cityErrorTrigger = formik.touched.city && formik.errors.city;
  const addressErrorTrigger = formik.touched.address && formik.errors.address;

  const handleInputErrors = [
    { trigger: recipientErrorTrigger, callback: setRecipientError },
    { trigger: phoneErrorTrigger, callback: setPhoneError },
    { trigger: labelErrorTrigger, callback: setLabelError },
    { trigger: cityErrorTrigger, callback: setCityError },
    { trigger: addressErrorTrigger, callback: setAddressError },
  ];

  useCheckInputError(handleInputErrors);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        clearInput(formik.values, formik.touched, formik.setFieldValue);
        onClose();
      }}
      scrollBehavior="inside"
      size={["xs", "md", "2xl", "3xl"]}
    >
      <ModalOverlay />
      <ModalContent color="rgba(49, 53, 59, 0.96)">
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
          Tambah Alamat
        </ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody
          fontSize={["0.75rem", "0.75rem", "0.875rem", "0.875rem"]}
          lineHeight="1rem"
          mt="1rem"
          p="1.5rem 2.5rem"
          textAlign="left"
        >
          <Heading
            fontSize={["1.125rem", "1.25rem", "1.375rem", "1.375rem"]}
            mb="1.5rem"
          >
            Lengkapi detail alamat
          </Heading>
          <FormControl isInvalid={recipientError}>
            <FormLabel
              fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Nama Penerima
            </FormLabel>
            <Input
              id="recipient"
              type="text"
              {...formik.getFieldProps("recipient")}
              focusBorderColor={
                recipientError ? "rgb(230, 68, 68)" : "rgb(49, 151, 149)"
              }
              fontSize={["0.75rem", "0.75rem", "0.875rem", "0.875rem"]}
              height={["2.125rem", "2.25rem", "2.5rem", "2.5rem"]}
              maxLength={RECIPIENT_MAX_LENGTH}
            />
            <HStack
              mt="0.25rem"
              justifyContent={recipientError ? "space-between" : "flex-end"}
            >
              <FormErrorMessage
                display="inline-block"
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.errors.recipient}
              </FormErrorMessage>
              <FormHelperText
                display="inline-block"
                color={
                  recipientError ? "rgb(230, 68, 68)" : "rgba(49, 53, 59, 0.68)"
                }
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.values.recipient.length}/{RECIPIENT_MAX_LENGTH}
              </FormHelperText>
            </HStack>
          </FormControl>
          <FormControl isInvalid={phoneError} mt="0.75rem">
            <FormLabel
              fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Nomor HP
            </FormLabel>
            <Input
              id="phone"
              type="tel"
              {...formik.getFieldProps("phone")}
              focusBorderColor={
                phoneError ? "rgb(230, 68, 68)" : "rgb(49, 151, 149)"
              }
              fontSize={["0.75rem", "0.75rem", "0.875rem", "0.875rem"]}
              maxLength={13}
            />
            <HStack mt="0.25rem" justifyContent="flex-start">
              <FormErrorMessage
                display="inline-block"
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.errors.phone}
              </FormErrorMessage>
            </HStack>
          </FormControl>
          <FormControl isInvalid={labelError} mt="2.125rem">
            <FormLabel
              fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Label Alamat
            </FormLabel>
            <Input
              id="label"
              type="text"
              {...formik.getFieldProps("label")}
              focusBorderColor={
                labelError ? "rgb(230, 68, 68)" : "rgb(49, 151, 149)"
              }
              fontSize={["0.75rem", "0.75rem", "0.875rem", "0.875rem"]}
              maxLength={LABEL_MAX_LENGTH}
            />
            <HStack
              mt="0.25rem"
              justifyContent={labelError ? "space-between" : "flex-end"}
            >
              <FormErrorMessage
                display="inline-block"
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.errors.label}
              </FormErrorMessage>
              <FormHelperText
                display="inline-block"
                color={
                  labelError ? "rgb(230, 68, 68)" : "rgba(49, 53, 59, 0.68)"
                }
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.values.label.length}/{LABEL_MAX_LENGTH}
              </FormHelperText>
            </HStack>
          </FormControl>
          <FormControl isInvalid={cityError} mt="0.75rem">
            <FormLabel
              fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Kota
            </FormLabel>
            <CitiesInput formik={formik} error={cityError} />
            <FormErrorMessage
              fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
              lineHeight="1rem"
              mt="0.25rem"
            >
              {formik.errors.city}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={addressError} mt="2.125rem" mb="0.25rem">
            <FormLabel
              fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
              fontWeight="700"
              lineHeight="1.25rem"
              mb="0.5rem"
              overflowWrap="break-word"
            >
              Alamat Lengkap
            </FormLabel>
            <Textarea
              id="address"
              {...formik.getFieldProps("address")}
              focusBorderColor={
                addressError ? "rgb(230, 68, 68)" : "rgb(49, 151, 149)"
              }
              fontSize={["0.75rem", "0.75rem", "0.875rem", "0.875rem"]}
              height="7.4375rem"
              lineHeight="1.375rem"
              maxLength={ADDRESS_MAX_LENGTH}
              overflowWrap="break-word"
              p="0.5rem 0.75rem"
              resize="none"
            ></Textarea>
            <HStack
              mt="0.25rem"
              justifyContent={addressError ? "space-between" : "flex-end"}
            >
              <FormErrorMessage
                display="inline-block"
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.errors.address}
              </FormErrorMessage>
              <FormHelperText
                display="inline-block"
                color={
                  addressError ? "rgb(230, 68, 68)" : "rgba(49, 53, 59, 0.68)"
                }
                fontSize={["0.6875rem", "0.6875rem", "0.8125rem", "0.8125rem"]}
                lineHeight="1rem"
                mt="0"
              >
                {formik.values.address.length}/{ADDRESS_MAX_LENGTH}
              </FormHelperText>
            </HStack>
          </FormControl>
          <FormControl mt="2rem">
            <HStack>
              <Checkbox
                id="isDefault"
                {...formik.getFieldProps("isDefault")}
                colorScheme="teal"
                size={["md", "md", "lg", "lg"]}
              />
              <Text
                fontSize={["0.8125rem", "0.8125rem", "0.9375rem", "0.9375rem"]}
              >
                Jadikan alamat utama
              </Text>
            </HStack>
          </FormControl>
          <Text
            fontSize={["0.625rem", "0.625rem", "0.75rem", "0.75rem"]}
            lineHeight="1.125rem"
            mt="1.5rem"
            mb="0.75rem"
            textAlign="center"
          >
            Dengan klik "Simpan", kamu menyetujui{" "}
            <Link color="teal" fontWeight="700" textDecoration="none">
              Syarat & Ketentuan.
            </Link>
          </Text>
          <Box textAlign="center" my="1rem">
            <Button
              borderRadius="0.5rem"
              colorScheme="teal"
              fontWeight="bold"
              fontSize={["0.75rem", "0.875rem", "1rem", "1rem"]}
              height={["2.5rem", "2.75rem", "3rem", "3rem"]}
              isLoading={isLoading}
              lineHeight="1.375rem"
              onClick={formik.handleSubmit}
              px="1rem"
            >
              Simpan
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddressForm;
