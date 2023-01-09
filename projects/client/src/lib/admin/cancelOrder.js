import { axiosInstance } from "../../api";

const cancelOrder = async (id, warehouseId) => {
  try {
    const response = await axiosInstance.post("/admin/cancel", {
      id,
      warehouseId,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export default cancelOrder;
