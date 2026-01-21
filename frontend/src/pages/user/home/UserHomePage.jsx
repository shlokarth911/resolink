import React from "react";
import HomePageHeader from "./components/HomePageHeader";
import PrimaryCallToActions from "./components/PrimaryCallToActions";
import RecentIssues from "./components/RecentIssues";

const UserHomePage = () => {
  return (
    <div className="p-5">
      <HomePageHeader />
      <PrimaryCallToActions />
      <RecentIssues />
    </div>
  );
};

export default UserHomePage;
