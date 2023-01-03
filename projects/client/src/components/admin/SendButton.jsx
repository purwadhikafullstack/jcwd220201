import { Button, useToast } from "@chakra-ui/react";
import sendOrder from "../../lib/admin/sendOrder";

const SendButton = ({ id }) => {
  // Alert functionality
  const toast = useToast();

  return (
    <Button
      borderRadius="0.5rem"
      colorScheme="teal"
      fontWeight="bold"
      fontSize={["0.6875rem", "0.875rem"]}
      height={["2.0352rem", "2.375rem"]}
      onClick={async () => {
        const res = await sendOrder(id);

        toast({
          title: res.data.message,
          status: res.status === 200 ? "success" : "error",
        });
      }}
      px="1rem"
      width={["100%", "100%", "auto", "auto"]}
    >
      Kirim Pesanan
    </Button>
  );
};

export default SendButton;
