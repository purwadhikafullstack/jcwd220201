import { Input, UnorderedList } from "@chakra-ui/react";
import { useState, useEffect } from "react";

// Own library imports
import fetchCities from "../../lib/address/fetchCities";
import renderFilteredCities from "../../lib/address/renderFilteredCities";

const CitiesInput = ({ formik, error }) => {
  // Store cities data
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState(cities);

  // Suggestions functionality
  const [displaySuggestion, setDisplaySuggestion] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // Fetch cities data
  useEffect(() => {
    fetchCities().then((res) => {
      setCities(res.data.data);
    });
  }, []);

  // Filter city options based on user input
  useEffect(() => {
    if (formik.values.city && !isSelected) {
      const filteredOptions = cities.filter((city) => {
        const cityName = `${city.type} ${city.city_name}`.toLowerCase();
        return cityName.includes(formik.values.city.toLowerCase().trim());
      });

      setFilteredCities(filteredOptions);
      setDisplaySuggestion(true);
      return;
    }

    setIsSelected(false);
    setDisplaySuggestion(false);
  }, [formik.values.city]);

  return (
    <>
      <Input
        id="city"
        type="text"
        {...formik.getFieldProps("city")}
        focusBorderColor={error ? "rgb(230, 68, 68)" : "rgb(49, 151, 149)"}
        fontSize={["0.75rem", "0.75rem", "0.875rem", "0.875rem"]}
      ></Input>
      {displaySuggestion ? (
        <UnorderedList
          border={
            filteredCities.length ? "1px solid rgb(226, 232, 240)" : "none"
          }
          borderRadius="0.375rem"
          maxH="8.25rem"
          listStyleType="none"
          ml="0"
          mt="7px"
          overflowY="scroll"
        >
          {renderFilteredCities(
            filteredCities,
            formik.setFieldValue,
            setDisplaySuggestion,
            setIsSelected
          )}
        </UnorderedList>
      ) : null}
    </>
  );
};

export default CitiesInput;
