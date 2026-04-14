import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentSidebar from '../components/layout/StudentSidebar'

function StudentPortfolioLayout() {
  return (
    <>
      <StudentSidebar />
      <main className="content">
        <Outlet />
      </main>
    </>
  )
}

export default StudentPortfolioLayout
