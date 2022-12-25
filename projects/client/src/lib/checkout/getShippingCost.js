import { axiosInstance } from "../../api";

const getShippingCost = async (origin, destination, weight, courier) => {
  try {
    const response = await axiosInstance.post("/api/checkout/shipping_method", {
      origin,
      destination,
      weight,
      courier,
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export default getShippingCost;
