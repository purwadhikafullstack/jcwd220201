import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const GeneralRoute = ({ children }) => {
  const authSelector = useSelector((state) => state.auth)
  const navigate = useNavigate()

  if (!authSelector.RoleId) {
    navigate("/login")
  }
  return children
}

export default GeneralRoute
