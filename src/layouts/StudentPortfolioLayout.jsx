import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/layout/StudentSidebar";

function StudentPortfolioLayout() {
  return (
    <>
        <StudentSidebar />
        <div className="content">
          <Outlet />
        </div>
    </>
  );
}

export default StudentPortfolioLayout;
