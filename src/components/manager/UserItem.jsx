import React from "react";
import "../../pages/manager/UserManagePage.css";
import profile from "../../assets/img/common/profileIcon.svg";

function UserItem({ user, onActiveChange }) {
  return (
    <div className="usermanage-user">
      <div className="usermanage-td usermanage-td-name">
        <div className="usermanage-user-info">
          <div className="usermanage-avatar">
            <img src={profile} className="usermanage-profile-icon"></img>
          </div>
          <p className="usermanage-name">{user.name}</p>
        </div>
      </div>

      <div className="usermanage-td usermanage-th-enter usermanage-td-role">
        <p
          className={`usermanage-role-badge ${
            user.role === "student"
              ? "role-student"
              : user.role === "teacher"
                ? "role-teacher"
                : "role-manager"
          }`}
        >
          {user.role === "student"
            ? "수강생"
            : user.role === "teacher"
              ? "강사"
              : "관리자"}
        </p>
      </div>

      <div className="usermanage-td usermanage-th-enter usermanage-td-email">{user.email}</div>

      <div className="usermanage-td usermanage-th-enter usermanage-td-phone">{user.phone}</div>

      <div className="usermanage-td-status ">
        <button
          className={`usermanage-status-btn usermanage-th-enter ${user.active ? "status-active" : "status-deactive"}`}
          onClick={() => onActiveChange(user)}
        >
          {user.active ? "활성" : "비활성"}
        </button>
      </div>
    </div>
  );
}

export default UserItem;
