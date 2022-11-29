import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const GuestRoute = ({ children }) => {
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()

  if (authSelector.role_id === 1 || authSelector.role_id === 2) {
    navigate("/admin/dashboard")
  } else {
    navigate("/")
  }
  return children
}

export default GuestRoute
