import "./App.css"
import { useEffect, useState } from "react"
import { login, logout } from "./redux/features/authSlice"
import LoginPage from "./pages/Login"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"
import { axiosInstance } from "./api"

const App = () => {
  const [authCheck, setAuthCheck] = useState(false)

  const authSelector = useSelector((state) => state.auth)
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
    <>
      {/*  */}
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<MainContent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route index element={<Footer />} />
        </Route>
      </Routes>
    </>

  )
}

export default App
