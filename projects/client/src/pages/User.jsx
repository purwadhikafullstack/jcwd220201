import { Box, Button, Heading } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/authSlice";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate;

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Box>
      <Heading>Hello</Heading>
      <Link to={"/login"}>
        <Button onClick={logoutBtnHandler}>Logout</Button>
      </Link>
      <Link to={"/product"}>products</Link>
      <Link to={"/login"}>login</Link>
    </Box>
  );
};

export default User;
