import { useEffect, useState } from "react";

// Own library imports
import fetchCouriers from "../fetchCouriers";
import sortWarehousesByLocation from "../sortWarehousesByLocation";
import getDestinationInfo from "../getDestinationInfo";
import getShippingCost from "../getShippingCost";

const useGetShippingCost = (shippingAddress, totalWeight, totalPrice) => {
  const [sortedWarehouse, setSortedWarehouse] = useState(null);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const [shippingOptions, setShippingOptions] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [selectedCourierName, setSelectedCourierName] = useState(null);
  const [shippingServices, setShippingServices] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [shippingCost, setShippingCost] = useState(null);
  const [displayServiceButton, setDisplayServiceButton] = useState(false);
  const [isFetchingCourier, setIsFetchingCourier] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [subtotal, setSubtotal] = useState(null);

  // Get courier list
  useEffect(() => {
    fetchCouriers().then((res) => setShippingOptions(res.data));
  }, []);

  // Get shipping address information
  useEffect(() => {
    if (!shippingAddress) {
      return;
    }

    sortWarehousesByLocation().then((res) => setSortedWarehouse(res.data));
    getDestinationInfo(shippingAddress).then((res) =>
      setDestinationInfo(res.data)
    );
  }, [shippingAddress]);

  // Refresh shipping method if address changes
  useEffect(() => {
    if (!destinationInfo || !shippingServices) {
      setIsReloading(false);
      return;
    }

    setSubtotal(null);
    setSelectedCourier(null);
    setSelectedCourierName(null);
    setShippingServices(null);
    setServiceType(null);
    setShippingCost(null);
    setIsReloading(false);
  }, [destinationInfo]);

  // Get courier service information
  useEffect(() => {
    if (!selectedCourier) {
      return;
    }

    // Display loading animation
    setIsFetchingCourier(true);

    getShippingCost(
      sortedWarehouse.nearestWarehouse.warehouseInfo.city_id,
      destinationInfo.city_id,
      totalWeight,
      selectedCourier.courier_name
    ).then((res) => {
      setShippingServices(res.data);
      setSelectedCourierName(res.data.name);
      setDisplayServiceButton(true);
      setIsFetchingCourier(false);
    });
  }, [selectedCourier]);

  // Get shipping cost
  useEffect(() => {
    if (!serviceType) {
      return;
    }

    setShippingCost(serviceType["service"]["cost"][0]["value"]);
  }, [serviceType]);

  // Set subtotal
  useEffect(() => {
    if (!shippingCost) {
      return;
    }

    setSubtotal(totalPrice + shippingCost);
  }, [shippingCost]);

  return {
    isFetchingCourier,
    shippingOptions,
    shippingServices,
    selectedCourier,
    selectedCourierName,
    serviceType,
    shippingCost,
    sortedWarehouse,
    displayServiceButton,
    isReloading,
    subtotal,
    setSelectedCourier,
    setIsFetchingCourier,
    setServiceType,
    setDisplayServiceButton,
    setIsReloading,
  };
};

export default useGetShippingCost;
