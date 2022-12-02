import axiosInstance from "../../api";

const registerEmail = async (email) => {
  try {
    const response = await axiosInstance.post("/api/register", {
      email,
    });

    return response;
  } catch (err) {
    return err.response;
  }
};

export default registerEmail;
