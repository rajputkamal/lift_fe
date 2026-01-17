import { BASE_URL, buildRequestHeaders } from "./config";

export const validate = async (token) => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    headers: buildRequestHeaders(token),
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  const data = await response.json();
  if (data) return data;
};
