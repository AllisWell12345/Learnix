import React from "react";
import SearchIcon from "../../assets/img/common/searchIcon.svg";
import "./Searchbar.css";

function Searchbar({ value, onChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="검색어를 입력해주세요!"
        className="searchbar-input"
        value={value}
        onChange={onChange || (() => {})} // 다른 곳에 onchange 안쓴 곳 있어서 작성해둠
        onKeyDown={handleKeyDown}
      />
      <button className="search-btn" onClick={onSearch}>
        <img src={SearchIcon} alt="검색 아이콘" className="search-icon" />
      </button>
    </div>
  );
}

export default Searchbar;
