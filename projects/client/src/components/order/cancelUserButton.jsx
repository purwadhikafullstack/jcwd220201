import { Button, useToast } from "@chakra-ui/react"
import CancelUserOrder from "./cancelOrderUser"

const CancelUserButton = () => {
  const toast = useToast()
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

export default CancelUserButton
