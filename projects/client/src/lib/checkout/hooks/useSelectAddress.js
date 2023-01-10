import { useEffect, useState } from "react";

// Own library imports
import fetchAddresses from "../fetchAddresses";

const useSelectAddress = () => {
  const [shippingAddress, setShippingAddress] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [noAddressFound, setNoAddressFound] = useState(true);
  const [displayNoAddressFound, setDisplayNoAddressFound] = useState(false);

  // Get available addresses
  useEffect(() => {
    fetchAddresses().then((res) => {
      const { selectedAddress, addresses } = res.data;
      if (!selectedAddress && !addresses.length) {
        setDisplayNoAddressFound(true);
        return;
      }

      setShippingAddress(selectedAddress);
      setAddresses(addresses);
    });
  }, []);

  // Display address component
  useEffect(() => {
    if (shippingAddress && addresses.length) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
  }, [shippingAddress, addresses]);

  return {
    shippingAddress,
    addresses,
    isLoading,
    displayNoAddressFound,
    setShippingAddress,
    setAddresses,
    setDisplayNoAddressFound,
  };
};

export default useSelectAddress;
