import React from 'react'

function TeacherPortfolioLayout() {
  return (
    <>
      <TeacherSidebar />
      <main className="content">
        <ProjectManagePage />
            <ProjectRegistPage />
            <ProjectEditPage />
            <ProjectTotalPage />
                <ProjectDetailPage />
        <InterviewManagePage />
            <InterviewRegistPage />
            <InterviewEditPage />
            <InterviewTotalPage />
                <InterviewDetailPage />
      </main>
    </>
  )
}

export default TeacherPortfolioLayout
