import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL || "";

export const registerOrganisation = async (registrationData) => {
  try {
    const res = await axios.post(
      `${API_BASE}/api/organisation/register`,
      registrationData,
    );

    const token = await res.data.token;
    localStorage.setItem("organisation_token", token);

    return res;
  } catch (error) {
    throw error;
  }
};

export const loginOrganisation = async (loginData) => {
  try {
    const res = await axios.post(
      `${API_BASE}/api/organisation/login`,
      loginData,
    );

    const token = await res.data.token;
    localStorage.setItem("organisation_token", token);

    return res;
  } catch (error) {
    throw error;
  }
};

export const getOrganisationProfile = async () => {
  try {
    const token = localStorage.getItem("organisation_token");
    const res = await axios.get(`${API_BASE}/api/organisation/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export const logoutOrganisation = async () => {
  try {
    const token = localStorage.getItem("organisation_token");
    const res = await axios.post(
      `${API_BASE}/api/organisation/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    localStorage.removeItem("organisation_token");

    return res;
  } catch (error) {
    throw error;
  }
};
