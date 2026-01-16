import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL || "";

const registerUser = async (registrationData) => {
  try {
    const res = axios.post(`${API_BASE}/api/auth/register`, registrationData);
    return res;
  } catch (error) {
    throw error;
  }
};

export default registerUser;
