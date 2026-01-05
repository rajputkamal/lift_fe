import { BASE_URL, buildRequestHeaders } from "./config";
import { getToken } from "../utils/identity";

export const getUserProfile = async () => {
  const token = await getToken();
  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "GET",
      headers: buildRequestHeaders(token),
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

export const updateUserProfile = async (payload) => {
  const token = await getToken();
  try {
    const response = await fetch(`${BASE_URL}/user/update`, {
      method: "PUT",
      headers: buildRequestHeaders(token),
      body: JSON.stringify(payload),
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
