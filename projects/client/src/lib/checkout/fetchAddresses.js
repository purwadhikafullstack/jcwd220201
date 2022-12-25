import { axiosInstance } from "../../api";

const fetchAddresses = async () => {
  try {
    const response = await axiosInstance.get(`/api/checkout`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export default fetchAddresses;
