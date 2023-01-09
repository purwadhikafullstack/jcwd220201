import { Button } from "@chakra-ui/react"
import cancelUserOrder from "./cancelOrderUser"

const cancelUserButton = () => {
  return (
    <Button
      colorScheme="teal"
      onClick={async () => {
        const response = await cancelUserOrder()

        toast({
          title: response.data.message,
          status: response.status === 200 ? "success" : "error",
        })
      }}
    >
      Batalkan Pesanan
    </Button>
  )
}

export default cancelUserButton
