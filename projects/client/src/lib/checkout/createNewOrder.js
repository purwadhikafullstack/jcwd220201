import { axiosInstance } from "../../api";

const createNewOrder = async (orderData, cartItems) => {
  try {
    const response = await axiosInstance.post(`/checkout/order`, {
      orderData,
      cartItems,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export default createNewOrder;
