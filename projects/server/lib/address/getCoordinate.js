const axiosInstance = require("./api");

const getCoordinate = async (postalCode) => {
  // Encode location value for API call
  const encodedLocation = encodeURIComponent(postalCode);

  const locationCategory = "postcode";
  const locationType = "postcode";

  /*
  // Determine location name and type
  const locationDetails = location.split(" ");

  const type = locationDetails[0].toLowerCase();

  const locationType =
    type === "kota" ? "city" : type === "kabupaten" ? "county" : null;

  const locationCategory = "place";

  OpenCage API call
  */

  let {
    data: { results },
  } = await axiosInstance.get(
    `/geocode/v1/json?key=${process.env.OPENCAGE_API_KEY}&q=${encodedLocation}&countrycode=id&no_annotations=1`
  );

  // Filter results
  let filteredResults = results.find((result) => {
    const locationDetails = result.components;
    return (
      locationDetails._category === locationCategory &&
      locationDetails._type === locationType
    );
  });

  // Return null if no matching result
  if (!filteredResults) {
    return null;
  }

  // Return coordinates if match found
  const { lat, lng } = filteredResults.geometry;
  return `${lat}, ${lng}`;
};

module.exports = getCoordinate;
