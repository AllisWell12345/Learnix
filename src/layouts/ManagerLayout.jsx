import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "../components/layout/UserHeader";
import ManagerSidebar from "../components/layout/ManagerSidebar";
import Footer from "../components/layout/Footer";

function ManagerLayout() {
  return (
    <>
      <UserHeader />
      <ManagerSidebar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default ManagerLayout;
