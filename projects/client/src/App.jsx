// import "./styles/globals.css"
import "./App.css"
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
import CartPage from "./pages/CartPage"
import AdminRoute from "./components/AdminRoute"
import Address from "./pages/Address"
import ForgotPassword from "./pages/ForgotPassword"
import RecoverPassword from "./pages/RecoverPassword"
import ManageUser from "./pages/admin/manageUser"

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
        <Route
          path="/"
          element={
            <AdminRoute>
              <Navbar />
            </AdminRoute>
          }
        >
          <Route index element={<MainContent />} />
          <Route index element={<Footer />} />
        </Route>

        {/* Cart Page */}
        <Route path="/cart" element={<CartPage />} />

        {/* Product List */}
        <Route path="/product" element={<ProductList />} />

        {/* Product Detail */}
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
        <Route
          path="/forgot-password"
          element={
            <GeneralRoute>
              <ForgotPassword />
            </GeneralRoute>
          }
        />
        <Route path="/recover-password/:token" element={<RecoverPassword />} />

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
        <Route
          path="/admin/user"
          element={
            <ProtectedRoute>
              <ManageUser />
            </ProtectedRoute>
          }
        />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />

        {/* Address Route */}
        <Route path="/address" element={<Address />} />
      </Routes>
    </>
  )
}

export default App
