import React from "react";
import { NavLink } from "react-router-dom";

function MainNavbar() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" className="active">
            홈
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavbar;
