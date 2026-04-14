import React from "react";
import { Outlet } from "react-router-dom";

function LectureDetailPage() {
  return <div className="content">LectureDetailPage <Outlet/> </div>;
}

export default LectureDetailPage;
