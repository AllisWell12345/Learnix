import React from "react";

function MainLayout() {
  return (
    <>
      <Header />
      <MainNavbar />
      <main className="content">
        <HomePage />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout;
