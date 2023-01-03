import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Own library imports
import fetchCartItems from "../fetchCartItems";
import getTotalPrice from "../getTotalPrice";
import getTotalQuantity from "../getTotalQuantity";
import getTotalWeight from "../getTotalWeight";

const useGetCartItems = () => {
  const [cartItems, setCartItems] = useState(null);
  const [totalWeight, setTotalWeight] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems().then((res) => {
      if (res.status === 400) {
        toast({
          title: res.data.message,
          status: "success",
          description: res.data.description,
        });

        navigate("/");
        return;
      }

      setCartItems(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (!cartItems) {
      return;
    }

    getTotalWeight(cartItems, setTotalWeight);
    getTotalQuantity(cartItems, setTotalQuantity);
    getTotalPrice(cartItems, setTotalPrice);
  }, [cartItems]);

  return { cartItems, totalWeight, totalQuantity, totalPrice, setTotalPrice };
};

export default useGetCartItems;
