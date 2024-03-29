import { axiosInstance } from "../../api";

const selectAddress = async (id) => {
  try {
    const response = await axiosInstance.patch(`/checkout/address`, {
      id,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export default selectAddress;
