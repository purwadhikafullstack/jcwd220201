const haversine = require("haversine");

const compareWarehouseDistances = (
  shippingAddressCoordinates,
  warehousesInfo
) => {
  // const nearestWarehouse = warehousesInfo.reduce(
  //   (accumulator, currentValue) => {
  //     // Format warehouses coordinates
  //     const accumulatorCoordinates = JSON.parse(accumulator.coordinates);
  //     const prevWarehouseCoordinates = {
  //       latitude: accumulatorCoordinates.lat,
  //       longitude: accumulatorCoordinates.lng,
  //     };

  //     const currentValueCoordinates = JSON.parse(currentValue.coordinates);
  //     const currWarehouseCoordinates = {
  //       latitude: currentValueCoordinates.lat,
  //       longitude: currentValueCoordinates.lng,
  //     };

  //     // Compare distances between shipping address and warehouses location
  //     const distanceToPrevWarehouse = haversine(
  //       shippingAddressCoordinates,
  //       prevWarehouseCoordinates
  //     );

  //     const distanceToCurrWarehouse = haversine(
  //       shippingAddressCoordinates,
  //       currWarehouseCoordinates
  //     );

  //     if (distanceToCurrWarehouse > distanceToPrevWarehouse) {
  //       return accumulator;
  //     }

  //     return currentValue;
  //   }
  // );

  // return nearestWarehouse;

  // Format warehouses coordinates
  const warehousesLocationDetails = warehousesInfo.map((warehouse) => {
    const warehouseCoordinates = JSON.parse(warehouse.coordinates);

    const formattedWarehouseCoordinates = {
      latitude: warehouseCoordinates.lat,
      longitude: warehouseCoordinates.lng,
    };

    const distanceToShippingAddress = haversine(
      shippingAddressCoordinates,
      formattedWarehouseCoordinates
    );

    return { warehouseInfo: warehouse, distanceToShippingAddress };
  });

  // Sort warehouse by distance to shipping address
  const sortedWarehouses = warehousesLocationDetails.sort((a, b) => {
    if (a.distanceToShippingAddress < b.distanceToShippingAddress) {
      return -1;
    }

    if (a.distanceToShippingAddress > b.distanceToShippingAddress) {
      return 1;
    }

    return 0;
  });

  return sortedWarehouses;
};

module.exports = compareWarehouseDistances;
