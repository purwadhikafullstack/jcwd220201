import { axiosInstance } from "../../api/index";

const requestOtp = async (email) => {
  try {
    const response = await axiosInstance.post("/register/otp", {
      email,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export default requestOtp;
