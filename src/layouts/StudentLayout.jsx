import React from 'react'

function StudentLayout() {
  return (
    <>
      <Header />
      <StudentNavbar />
      <main className="content">
        <HomePage />
        <CartPage />
        <MyLecturePage />
            <LectureDetailPage />
                <ProjectPage />
                    <ProjectWritePage />
        <StudentPortfolioLayout />
      </main>
      <Footer />
    </>
  )
}

export default StudentLayout
