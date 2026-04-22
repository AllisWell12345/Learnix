import React, { useEffect, useState } from "react";
import "./UserManagePage.css";
import Searchbar from "../../components/common/Searchbar";
import filter from "../../assets/img/common/filterIcon.svg";
import { getUsersAll, updateUserActive } from "../../services/userService";
import UserItem from "../../components/manager/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setKeyword } from "../../store/searchbarSlice";
import useModal from "../../hooks/useModal";

function UserManagePage() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterClick, setIsFilterClick] = useState(false);
  const { search, keyword } = useSelector((state) => state.searchbar);
  const dispatch = useDispatch();
  const { modal, openModal } = useModal();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userdata = await getUsersAll();
        setAllUsers(userdata);
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

  const handleFilterAll = () => {
    setUsers(allUsers);
    setIsFilterClick(false);
  };

  const handleFilterStudent = () => {
    const filtered = allUsers.filter((user) => user.role === "student");
    setUsers(filtered);
    setIsFilterClick(false);
  };

  const handleFilterTeacher = () => {
    const filtered = allUsers.filter((user) => user.role === "teacher");
    setUsers(filtered);
    setIsFilterClick(false);
  };

  const handleSearch = () => {
    dispatch(setKeyword(search));

    const filtered = allUsers.filter(
      (user) =>
        user.name.includes(search) ||
        user.email.includes(search) ||
        user.phone.includes(search),
    );

    setUsers(filtered);
  };

  const handleActiveChange = (user) => {
    openModal("CONFIRM", {
      mainMsg: user.active
        ? "회원 상태를 비활성으로 변경하시겠습니까?"
        : "회원 상태를 활성으로 변경하시겠습니까?",
      subMsg: "확인 버튼을 누르면\n 회원 상태가 변경됩니다.",
      onConfirm: async () => {
        try {
          await updateUserActive(user.id, !user.active);

          setUsers((prev) =>
            prev.map((item) =>
              item.id === user.id ? { ...item, active: !item.active } : item,
            ),
          );

          setAllUsers((prev) =>
            prev.map((item) =>
              item.id === user.id ? { ...item, active: !item.active } : item,
            ),
          );
        } catch (error) {
          console.error("회원 상태 변경 실패:", error);
          openModal("WARNING", {
            mainMsg: "변경 실패",
            subMsg: "회원 상태를 변경하지 못했습니다.",
          });
        }
      },
    });
  };

  return (
    <div className="usermanage-page">
      {modal}
      {/* 타이틀 */}
      <div className="usemanage-title-container">
        <div className="usermanage-title-area">
          <div className="usermanage-title">
            <div className="usermanage-title-bar"></div>
            <h1 className="usermanage-title-text">회원 관리</h1>
          </div>
        </div>

        {/* 검색 바 */}
        <div className="usermanage-search-area">
          <Searchbar
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            onSearch={handleSearch}
          />
          <div className="um-filter-container">
            <button
              className="usermanage-filter-btn"
              onClick={() => setIsFilterClick(!isFilterClick)}
            >
              <img src={filter} className="usermanage-filter-icon" /> 전체
            </button>
            {isFilterClick ? (
              <div className="um-filter-choice">
                <button className="um-choice-btn" onClick={handleFilterAll}>
                  전체
                </button>
                <button className="um-choice-btn" onClick={handleFilterStudent}>
                  수강생
                </button>
                <button className="um-choice-btn" onClick={handleFilterTeacher}>
                  강사
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="usermanage-container">
        <div className="usermanage-header">
          <div className="usermanage-th usermanage-td-name ">이름</div>
          <div className="usermanage-th usermanage-td-role">회원 구분</div>
          <div className="usermanage-th usermanage-td-email">이메일</div>
          <div className="usermanage-th usermanage-td-phone">전화번호</div>
          <div className="usermanage-th usermanage-td-status">상태</div>
        </div>
        <div className="usermanage-body">
          {loading ? (
              <div className="loading">불러오는 중...</div>
          ) : (
            users.map((user) => (
              <UserItem
                key={user.userId}
                user={user}
                onActiveChange={handleActiveChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManagePage;
