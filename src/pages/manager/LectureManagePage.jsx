import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./LectureManagePage.css";
import Searchbar from "../../components/common/Searchbar";
import filter from "../../assets/img/common/filterIcon.svg";
import LectureItem from "../../components/lecture/LectureItem";

function LectureManagePage() {
  const { lectures } = useSelector((state) => state.lecture);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    // 검색은 실시간 필터로 처리
  };

  return (
    <div className="lecmanage-page">
      {/* 타이틀 */}
      <div className="lecmanage-title-area">
        <h1 className="lecmanage-title">
          <span className="lecmanage-title-bar" />
          강의 관리
        </h1>
      </div>

      {/* 검색 바 */}
      <div className="lecmanage-search-area">
        <Searchbar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
          placeholder="이름 또는 이메일로 검색..."
        />
        <button className="lecmanage-filter-btn">
          <img src={filter} className="lecmanage-filter-icon" />
        </button>
      </div>

      {/* 강의 목록 */}
      <div className="lecmanage-lec-container">
        <div className="lecmanage-total-list">
          {lectures.map((item) => (
            <div key={item.lectureId} className="lecmanage-lec-box">
              <LectureItem item={item} mode="list" /> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LectureManagePage;
