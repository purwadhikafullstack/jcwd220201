import { Box, Button, Heading } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { Link, useNavigate, Link as LinkRouterDom } from "react-router-dom"
import { logout } from "../../redux/features/authSlice"

const Dashboard = () => {
  return (
    <Box>
      <Heading>Gak ada apa-apa</Heading>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </Box>
  )
}

export default Dashboard
