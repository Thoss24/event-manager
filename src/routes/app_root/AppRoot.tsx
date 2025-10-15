import React from "react";
import MainNavigation from "../../components/navigation/MainNavigation";
import { Outlet } from "react-router-dom";
import classes from "./AppRoot.module.css";
import { useNavigate } from "react-router-dom";

const AppRoot = () => {

  const navigate = useNavigate();
  const handleLogout = () => navigate("/");

  return (
    <div >
      <MainNavigation onLogout={handleLogout} />
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppRoot;
