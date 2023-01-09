import { axiosInstance } from "../../api";

const sendOrder = async (id) => {
  try {
    const response = await axiosInstance.patch("/admin/send", {
      id,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export default sendOrder;
