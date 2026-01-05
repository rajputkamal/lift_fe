export const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}/api`;
// TODO:: Clean later
// Added just for local testing purposes
const LOCAL_HOST_BASE_URL = `${process.env.EXPO_PUBLIC_LOCAL_HOST_API_URL}/api`;

export const buildRequestHeaders = (token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};
