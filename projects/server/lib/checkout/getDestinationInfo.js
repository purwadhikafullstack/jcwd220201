const { axiosInstance } = require("./api");

const getDestinationInfo = async (destinationAddress) => {
  // Get cities data
  const {
    data: { data: citiesData },
  } = await axiosInstance.get("/cities");

  // Get location details of destination address
  const splitterIndex = destinationAddress.city.indexOf(" ");
  const type = destinationAddress.city.substring(0, splitterIndex);
  const cityName = destinationAddress.city.slice(splitterIndex + 1);

  const destinationDetails = { type, cityName };

  // Get additional location info
  const destinationInfo = citiesData.find((city) => {
    return (
      city.type.toLowerCase() === destinationDetails.type.toLowerCase() &&
      city.city_name.toLowerCase() === destinationDetails.cityName.toLowerCase()
    );
  });

  return destinationInfo;
};
module.exports = getDestinationInfo;
