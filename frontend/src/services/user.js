import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL || "";

export const getUserProfile = async () => {
  try {
    const res = await axios.get(`${API_BASE}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const userLogOut = async () => {
  try {
    const res = await axios.post(
      `${API_BASE}/api/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
