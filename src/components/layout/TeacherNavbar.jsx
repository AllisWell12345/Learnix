import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

import NavHomeIcon from "../../assets/img/Navbar/NavHomeIcon.png";
import NavActiveHomeIcon from "../../assets/img/Navbar/NavActiveHomeIcon.png";
import NavLeatureIcon from "../../assets/img/Navbar/NavLeatureIcon.png";
import NavActiveLeatureIcon from "../../assets/img/Navbar/NavActiveLeatureIcon.png";
import NavPortfolioIcon from "../../assets/img/Navbar/NavPortfolioIcon.png";
import NavActivePortfolioIcon from "../../assets/img/Navbar/NavActivePortfolioIcon.png";

function TeacherNavbar() {
  const [hoveredPath, setHoveredPath] = useState(null);

  const menuItems = [
    {
      to: "/teacher",
      label: "홈",
      defaultIcon: NavHomeIcon,
      activeIcon: NavActiveHomeIcon,
      end: true,
    },
    {
      to: "/teacher/mylec",
      label: "내 강의",
      defaultIcon: NavLeatureIcon,
      activeIcon: NavActiveLeatureIcon,
    },
    {
      to: "/teacher/portfolio",
      label: "포트폴리오",
      defaultIcon: NavPortfolioIcon,
      activeIcon: NavActivePortfolioIcon,
    },
  ];

  return (
    <nav className="nav">
      <ul className="nav-list">
        {menuItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? "active" : "")}
              onMouseEnter={() => setHoveredPath(item.to)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              {({ isActive }) => (
                <>
                  <img
                    src={
                      isActive || hoveredPath === item.to
                        ? item.activeIcon
                        : item.defaultIcon
                    }
                    alt={item.label}
                    className="nav-icon"
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TeacherNavbar;
