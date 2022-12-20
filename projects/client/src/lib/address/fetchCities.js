import { axiosInstance } from "../../api";

const fetchCities = async () => {
  try {
    const response = await axiosInstance.get("/cities");
    return response;
  } catch (err) {
    return err.response;
  }
};

export default fetchCities;
