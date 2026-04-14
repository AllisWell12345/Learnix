import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/layout/UserHeader'
import StudentNavbar from '../components/layout/StudentNavbar'
import Footer from '../components/layout/Footer'

function StudentLayout() {
  return (
    <>
      <UserHeader />
      <StudentNavbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default StudentLayout
