import { axiosInstance } from "../../api/index";

const registerEmail = async (email) => {
  try {
    const response = await axiosInstance.post("/register", {
      email,
    });

    return response;
  } catch (err) {
    return err.response;
  }
};

export default registerEmail;
