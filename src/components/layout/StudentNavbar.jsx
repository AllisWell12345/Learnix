import React from "react";
import { NavLink } from "react-router-dom";

function StudentNavbar() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/student"
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            홈
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/student/cart"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            장바구니
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/student/mylec"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            내 강의
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/student/portfolio"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            포트폴리오
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default StudentNavbar;
