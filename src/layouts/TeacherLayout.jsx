import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/layout/UserHeader'
import TeacherNavbar from '../components/layout/TeacherNavbar'
import Footer from '../components/layout/Footer'

function TeacherLayout() {
  return (
    <>
      <UserHeader />
      <TeacherNavbar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default TeacherLayout
