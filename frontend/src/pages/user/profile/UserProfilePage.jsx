import React from "react";

import PersonalInfo from "./components/PersonalInfo";
import IssueCount from "./components/IssueCount";
import Annonymity from "./components/Annonymity";
import { getUserProfile } from "../../../services/user";
import { useEffect, useState } from "react";
import { getUserIssues } from "../../../services/issue";

const UserProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [issues, setIssues] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      setProfile(res.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserIssues = async () => {
    try {
      const res = await getUserIssues();

      setIssues(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserIssues();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold">Profile</h2>

      {/* PersonalInfo */}
      <PersonalInfo user={profile} />

      {/* IssueCount */}
      <IssueCount issues={issues} />

      {/* Annonymity */}
      <Annonymity user={profile} />
    </div>
  );
};

export default UserProfilePage;
