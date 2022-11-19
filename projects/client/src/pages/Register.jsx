import { Box, Flex, HStack } from "@chakra-ui/react";
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
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Register;
