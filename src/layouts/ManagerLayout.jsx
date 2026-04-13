import React from "react";

function ManagerLayout() {
  return (
    <>
      <Header />
      <ManagerSidebar />
      <main className="content">
        <ManagerDashboardPage />
        <LectureManagerPage />
        <UserManagerPage />
        <DataManagerPage />
      </main>
      <Footer />
    </>
  );
}

export default ManagerLayout;
