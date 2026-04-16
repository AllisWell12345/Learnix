import React, { useState } from "react";
import "./LectureManagePage.css";
import Searchbar from "../../components/common/Searchbar";
import filter from "../../assets/img/common/filterIcon.svg";

function LectureManagePage() {
  const testItems = [
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
    "강의아이템",
  ];

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
          {/* LectureItem 컴포넌트 들어갈 자리 */}
          {testItems.map((item, index) => (
            <div key={index} className="lecmanage-lec-box">
              <div className="test-item2">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LectureManagePage;
