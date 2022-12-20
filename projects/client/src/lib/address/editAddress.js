import { axiosInstance } from "../../api";

const editAddress = async (body) => {
  try {
    const response = await axiosInstance.patch("/api/address", body);
    return response;
  } catch (err) {
    return err.response;
  }
};

export default editAddress;
