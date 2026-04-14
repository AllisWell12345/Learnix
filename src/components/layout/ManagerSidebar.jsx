import React from 'react'
import { NavLink } from 'react-router-dom'

function ManagerSidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">관리자 메뉴</h2>

      <ul className="sidebar-list">
        <li>
          <NavLink
            to="/manager"
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            대시보드
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/manager/user"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            회원 관리
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/manager/lecture"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            강의 관리
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/manager/data"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            자료 관리
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}

export default ManagerSidebar
