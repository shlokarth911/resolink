import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL || "";

export const createIssue = async (issueData) => {
  try {
    const response = await axios.post(`${API_BASE}/api/issues`, issueData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating issue:", error);
    throw error;
  }
};

export const getUserIssues = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/issues/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};
