import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import FinishRegistrationForm from "../components/register/FinishRegistrationForm";
import Footer from "../components/register/Footer";
import HeroArea from "../components/register/HeroArea";
import Logo from "../components/register/Logo";
import RegisterForm from "../components/register/RegisterForm";
import Verify from "./Verify";

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return !isSubmitted ? (
    <Flex direction="column" align="center">
      <Logo />
      <Flex pt="3.125rem" align="center">
        <HeroArea />
        <RegisterForm
          props={{
            submit: (input) => {
              setEmail(input);
              setIsSubmitted(true);
            },
          }}
        />
        {/* <FinishRegistrationForm /> */}
      </Flex>
      <Footer />
    </Flex>
  ) : (
    <Verify props={{ email }} />
  );
};

export default Register;
