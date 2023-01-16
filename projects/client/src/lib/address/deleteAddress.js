import { axiosInstance } from "../../api";

const deleteAddress = async (addressId) => {
  try {
    const response = await axiosInstance.delete(`/address/${addressId}`);
    return response;
  } catch (err) {
    return err.response;
  }
};

export default deleteAddress;
