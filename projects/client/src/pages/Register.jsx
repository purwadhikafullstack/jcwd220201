import { Flex } from "@chakra-ui/react";
import FinishRegistrationForm from "../components/register/FinishRegistrationForm";
import Footer from "../components/register/Footer";
import HeroArea from "../components/register/HeroArea";
import Logo from "../components/register/Logo";
import RegisterForm from "../components/register/RegisterForm";

const Register = () => {
  return (
    <Flex direction="column" align="center">
      <Logo />
      <Flex pt="3.125rem" align="center">
        <HeroArea />
        <RegisterForm />
        {/* <FinishRegistrationForm /> */}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Register;
