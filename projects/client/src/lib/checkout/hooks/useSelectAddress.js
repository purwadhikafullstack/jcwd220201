import { useEffect, useState } from "react";

// Own library imports
import fetchAddresses from "../fetchAddresses";

const useSelectAddress = () => {
  const [shippingAddress, setShippingAddress] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAddresses()
      .then((res) => {
        if (!shippingAddress) {
          setShippingAddress(res.data.selectedAddress);
        }
        setAddresses(res.data.addresses);
      })
      .then(() => setIsLoading(false));
  }, []);

  return {
    shippingAddress,
    addresses,
    isLoading,
    setShippingAddress,
    setAddresses,
  };
};

export default useSelectAddress;
