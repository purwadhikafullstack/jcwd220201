import { axiosInstance } from "../../api";

const fetchCouriers = async () => {
  try {
    const response = await axiosInstance.get(`/api/checkout/couriers`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export default fetchCouriers;
