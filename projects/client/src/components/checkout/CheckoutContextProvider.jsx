import { createContext } from "react";

// Own library imports
import useSelectAddress from "../../lib/checkout/hooks/useSelectAddress";
import useGetShippingCost from "../../lib/checkout/hooks/useGetShippingCost";
import useGetCartItems from "../../lib/checkout/hooks/useGetCartItems";

export const CheckoutContext = createContext(null);

export const CheckoutContextProvider = ({ children }) => {
  // Address
  const {
    shippingAddress,
    addresses,
    isLoading,
    noAddressFound,
    displayNoAddressFound,
    setShippingAddress,
    setAddresses,
    setNoAddressFound,
    setDisplayNoAddressFound,
  } = useSelectAddress();

  // Items
  const { cartItems, totalWeight, totalQuantity, totalPrice, setTotalPrice } =
    useGetCartItems();

  // Shipping
  const {
    isFetchingCourier,
    shippingOptions,
    shippingServices,
    selectedCourier,
    selectedCourierName,
    serviceType,
    shippingCost,
    sortedWarehouse,
    displayServiceButton,
    isReloading,
    subtotal,
    setSelectedCourier,
    setIsFetchingCourier,
    setServiceType,
    setIsReloading,
  } = useGetShippingCost(shippingAddress, totalWeight, totalPrice);

  const value = {
    address: {
      shippingAddress,
      addresses,
      isLoading,
      noAddressFound,
      displayNoAddressFound,
      setShippingAddress,
      setAddresses,
      setNoAddressFound,
      setDisplayNoAddressFound,
    },
    items: {
      cartItems,
      totalWeight,
      totalQuantity,
      totalPrice,
      setTotalPrice,
    },
    shipping: {
      isFetchingCourier,
      shippingOptions,
      shippingServices,
      selectedCourier,
      selectedCourierName,
      serviceType,
      shippingCost,
      sortedWarehouse,
      displayServiceButton,
      isReloading,
      subtotal,
      setSelectedCourier,
      setIsFetchingCourier,
      setServiceType,
      setIsReloading,
    },
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
