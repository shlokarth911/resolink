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

export const upvoteIssue = async (issueId) => {
  try {
    const response = await axios.post(
      `${API_BASE}/api/issues/upvote`,
      { issueId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error upvoting issue:", error);
    throw error;
  }
};

export const getIssueFeed = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/issues/feed?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching issue feed:", error);
    throw error;
  }
};

export const getOrganisationIssues = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/issues/organisation`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("organisation_token")}`,
      },
    });
    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};

export const updateIssueStatus = async (issueId, status) => {
  try {
    const response = await axios.put(
      `${API_BASE}/api/issues/status`,
      {
        issueId,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("organisation_token")}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating issue status:", error);
    throw error;
  }
};
