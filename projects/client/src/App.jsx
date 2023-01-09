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
import WarehouseStock from "./pages/admin/Stock/WarehouseStock"
import Stock from "./pages/admin/Stock/Stock"
import ForgotPassword from "./pages/ForgotPassword"
import RecoverPassword from "./pages/RecoverPassword"
import ManageUser from "./pages/admin/manageUser"
import EditPassword from "./components/profile/EditPassword"
import SalesReport from "./pages/admin/salesReport"
import Checkout from "./pages/Checkout"
import UserOrder from "./pages/admin/User Order/UserOrder"
import Transactions from "./pages/Transactions"
import LoggedInRoute from "./components/LoggedInRoute"

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

          {/* Product Detail Page */}
          <Route
            path="/product-detail/:id/:product_name"
            element={<ProductDetail />}
          />
        </Route>

        {/* Cart Page */}
        <Route
          path="/cart"
          element={
            <GeneralRoute>
              <CartPage />
            </GeneralRoute>
          }
        />

        {/* Product List */}
        <Route path="/product" element={<ProductList />} />

        {/* Product Detail */}
        {/* <Route
          path="/product-detail/:id/:product_name"
          element={<ProductDetail />}
        /> */}

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
          path="/profile/change-password"
          element={
            <GeneralRoute>
              <EditPassword />
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
        {/* Admin Manage Stock */}
        <Route
          path={authSelector.RoleId === 1 ? "/admin/manage-stock" : null}
          element={
            <ProtectedRoute>
              <Stock />
            </ProtectedRoute>
          }
        />
        <Route
          path={
            authSelector.RoleId === 2
              ? "/admin/manage-stock"
              : "/admin/manage-stock/:id"
          }
          element={
            <ProtectedRoute>
              <WarehouseStock />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/all-order"
          element={
            <ProtectedRoute>
              <UserOrder />
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

        <Route
          path="/admin/sales-report"
          element={
            <ProtectedRoute>
              <SalesReport />
            </ProtectedRoute>
          }
        />

        {/* Register Route */}
        <Route
          path="/register"
          element={
            <LoggedInRoute>
              <Register />
            </LoggedInRoute>
          }
        />

        {/* Address Route */}
        <Route
          path="/address"
          element={
            <GeneralRoute>
              <Address />
            </GeneralRoute>
          }
        />

        {/* Checkout Route */}
        <Route
          path="/cart/shipment"
          element={
            <GeneralRoute>
              <Checkout />
            </GeneralRoute>
          }
        />

        {/* Transactions Route */}
        <Route
          path="/transactions"
          element={
            <GeneralRoute>
              <Transactions />
            </GeneralRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
