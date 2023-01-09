const { axiosInstance } = require("./api")

const getWarehousesInfo = async () => {
  // Get warehouses data
  const {
    data: { data: warehousesData },
  } = await axiosInstance.get("/warehouses")

  // Get cities data
  const {
    data: { data: citiesData },
  } = await axiosInstance.get("/cities")

  // Get location details of every warehouse
  const warehouseDetails = warehousesData.map((warehouse) => {
    const splitterIndex = warehouse.city.indexOf(" ")
    const type = warehouse.city.substring(0, splitterIndex)
    const cityName = warehouse.city.slice(splitterIndex + 1)

    return {
      id: warehouse.id,
      type,
      cityName,
      coordinates: warehouse.pinpoint,
    }
  })

  // Get additional location info
  const warehousesInfo = []

  warehouseDetails.forEach((warehouse) => {
    const result = citiesData.find((city) => {
      return (
        city.type.toLowerCase() === warehouse.type.toLowerCase() &&
        city.city_name.toLowerCase() === warehouse.cityName.toLowerCase()
      )
    })

    result.id = warehouse.id
    result.coordinates = warehouse.coordinates
    warehousesInfo.push(result)
  })

  return warehousesInfo
}
module.exports = getWarehousesInfo
