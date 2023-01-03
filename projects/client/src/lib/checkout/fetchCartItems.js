import { axiosInstance } from "../../api";

const fetchCartItems = async () => {
  try {
    const response = await axiosInstance.get(`/api/checkout/cart`);
    return response;
  } catch (err) {
    return err.response;
  }
};

export default fetchCartItems;
