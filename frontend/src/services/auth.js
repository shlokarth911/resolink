import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL || "";

export const registerUser = async (registrationData) => {
  try {
    const res = await axios.post(
      `${API_BASE}/api/auth/register`,
      registrationData,
    );

    const token = await res.data.token;

    localStorage.setItem("user_token", token);

    return res;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const res = await axios.post(`${API_BASE}/api/auth/login`, loginData);

    const token = await res.data.token;

    localStorage.setItem("user_token", token);

    return res;
  } catch (error) {
    throw error;
  }
};
