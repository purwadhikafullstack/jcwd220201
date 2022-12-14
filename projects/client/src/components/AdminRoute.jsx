import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

const AdminRoute = ({ children }) => {
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()

  if (authSelector.RoleId === 1) {
    navigate("/admin/dashboard")
  }
  return children
}

export default AdminRoute
