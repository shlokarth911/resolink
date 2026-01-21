import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserProtectedWrapper from "./context/UserProtectedWrapper";
import UserLayout from "./layouts/UserLayout";
import UserHomePage from "./pages/user/home/UserHomePage";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

      <Route
        path="/user"
        element={
          <UserProtectedWrapper>
            <UserLayout />
          </UserProtectedWrapper>
        }
      >
        <Route path="home" element={<UserHomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
