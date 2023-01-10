import { Flex } from "@chakra-ui/react";
import { createContext, useState } from "react";

// Own component imports
import FinishRegistrationForm from "../components/register/FinishRegistrationForm";
import Footer from "../components/register/Footer";
import HeroArea from "../components/register/HeroArea";
import Logo from "../components/register/Logo";
import RegisterForm from "../components/register/RegisterForm";
import Verify from "../components/register/Verify";

// Own library imports

const Register = () => {
  const UserContext = createContext();

  const [email, setEmail] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  return !verifying ? (
    <UserContext.Provider
      value={{
        email,
        submit: (input) => {
          setEmail(input);
          setVerifying(true);
        },
      }}
    >
      <Flex direction="column" align="center">
        <Logo />
        <Flex pt="3.125rem" align="center">
          <HeroArea />
          {isRegistered ? (
            <FinishRegistrationForm props={{ UserContext }} />
          ) : (
            <RegisterForm props={{ UserContext }} />
          )}
        </Flex>
        <Footer />
      </Flex>
    </UserContext.Provider>
  ) : (
    <UserContext.Provider
      value={{
        email,
        submit: () => {
          setIsRegistered(true);
          setVerifying(false);
        },
      }}
    >
      <Verify props={{ UserContext }} />
    </UserContext.Provider>
  );
};

export default Register;
