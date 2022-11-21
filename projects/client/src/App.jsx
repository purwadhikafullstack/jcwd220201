<<<<<<< HEAD
import "./App.css";
import { useEffect, useState } from "react";
import { login, logout } from "./redux/features/authSlice";
import LoginPage from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { axiosInstance } from "./api";

const App = () => {
  const [authCheck, setAuthCheck] = useState(false);

  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token");

      if (!auth_token) {
        setAuthCheck(true);
        return;
      }

      const response = await axiosInstance.get("/auth/refresh-token");

      dispatch(login(response.data.data));
      localStorage.setItem("auth_token", response.data.token);
      setAuthCheck(true);
    } catch (err) {
      console.log(err);
      setAuthCheck(true);
    }
  };

  useEffect(() => {
    keepUserLoggedIn();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
=======
import axios from "axios"
import "./styles/globals.css"
import { useEffect, useState } from "react"
import Navbar from "./pages/layout/Navbar"
import MainContent from "./pages/layout/MainContent"
import Footer from "./pages/layout/Footer"
import { Route, Routes } from "react-router-dom"

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      )
      setMessage(data?.message || "")
    })()
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<MainContent />} />
          <Route index element={<Footer />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
>>>>>>> 11d3666493f184850b85fd914f8b244bc382f1e2
