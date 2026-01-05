import { BASE_URL } from "./config";
import { buildRequestHeaders } from "./config";

export const fetchOTP = async (phoneNumber) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: buildRequestHeaders(),
      body: JSON.stringify({ phoneNumber }),
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

export const verifyOTP = async (phoneNumber, otp) => {
  // TODO:: Needs to be updated when message central OTP flow will be updated in BE
  try {
    const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: buildRequestHeaders(),
      body: JSON.stringify({ phoneNumber, otp }),
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
