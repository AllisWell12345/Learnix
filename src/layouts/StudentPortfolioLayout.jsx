import React from 'react'

function StudentPortfolioLayout() {
  return (
    <>
      <StudentSidebar />
      <main className="content">
        <ProjectManagePage />
            <ProjectTotalPage />
                <ProjectDetailPage />
                    <InterviewNoticePage />
                    <InterviewPracticePage />
        <InterviewManagePage />
            <InterviewDetailPage />
      </main>
    </>
  )
}

export default StudentPortfolioLayout
