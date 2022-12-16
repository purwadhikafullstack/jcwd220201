import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const GuestRoute = ({ children }) => {
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()

  if (authSelector.RoleId === 1 || authSelector.RoleId === 2) {
    navigate("/admin/dashboard")
  } else {
    navigate(-1)
  }
  return children
}

export default GuestRoute
