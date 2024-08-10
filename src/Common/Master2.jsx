import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar2";

function Master2() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Master2;