import { Image, useMediaQuery } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Logo = () => {
  const [isLargerThanSm] = useMediaQuery("(min-width: 20rem)")
  const [isLargerThanMd] = useMediaQuery("(min-width: 30rem)")

  return (
    <Link to="/">
      <Image
        src="logo.png"
        alt="logo"
        width={
          isLargerThanMd ? "10rem" : isLargerThanSm ? "8.262rem" : "6.826rem"
        }
        maxW="100%"
        py="1.25rem"
      />
    </Link>
  )
}

export default Logo
