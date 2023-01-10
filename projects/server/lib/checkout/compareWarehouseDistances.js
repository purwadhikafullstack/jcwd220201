const haversine = require("haversine");

const compareWarehouseDistances = (
  shippingAddressCoordinates,
  warehousesInfo
) => {
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
