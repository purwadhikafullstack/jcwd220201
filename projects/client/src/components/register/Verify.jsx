import {
  Box,
  Flex,
  HStack,
  Link,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import Timer from "./Timer";
import { MdOutlineMail } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";

// Own library imports
import requestOtp from "../../lib/register/requestOtp";
import verifyOtp from "../../lib/register/verifyOtp";

const Verify = ({ props: { UserContext } }) => {
  // Get user context
  const { email, submit } = useContext(UserContext);

  // Form functionality
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
  });

  // Disable re-send OTP functionality
  const [isBeingSent, setIsBeingSent] = useState(false);

  // Alert functionality
  const toast = useToast();

  // Validate OTP
  const maxLength = 6;

  useEffect(() => {
    if (formik.values.otp.length === maxLength) {
      verifyOtp(email, formik.values.otp, toast, submit);
    }
  }, [formik.values.otp]);

  return (
    <Flex direction="column" align="center" maxW="100%">
      <Text
        p="1rem"
        width="100%"
        color="white"
        backgroundColor="teal"
        fontSize="1.125rem"
        fontWeight="500"
        lineHeight="1.2937rem"
        textAlign="center"
        mb="2rem"
      >
        Verifikasi
      </Text>
      <Box mb="0.9375rem">
        <MdOutlineMail size="2.75rem" color="teal" />
      </Box>
      <Text as="b" fontSize="1rem" color="rgb(49, 53, 59)" mb="0.625rem">
        Masukkan Kode Verifikasi
      </Text>
      <Text
        width="27.259rem"
        maxW="100%"
        textAlign="center"
        mb="1.5625rem"
        fontSize="0.875rem"
        lineHeight="1.3125rem"
        overflowWrap="break-word"
      >
        Kode verifikasi telah dikirim melalui e-mail ke {email}
      </Text>
      <HStack mb="2rem">
        <PinInput
          id="otp"
          name="otp"
          type="number"
          value={formik.values.otp}
          otp={true}
          onChange={(e) => {
            formik.setFieldValue("otp", e);
          }}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      {isBeingSent ? (
        <Timer seconds={30} callback={setIsBeingSent} />
      ) : (
        <Text color="rgb(82, 86, 94)" fontSize="0.75rem">
          Tidak menerima kode?{" "}
          <Link
            color="teal"
            fontWeight="600"
            onClick={async () => {
              setIsBeingSent(true);
              await requestOtp(email);
            }}
          >
            Kirim ulang
          </Link>
        </Text>
      )}
    </Flex>
  );
};

export default Verify;
