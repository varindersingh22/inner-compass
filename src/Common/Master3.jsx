import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar3";

function Master3() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Master3;