import { Button } from "@chakra-ui/react"

const PageButton = ({ id, onClick }) => {
  return (
    <>
      <Button
        key={id}
        onClick={onClick}
        color="white"
        bg="#008deb"
        _focus={{ bg: "#005e9d" }}
      >
        {id}
      </Button>
    </>
  )
}

export default PageButton
