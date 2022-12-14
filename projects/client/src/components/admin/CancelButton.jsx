import { Button, useToast } from "@chakra-ui/react";
import cancelOrder from "../../lib/admin/cancelOrder";

const CancelButton = ({ id, warehouseId }) => {
  const toast = useToast();
  return (
    <Button
      borderRadius="0.5rem"
      colorScheme="red"
      fontWeight="bold"
      fontSize={["0.6875rem", "0.875rem"]}
      height={["2.0352rem", "2.375rem"]}
      onClick={async () => {
        const res = await cancelOrder(id, warehouseId);

        toast({
          title: res.data.message,
          status: res.status === 200 ? "success" : "error",
        });
      }}
      px="1rem"
      width={["100%", "100%", "auto", "auto"]}
    >
      Batalkan Pesanan
    </Button>
  );
};

export default CancelButton;
