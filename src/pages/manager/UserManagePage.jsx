import React, { useEffect, useState } from "react";
import "./UserManagePage.css";
import Searchbar from "../../components/common/Searchbar";
import filter from "../../assets/img/common/filterIcon.svg";
import { getUsersAll } from "../../services/userService";
import profile from "../../assets/img/common/profileIcon.svg";

function UserManagePage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userdata = await getUsersAll();
        setUsers(userdata);
      } catch (error) {
        console.error("회원 조회 실패:", error);
        openModal("WARNING", {
        mainMsg: "회원 조회 실패!",
        subMsg: "유저 정보를 불러올 수 없습니다.",
      });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="usermanage-page">
      {/* 타이틀 */}
      <div className="usermanage-title-area">
        <h1 className="usermanage-title">
          <span className="usermanage-title-bar" />
          회원 관리
        </h1>
      </div>

      {/* 검색 바 */}
      <div className="usermanage-search-area">
        <Searchbar
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
            <tr className="usermanage-tbody-row">
                <td className="usermanage-td usermanage-td-name">
                  <div className="usermanage-user-info">
                    <div className="usermanage-avatar">
                      <img src={profile} className="usermanage-profile-icon"></img>
                    </div>
                    <span className="usermanage-name">이름</span>
                  </div>
                </td>

                <td className="usermanage-td">
                  <span
                    className={`usermanage-role-badge `}
                  >
                    수강생
                  </span>
                </td>

                <td className="usermanage-td usermanage-td-email">
                  이메일
                </td>

                <td className="usermanage-td usermanage-td-date">
                  최근 가입 날짜
                </td>

                <td className="usermanage-td usermanage-td-status">
                  <button
                    className={`usermanage-status-btn`}
                  >
                    활성화
                  </button>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagePage;
