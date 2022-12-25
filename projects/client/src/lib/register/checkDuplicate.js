import { axiosInstance } from "../../api/index";

const checkDuplicate = async (email) => {
  try {
    const response = await axiosInstance.post("/api/register/duplicate", {
      email,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export default checkDuplicate;
