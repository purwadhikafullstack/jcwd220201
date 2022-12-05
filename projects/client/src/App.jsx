// import "./styles/globals.css"
import { useEffect, useState } from "react"
import { login, logout } from "./redux/features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"
import { axiosInstance } from "./api"
import LoginPage from "./pages/Login"
import EditProfile from "./pages/EditProfile"
import Navbar from "./pages/layout/Navbar"
import MainContent from "./pages/layout/MainContent"
import Footer from "./pages/layout/Footer"
import ProtectedRoute from "./components/ProtectedRoute"
import GuestRoute from "./components/GuestRoute"
import NotFound from "./components/404Page/404"
import AdminHome from "./pages/admin/home.jsx"
import ManageWarehouseData from "./pages/admin/warehouseData.jsx"
import GeneralRoute from "./components/GeneralRoute"
import ProductList from "./pages/products/ProductList"
import ProductDetail from "./pages/products/ProductDetail"
import ManageProduct from "./pages/admin/manageProduct.jsx"
import Register from "./pages/Register"

const App = () => {
  const [authCheck, setAuthCheck] = useState(false)

  const authSelector = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const keepUserLogin = async () => {
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
    keepUserLogin()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<MainContent />} />
          <Route index element={<Footer />} />
        </Route>
        <Route path="/product" element={<ProductList />} />

        <Route
          path="/product-detail/:id/:product_name"
          element={<ProductDetail />}
        />
        <Route path="/404" element={<NotFound />} />
        <Route
          path="/profile"
          element={
            <GeneralRoute>
              <EditProfile />
            </GeneralRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/warehouseData"
          element={
            <ProtectedRoute>
              <ManageWarehouseData />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product"
          element={
            <ProtectedRoute>
              <ManageProduct />
            </ProtectedRoute>
          }
        />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
