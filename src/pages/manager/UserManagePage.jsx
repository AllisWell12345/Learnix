import React, { useState } from "react";
import "./UserManagePage.css";
import Searchbar from "../../components/common/Searchbar";
import filter from "../../assets/img/common/filterIcon.svg";
// import profile from "../../assets/img/common/profileIcon.svg";

function UserManagePage() {

  // 수강생 상태 토글 순서
  const studentStatusCycle = ["활성", "휴면"];
  // 강사 상태 토글 순서
  const insrtructoStatusCycle = ["승인", "미승인"];

  const [users, setUsers] = useState("회원이 없습니다");
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    // 검색은 실시간 필터로 처리
  };

  const handleStatusToggle = (id) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== id) return user;
        const cycle =
          user.role === "강사" ? teacherStatusCycle : studentStatusCycle;
        const currentIdx = cycle.indexOf(user.status);
        const nextStatus = cycle[(currentIdx + 1) % cycle.length];
        return { ...user, status: nextStatus };
      }),
    );
  };

  // const filteredUsers = users.filter(
  //   (u) => u.name.includes(search) || u.email.includes(search),
  // );

  const getStatusClass = (status) => {
    switch (status) {
      case "활성":
        return "status-active";
      case "비활성":
        return "status-inactive";
      case "휴면":
        return "status-dormant";
      case "승인":
        return "status-approved";
      case "미승인":
        return "status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="usermanage-page">
      <div className="usermanage-title-area">
        <h1 className="usermanage-title">
          <span className="usermanage-title-bar" />
          회원 관리
        </h1>
      </div>

      {/* 검색 바 */}
      <div className="usermanage-search-area">
        <Searchbar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
          placeholder="이름 또는 이메일로 검색..."
        />
        <button className="usermanage-filter-btn">
          <img src={filter} className="usermanage-filter-icon" />
        </button>
      </div>

      {/* 테이블 */}
      <div className="usermanage-table-wrap">
        <table className="usermanage-table">
          <thead>
            <tr className="usermanage-thead-row">
              <th className="usermanage-th usermanage-th-name">이름</th>
              <th className="usermanage-th">회원 구분</th>
              <th className="usermanage-th">이메일</th>
              <th className="usermanage-th">가입일</th>
              <th className="usermanage-th usermanage-th-status">상태</th>
            </tr>
          </thead>
          <tbody>
            <div>더미</div>
            {/*{filteredUsers.map((user) => (
              <tr className="usermanage-tbody-row" key={user.id}>
                // 이름
                <td className="usermanage-td usermanage-td-name">
                  <div className="usermanage-user-info">
                    <div className="usermanage-avatar">
                      <img src={profile} className="usermanage-profile-icon"></img>
                    </div>
                    <span className="usermanage-name">{user.name}</span>
                  </div>
                </td>

                // 회원 구분
                <td className="usermanage-td">
                  <span
                    className={`usermanage-role-badge ${user.role === "강사" ? "role-teacher" : "role-student"}`}
                  >
                    {user.role}
                  </span>
                </td>

                이메일
                <td className="usermanage-td usermanage-td-email">
                  {user.email}
                </td>

                // 가입일
                <td className="usermanage-td usermanage-td-date">
                  {user.joinDate}
                </td>

                // 상태 버튼
                <td className="usermanage-td usermanage-td-status">
                  <button
                    className={`usermanage-status-btn ${getStatusClass(user.status)}`}
                    onClick={() => handleStatusToggle(user.id)}
                  >
                    {user.status}
                  </button>
                </td>
              </tr>
            ))}*/}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagePage;
