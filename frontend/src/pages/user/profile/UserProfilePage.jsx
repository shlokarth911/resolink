import React from "react";

import PersonalInfo from "./components/PersonalInfo";
import IssueCount from "./components/IssueCount";
import Annonymity from "./components/Annonymity";

const UserProfilePage = () => {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold">Profile</h2>

      {/* PersonalInfo */}
      <PersonalInfo />

      {/* IssueCount */}
      <IssueCount />

      {/* Annonymity */}
      <Annonymity />
    </div>
  );
};

export default UserProfilePage;
