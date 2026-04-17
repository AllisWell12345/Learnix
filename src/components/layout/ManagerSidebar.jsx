import React from "react";
import { NavLink } from "react-router-dom";
import "../layout/Sidebar.css";
import DashboardIcon from "../../assets/img/Sidebar/managerhomeIcon.svg";
import DashboardSelectIcon from "../../assets/img/Sidebar/managerhomeselectIcon.svg";
import UserIcon from "../../assets/img/Sidebar/manageruserIcon.svg";
import UserSelectIcon from "../../assets/img/Sidebar/manageruserselectIcon.svg";
import LectureIcon from "../../assets/img/Sidebar/managerlectureIcon.svg";
import LectureSelectIcon from "../../assets/img/Sidebar/managerlectureselectIcon.svg";
import DataIcon from "../../assets/img/Sidebar/managerdataIcon.svg";
import DataSelectIcon from "../../assets/img/Sidebar/managerdataselectIcon.svg";

function ManagerSidebar() {
  return (
    <aside className="sidebar">
      <div className="manager-sidebar-content">
        <h2 className="sidebar-title">관리자 메뉴</h2>

        <ul className="sidebar-list">
          <li>
            <NavLink to="/manager" end>
              {({ isActive }) => (
                <div
                  className={isActive ? "sidebar-item active" : "sidebar-item"}
                >
                  <img
                    src={isActive ? DashboardSelectIcon : DashboardIcon}
                    alt="대시보드 아이콘"
                    className="sidebar-icon"
                  />
                  <span>대시보드</span>
                </div>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/manager/user">
              {({ isActive }) => (
                <div
                  className={isActive ? "sidebar-item active" : "sidebar-item"}
                >
                  <img
                    src={isActive ? UserSelectIcon : UserIcon}
                    alt="회원 관리 아이콘"
                    className="sidebar-icon"
                  />
                  <span>회원 관리</span>
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/lecture">
              {({ isActive }) => (
                <div
                  className={isActive ? "sidebar-item active" : "sidebar-item"}
                >
                  <img
                    src={isActive ? LectureSelectIcon : LectureIcon}
                    alt="강의 관리 아이콘"
                    className="sidebar-icon"
                  />
                  <span>강의 관리</span>
                </div>
              )}
            </NavLink>
          </li>

          <li>
            <NavLink to="/manager/data">
              {({ isActive }) => (
                <div
                  className={isActive ? "sidebar-item active" : "sidebar-item"}
                >
                  <img
                    src={isActive ? DataSelectIcon : DataIcon}
                    alt="자료 관리 아이콘"
                    className="sidebar-icon"
                  />
                  <span>자료 관리</span>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default ManagerSidebar;
