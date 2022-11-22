import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const authSelector = useSelector((state) => state.auth)

  if (!authSelector.id) {
    return <Navigate replace to="/login" />
  } else if (authSelector.role_id === 1) {
    return <Navigate to="/dashboard" />
  }
  return children
}

export default ProtectedRoute
