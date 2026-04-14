import React from 'react'
import { NavLink } from 'react-router-dom'

function TeacherNavbar() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/teacher"
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            홈
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/teacher/mylec"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            내 강의
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/teacher/portfolio"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            포트폴리오
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default TeacherNavbar
