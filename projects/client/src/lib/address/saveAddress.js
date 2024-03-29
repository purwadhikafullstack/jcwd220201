import { axiosInstance } from "../../api";

const saveAddress = async (body) => {
  try {
    const response = await axiosInstance.post("/address", body);
    return response;
  } catch (err) {
    return err.response;
  }
};

export default saveAddress;
