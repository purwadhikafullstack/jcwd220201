import { ListItem } from "@chakra-ui/react";
import { IDR } from "../currency/Rupiah";

const renderShippingServices = (
  shippingServices,
  setServiceType,
  setDisplayService,
  setIsServiceSelected
) => {
  return shippingServices.costs.map((service, index) => {
    return (
      <ListItem
        cursor="pointer"
        fontWeight="600"
        key={index}
        onMouseDown={() => {
          setServiceType({ code: shippingServices.code, service });
          setDisplayService(false);
          setIsServiceSelected(true);
        }}
        px="1rem"
        py="0.875rem"
        value={service}
        _hover={{ backgroundColor: "rgba(62, 191, 184, 0.14)" }}
      >
        {`${service["service"]} (${IDR(service["cost"][0]["value"])})`}
      </ListItem>
    );
  });
};

export default renderShippingServices;
