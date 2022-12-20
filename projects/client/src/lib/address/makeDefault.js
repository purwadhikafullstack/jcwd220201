import { axiosInstance } from "../../api";

const makeDefault = async (addressId) => {
  try {
    const response = await axiosInstance.patch(`/api/address/default`, {
      addressId,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export default makeDefault;
