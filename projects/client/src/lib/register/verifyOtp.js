import { axiosInstance } from "../../api/index";

const verifyOtp = async (email, otp, toast, submit) => {
  try {
    await axiosInstance.post("/api/register/verify", {
      email,
      otp,
    });

    submit();
  } catch (err) {
    toast({
      title: "Kode yang kamu masukkan salah.",
      status: "error",
    });
  }
};

export default verifyOtp;
