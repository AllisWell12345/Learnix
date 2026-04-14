import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/layout/MainHeader";
import MainNavbar from "../components/layout/MainNavbar";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <>
      <MainHeader />
      <MainNavbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
