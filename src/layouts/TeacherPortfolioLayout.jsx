import React from 'react'
import { Outlet } from 'react-router-dom'
import TeacherSidebar from '../components/layout/TeacherSidebar'

function TeacherPortfolioLayout() {
  return (
    <>
      <TeacherSidebar />
      <main className="content">
        <Outlet/>
      </main>
    </>
  )
}

export default TeacherPortfolioLayout
