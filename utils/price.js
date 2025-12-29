const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const minDistanceForBaseFare = 50; // km

export const calculatePrice = async (
  originCoords,
  destinationCoords,
  vehicleType
) => {
  const origin = `${originCoords.latitude},${originCoords.longitude}`;
  const destination = `${destinationCoords.latitude},${destinationCoords.longitude}`;

  // Fetch route from Google Directions API
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}&mode=driving`
  );
  const data = await res.json();
  if (!data.routes || data.routes.length === 0)
    throw new Error("No route found");

  const distanceInKm = data.routes[0].legs[0].distance.value / 1000;

  // Base fare for all rides
  const baseFareMap = {
    bike: 20,
    car: 50,
  };
  const baseFare = baseFareMap[vehicleType] || 50;

  // Fare slabs based on distance
  const fareSlabs = [
    { maxKm: 10, bike: { min: 4, max: 5 }, car: { min: 6.5, max: 8 } },
    { maxKm: 50, bike: { min: 3.5, max: 4.5 }, car: { min: 5.5, max: 7 } },
    { maxKm: 100, bike: { min: 3, max: 4 }, car: { min: 4.5, max: 6 } },
    {
      maxKm: Infinity,
      bike: { min: 1.5, max: 2.5 },
      car: { min: 1.8, max: 2.5 },
    },
  ];

  // Determine which slab applies
  const slab = fareSlabs.find((s) => distanceInKm <= s.maxKm);
  const rates = slab ? slab[vehicleType] : { min: 1.8, max: 2.5 };

  const minPrice =
    distanceInKm > minDistanceForBaseFare
      ? Math.round(baseFare + distanceInKm * rates.min)
      : Math.round(distanceInKm * rates.min);
  const maxPrice =
    distanceInKm > minDistanceForBaseFare
      ? Math.round(baseFare + distanceInKm * rates.max)
      : Math.round(distanceInKm * rates.max);

  const capacityMap = { bike: 1, car: 4 };
  const capacity = capacityMap[vehicleType] || 4;

  return {
    distance: Number(distanceInKm.toFixed(2)),
    vehicleType,
    capacity,
    priceRange: {
      min: minPrice,
      max: maxPrice,
    },
  };
};
