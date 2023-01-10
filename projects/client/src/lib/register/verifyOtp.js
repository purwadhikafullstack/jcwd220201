import { axiosInstance } from "../../api/index";

const verifyOtp = async (email, otp, toast, submit) => {
  try {
    const response = await axiosInstance.post("/api/register/verify", {
      email,
      otp,
    });

    submit();
  } catch (err) {
    toast({
      title: err.response.data.message,
      status: "error",
    });
  }
};

export default verifyOtp;
