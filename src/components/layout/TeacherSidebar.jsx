import React from 'react'
import { NavLink } from 'react-router-dom'

function TeacherSidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">포트폴리오 메뉴</h2>

      <ul className="sidebar-list">
        <li>
          <NavLink
            to="/teacher/portfolio/project"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            프로젝트 관리
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/teacher/portfolio/interview"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            모의 면접 관리
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}

export default TeacherSidebar
