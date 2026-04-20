import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./DataManagePage.css";
import Searchbar from "../../components/common/Searchbar";
import filter from "../../assets/img/common/filterIcon.svg";
import profile from "../../assets/img/common/profileIcon.svg";
import project from "../../assets/img/common/dataIcon.svg";
import interview from "../../assets/img/Sidebar/interviewIcon.svg";
import review from "../../assets/img/common/reviewIcon.svg";
import trash from "../../assets/img/common/deleteIcon.svg";

function DataManagePage() {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleDeleteProject = (userId) => {
    if (!window.confirm("프로젝트를 삭제하시겠습니까?")) return;
    setData((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, project: null } : u)),
    );
  };

  const handleDeleteInterview = (userId) => {
    if (!window.confirm("모의면접을 삭제하시겠습니까?")) return;
    setData((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, interview: null } : u)),
    );
  };

  const handleSearch = () => {
    setKeyword(search.trim());
  };

  return (
    <div className="datamanage-page">
      <div className="datamanage-title-container">
        {/* 타이틀 */}
        <div className="datamanage-title-area">
          <h1 className="datamanage-title">
            <span className="datamanage-title-bar" />
            자료 관리
          </h1>
        </div>

        {/* 검색 바 */}
        <div className="datamanage-search-area">
          <Searchbar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* 유저별 카드 목록 */}
      <div className="datamanage-list">
        {/* {filtered.map((user) => ( */}
        <div className="datamanage-user-block">
          {" "}
          {/*key={user.id}*/}
          {/* 유저 정보 */}
          <div className="datamanage-user-info">
            <div className="datamanage-avatar">
              <img src={profile} className="datamanage-profile-icon" />
            </div>
            <div>
              ///
              {/* <p className="datamanage-user-role">{user.role}</p>
                <p className="datamanage-user-name">{user.name}</p> */}
            </div>
          </div>
          {/* 프로젝트 + 모의면접 카드 */}
          <div className="datamanage-cards">
            {/* 프로젝트 */}
            <div className="datamanage-card">
              <p className="datamanage-card-type">
                <img src={project} className="datamanage-project-icon" />
                프로젝트
              </p>
              ///
              {/* {user.project ? (
                  <>
                    <p className="datamanage-card-title">{user.project.title}</p>
                    <p className="datamanage-card-meta">
                      작성일: {user.project.date}
                      <span className="datamanage-card-comments">
                        <img src={review} className="datamanage-review-icon" />
                        {user.project.comments}개
                      </span>
                    </p>
                    <button
                      className="datamanage-delete-btn"
                      onClick={() => handleDeleteProject(user.id)}
                    >
                      <img src={trash} className="datamanage-delete-icon" />
                      삭제
                    </button>
                  </>
                ) : (
                  <p className="datamanage-empty">제출한 프로젝트가 없습니다</p>
                )} */}
              <button
                className="datamanage-delete-btn"
                onClick={() => handleDeleteProject(user.id)}
              >
                <img src={trash} className="datamanage-delete-icon" />
                삭제
              </button>
            </div>

            {/* 모의면접 */}
            <div className="datamanage-card">
              <p className="datamanage-card-type">
                <img src={interview} className="datamanage-interview-icon" />
                모의면접
              </p>
              ///
              {/* {user.interview ? (
                  <>
                    <p className="datamanage-card-title">
                      {user.interview.title}
                    </p>
                    <p className="datamanage-card-meta">
                      제출일: {user.interview.date}
                      <span className="datamanage-card-comments">
                        <img src={review} className="datamanage-review-icon" />
                        {user.interview.comments}개
                      </span>
                    </p>
                    <button
                      className="datamanage-delete-btn"
                      onClick={() => handleDeleteInterview(user.id)}
                    >
                      <img src={trash} className="datamanage-delete-icon" />
                      삭제
                    </button>
                  </>
                ) : (
                  <p className="datamanage-empty">제출한 모의면접이 없습니다</p>
                )} */}
            </div>
          </div>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}

export default DataManagePage;
