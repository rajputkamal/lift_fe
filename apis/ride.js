import { BASE_URL, buildRequestHeaders } from "./config";
import { getToken } from "../utils/identity";

export const fetchAvailableRides = async (vehicleType = "car") => {
  const token = await getToken();
  try {
    const response = await fetch(
      `${BASE_URL}/ride/available?vehicleType=${vehicleType}`,
      {
        method: "GET",
        headers: buildRequestHeaders(token),
      },
    );

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const data = await response.json();
    if (data) return data;
  } catch (error) {
    console.error("Error fetching available rides:", error);
  }
};

export const fetchMyRides = async (status = "active") => {
  const token = await getToken();
  try {
    const response = await fetch(`${BASE_URL}/ride/my?tab=${status}`, {
      method: "GET",
      headers: buildRequestHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const data = await response.json();
    if (data) return data;
  } catch (error) {
    console.error("Error fetching my rides:", error);
  }
};

export const requestRide = async (payload) => {
  // TODO:: Yet to be added the logger for successful ride and failure ride
  const token = await getToken();
  try {
    const response = await fetch(`${BASE_URL}/ride`, {
      method: "POST",
      headers: buildRequestHeaders(token),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const data = await response.json();
    if (data) return data;
  } catch (error) {
    console.error("Error requesting ride:", error);
  }
};

export const updateRide = async (payload) => {
  const token = await getToken();
  try {
    const response = await fetch(`${BASE_URL}/ride`, {
      method: "PUT",
      headers: buildRequestHeaders(token),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const data = await response.json();
    if (data) return data;
  } catch (error) {
    console.error("Error while updating ride:", error);
  }
};

export const deleteRide = async (rideId) => {
  const token = await getToken();
  try {
    const response = await fetch(`${BASE_URL}/ride`, {
      method: "DELETE",
      headers: buildRequestHeaders(token),
      body: JSON.stringify({ rideId }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const data = await response.json();
    if (data) return data;
  } catch (error) {
    console.error("Error while deleting ride:", error);
  }
};
