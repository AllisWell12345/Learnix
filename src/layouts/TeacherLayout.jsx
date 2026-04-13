import React from 'react'

function TeacherLayout() {
  return (
    <>
      <Header />
      <TeacherNavbar />
      <main className="content">
        <HomePage />
        <MyLecturePage />
            <LectureRegistPage />
            <LectureEditPage />
            <LectureDetailPage />
        <TeacherPortfolioLayout />
      </main>
      <Footer />
    </>
  )
}

export default TeacherLayout
