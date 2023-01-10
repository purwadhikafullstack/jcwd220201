import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const LoggedInRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");

    if (!authToken) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
  }, []);

  return !isLoggedIn ? children : <Navigate to="/" replace={true} />;
};

export default LoggedInRoute;
