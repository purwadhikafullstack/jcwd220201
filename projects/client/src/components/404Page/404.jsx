import { Button, Heading, Text, Box } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
      <Box textAlign="center" py="20" px="6">
        <Heading
          display="inline-block"
          size="4xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt="3" mb="2" fontWeight="semibold">
          Page Not Found
        </Text>
        <Text color="gray.500" mb="6">
          We're sorry, the page you requested could not be found
          <br />
          Please go back to the homepage.
        </Text>
        <Link to="/">
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
          >
            Go Home
          </Button>
        </Link>
      </Box>
    </>
  )
}

export default NotFound
