import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

import NavHomeIcon from "../../assets/img/Navbar/NavHomeIcon.png";
import NavActiveHomeIcon from "../../assets/img/Navbar/NavActiveHomeIcon.png";

function MainNavbar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive || isHovered ? NavActiveHomeIcon : NavHomeIcon}
                  alt="홈"
                  className="nav-icon"
                />
                <span>홈</span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavbar;
