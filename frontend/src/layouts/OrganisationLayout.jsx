import React from "react";
import { Outlet } from "react-router-dom";

const OrganisationLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default OrganisationLayout;
