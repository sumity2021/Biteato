import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserRegister from "../pages/auth/UserRegister";
import ChooseRegister from "../pages/auth/ChooseRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import BottomNavUser from "../components/BottomNavUser";
import BottomNavFoodPartner from "../components/BottomNavFoodPartner";
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/Profile";
import Logout from "../pages/auth/Logout";
import PrivateRoute from "./PrivateRoute";
import ForgetPassword from "../components/ForgetPassword";
import ChangePassword from "../components/ChangePassword";
import ProductPage from "../components/ProductPage";
export function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<ChooseRegister />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route
          path="/forgot-password/user"
          element={<ForgetPassword userType="user" />}
        />
        <Route
          path="/forgot-password/food-partner"
          element={<ForgetPassword userType="food-partner" />}
        />
        <Route path="/reset-password" element={<ChangePassword />} />

        <Route path="/item/:id" element={<ProductPage />} />
        {/* Protected routes for users */}
        <Route
          path="/home"
          element={
            <PrivateRoute role="user">
              <Home />
              <BottomNavUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <PrivateRoute role="user">
              <Saved />
              <BottomNavUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/food-partner/:id"
          element={
            <PrivateRoute role="user">
              <Profile role="user" />
              <BottomNavUser />
            </PrivateRoute>
          }
        />

        {/* Protected routes for food partners */}
        <Route
          path="/:id/create-food"
          element={
            <PrivateRoute role="partner">
              <CreateFood />
              <BottomNavFoodPartner />
            </PrivateRoute>
          }
        />
        <Route
          path="/me/:id"
          element={
            <PrivateRoute role="partner">
              <Profile role="partner" />
              <BottomNavFoodPartner />
            </PrivateRoute>
          }
        />

        {/* Logout */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
