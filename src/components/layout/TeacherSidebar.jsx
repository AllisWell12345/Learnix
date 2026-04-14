import React from 'react'
import { NavLink } from 'react-router-dom'
import "../layout/Sidebar.css";
import interviewIcon from "../../assets/img/interviewicon.svg";
import interviewSelectIcon from "../../assets/img/interviewselecticon.svg";
import projectIcon from "../../assets/img/projecticon.svg";
import projectSelectIcon from "../../assets/img/projectselecticon.svg";

function TeacherSidebar() {
  return (
    <aside className="sidebar">
          <div className="sidebar-content">
            <h2 className="sidebar-title">포트폴리오 메뉴</h2>
    
            <ul className="tsidebar-list">
              <li>
                <NavLink
                  to="/teacher/portfolio/project">
                    {({ isActive }) => (
                    <div className={isActive ? "tsidebar-item active" : "tsidebar-item"}>
                      <img
                        src={isActive ? projectSelectIcon : projectIcon}
                        alt="프로젝트 아이콘"
                        className="tsidebar-icon"
                      />
                      <span>프로젝트 관리</span>
                    </div>
                  )}
                </NavLink>
              </li>
    
              <li>
                <NavLink to="/teacher/portfolio/interview">
                  {({ isActive }) => (
                    <div className={isActive ? "tsidebar-item active" : "tsidebar-item"}>
                      <img
                        src={isActive ? interviewSelectIcon : interviewIcon}
                        alt="모의 면접 아이콘"
                        className="tsidebar-icon"
                      />
                      <span>모의 면접 관리</span>
                    </div>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>
  )
}

export default TeacherSidebar
