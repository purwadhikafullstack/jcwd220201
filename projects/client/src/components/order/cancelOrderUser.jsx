import { useParams } from "react-router-dom"
import { axiosInstance } from "../../api"

const CancelUserOrder = async () => {
  const { id } = useParams()
  try {
    const response = await axiosInstance.patch(`/order/cancel/${id}`)
    return response
  } catch (err) {
    console.log(err)
    return err.response
  }
}

export default CancelUserOrder
