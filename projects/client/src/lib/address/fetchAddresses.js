import { axiosInstance } from "../../api";

const fetchAddresses = async (pageIndex = 0, input) => {
  try {
    const page = pageIndex + 1;
    const query = input ? input : "";
    const encodedQuery = encodeURI(query);

    const response = await axiosInstance.get(
      `/api/address?page=${page}&search=${encodedQuery}`
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export default fetchAddresses;
