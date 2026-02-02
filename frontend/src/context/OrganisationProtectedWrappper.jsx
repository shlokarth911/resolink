import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { OrganisationContext } from "./OrganisationContext";

const OrganisationProtectedWrappper = ({ children }) => {
  const API_BASE = import.meta.env.VITE_BASE_URL;

  const token = localStorage.getItem("organisation_token");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [org, setOrg] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/org/login");
      return;
    }

    axios
      .get(`${API_BASE}/api/organisation/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrg(res.data.organisation);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/org/login");
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <Spinner />
        <span className="text-xs text-muted">Please Wait..</span>
      </div>
    );
  } else if (!loading && !token) {
    return (
      <div className="flex h-screen flex-col items-center gap-2">
        Unauthorized
      </div>
    );
  }
  return (
    <OrganisationContext.Provider value={{ org, setOrg }}>
      {children}
    </OrganisationContext.Provider>
  );
};

export default OrganisationProtectedWrappper;
