import React from 'react'
import { Outlet } from 'react-router-dom'
import TeacherSidebar from '../components/layout/TeacherSidebar'

function TeacherPortfolioLayout() {
  return (
    <>
      <TeacherSidebar />
      <div className="content">
        <Outlet/>
      </div>
    </>
  )
}

export default TeacherPortfolioLayout
