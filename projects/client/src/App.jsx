import "./App.css"
import { useEffect, useState } from "react"
import { login, logout } from "./redux/features/authSlice"
import LoginPage from "./pages/Login"
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"
import { axiosInstance } from "./api"
import EditProfile from "./pages/EditProfile"

const App = () => {
  const [authCheck, setAuthCheck] = useState(false)

  const dispatch = useDispatch()

  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosInstance.get("/auth/refresh-token")

      dispatch(login(response.data.data))
      localStorage.setItem("auth_token", response.data.token)
      setAuthCheck(true)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    }
  }

  useEffect(() => {
    keepUserLoggedIn()
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<EditProfile />} />
    </Routes>
  )
}

=======
import Navbar from "./pages/layout/Navbar"
import MainContent from "./pages/layout/MainContent"
import Footer from "./pages/layout/Footer"
import Dashboard from "./pages/admin/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import GuestRoute from "./components/GuestRoute"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"
import { axiosInstance } from "./api"

const App = () => {
  const [authCheck, setAuthCheck] = useState(false)

  const authSelector = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // const keepUserLoggedIn = async () => {
  //   try {
  //     const auth_token = localStorage.getItem("auth_token")

  //     if (!auth_token) {
  //       setAuthCheck(true)
  //       return
  //     }

  //     const response = await axiosInstance.get("/auth/refresh-token")

  //     dispatch(login(response.data.data))
  //     localStorage.setItem("auth_token", response.data.token)
  //     setAuthCheck(true)
  //   } catch (err) {
  //     console.log(err)
  //     setAuthCheck(true)
  //   }
  // }

  // useEffect(() => {
  //   keepUserLoggedIn()
  // }, [])

  return (
    <>
      {/*  */}
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<MainContent />} />
          <Route index element={<Footer />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

>>>>>>> a24ae4fbf4f48d3f33fa17b6ca7d666196b2410e
export default App
