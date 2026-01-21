import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const API_BASE = import.meta.env.VITE_BASE_URL;

  const token = localStorage.getItem("user_token");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${API_BASE}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const userData = res.data.user;
        setUser(userData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("user_token");
        navigate("/login");
      });
  }, [token]);

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
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProtectedWrapper;
