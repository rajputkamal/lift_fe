export const calculatePrice = (
  originCoords,
  destinationCoords,
  vehicleType // "bike" | "car" | "suv"
) => {
  const { latitude: lat1, longitude: lon1 } = originCoords;
  const { latitude: lat2, longitude: lon2 } = destinationCoords;

  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // ₹ per km pricing (ride-sharing, not taxi)
  const rateMap = {
    bike: { min: 2, max: 3 },
    car: { min: 4, max: 6 },
    suv: { min: 6, max: 8 },
  };

  const rates = rateMap[vehicleType] || rateMap.car;

  const minPrice = Math.round(distance * rates.min);
  const maxPrice = Math.round(distance * rates.max);

  return {
    distance: Number(distance.toFixed(2)),
    priceRange: {
      min: minPrice,
      max: maxPrice,
    },
  };
};
