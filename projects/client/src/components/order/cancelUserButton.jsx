import { Button } from "@chakra-ui/react"
import cancelUserOrder from "./cancelOrderUser"

const cancelUserButton = () => {
  return (
    <Button
      colorScheme="teal"
      onClick={async () => {
        const resp = await cancelUserOrder()

        toast({
          title: resp.data.message,
          status: resp.status === 200 ? "success" : "error",
        })
      }}
    >
      Batalkan Pesanan
    </Button>
  )
}

export default cancelUserButton
