import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()

  if (authSelector.role_id === 3 || !authSelector.role_id) {
    navigate("/404")
  }
  return children
}

export default ProtectedRoute
