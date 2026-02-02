import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OrganisationRegister from "./pages/auth/OrganisationRegister";
import OrganisationLogin from "./pages/auth/OrganisationLogin";
import UserProtectedWrapper from "./context/UserProtectedWrapper";
import UserLayout from "./layouts/UserLayout";
import UserHomePage from "./pages/user/home/UserHomePage";
import UserProfilePage from "./pages/user/profile/UserProfilePage";
import ReportIssue from "./pages/user/report/ReportIssue";
import UserIssues from "./pages/user/issues/UserIssues";
import OrganisationLayout from "./layouts/OrganisationLayout";
import OrganisationProtectedWrappper from "./context/OrganisationProtectedWrappper";
import DashBoard from "./pages/organisation/dashboard/DashBoard";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/org/register" element={<OrganisationRegister />} />
      <Route path="/org/login" element={<OrganisationLogin />} />

      <Route
        path="/org"
        element={
          <OrganisationProtectedWrappper>
            <OrganisationLayout />
          </OrganisationProtectedWrappper>
        }
      >
        <Route path="dashboard" element={<DashBoard />} />
      </Route>

      <Route
        path="/user"
        element={
          <UserProtectedWrapper>
            <UserLayout />
          </UserProtectedWrapper>
        }
      >
        <Route path="home" element={<UserHomePage />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="report" element={<ReportIssue />} />
        <Route path="issues" element={<UserIssues />} />
      </Route>
    </Routes>
  );
};

export default App;
