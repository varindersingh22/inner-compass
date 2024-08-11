import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

function Master() {
  return (
    <>
      <Outlet />
      <Footer/>

    </>
  );
}

export default Master;