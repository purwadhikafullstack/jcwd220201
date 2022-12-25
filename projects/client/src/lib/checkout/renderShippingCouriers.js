import { ListItem } from "@chakra-ui/react";

const renderShippingCouriers = (
  shippingOptions,
  setSelectedCourier,
  setDisplayCourier,
  setIsServiceSelected
) => {
  if (!shippingOptions) {
    return;
  }

  return shippingOptions.map((courier, index) => {
    return (
      <ListItem
        cursor="pointer"
        fontWeight="600"
        key={index}
        onMouseDown={() => {
          setSelectedCourier(courier);
          setDisplayCourier(false);
          setIsServiceSelected(false);
        }}
        px="1rem"
        py="0.875rem"
        value={courier}
        _hover={{ backgroundColor: "rgba(62, 191, 184, 0.14)" }}
      >
        {`${courier.courier_name.toUpperCase()}`}
      </ListItem>
    );
  });
};

export default renderShippingCouriers;
