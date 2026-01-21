import React from "react";
import HomePageHeader from "./components/HomePageHeader";
import PrimaryCallToActions from "./components/PrimaryCallToActions";
import RecentIssues from "./components/RecentIssues";
import { getUserProfile } from "../../../services/user";
import { useEffect } from "react";
import { useState } from "react";

const UserHomePage = () => {
  const [name, setname] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();

      setname(res?.user?.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="p-5">
      <HomePageHeader name={name} />
      <PrimaryCallToActions />
      <RecentIssues />
    </div>
  );
};

export default UserHomePage;
