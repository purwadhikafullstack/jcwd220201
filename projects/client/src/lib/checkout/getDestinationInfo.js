import { axiosInstance } from "../../api";

const getDestinationInfo = async (destinationAddress) => {
  try {
    const response = await axiosInstance.post(
      `/api/checkout/shipping_address`,
      {
        destinationAddress,
      }
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export default getDestinationInfo;
