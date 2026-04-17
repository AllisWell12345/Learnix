import React from "react";
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

      <div className="usermanage-td">
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

      <div className="usermanage-td usermanage-td-email">{user.email}</div>

      <div className="usermanage-td usermanage-td-phone">{user.phone}</div>

      <button
        className={`usermanage-status-btn ${user.active ? "status-active" : "status-deactive"}`}
        onClick={() => onActiveChange(user)}
      >
        {user.active ? "활성" : "비활성"}
      </button>
    </div>
  );
}

export default UserItem;
