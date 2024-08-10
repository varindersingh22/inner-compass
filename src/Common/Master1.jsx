import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Master() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Master;