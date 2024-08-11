import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar3";
import Footer from "./footer";

function Master3() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
}

export default Master3;