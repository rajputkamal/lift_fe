import { getToken } from "./identity";

const BASE_URL = "https://lift-be.onrender.com/api";

const buildHeaders = (token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const fetchOTP = async (number) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({ phoneNumber: number }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching OTP:", error);
  }
};

export const verifyOTP = async (number, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({ phoneNumber: number, otp }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
  }
};

export const updateProfile = async (profileData) => {
  const token = await getToken();
  try {
    const response = await fetch(`${BASE_URL}/user/update`, {
      method: "PUT",
      headers: buildHeaders(token),
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

export const getUserProfile = async () => {
  const token = await getToken();
  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "GET",
      headers: buildHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

export const fetchAvailableRides = async () => {
  const token = await getToken();
  try {
    const response = await fetch(`${BASE_URL}/ride`, {
      method: "GET",
      headers: buildHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching available rides:", error);
  }
};

export const requestRide = async (rideData) => {
  const token = await getToken();
  try {
    const response = await fetch(`${BASE_URL}/ride`, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify(rideData),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error requesting ride:", error);
  }
};
