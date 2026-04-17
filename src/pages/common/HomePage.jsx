import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setKeyword } from "../../store/searchbarSlice";
import "./HomePage.css";
import Searchbar from "../../components/common/Searchbar";
import LectureItem from "../../components/lecture/LectureItem";

function HomePage() {
  const { lectures } = useSelector((state) => state.lecture);
  const { search, keyword } = useSelector((state) => state.searchbar);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const handleSearch = () => {
    dispatch(setKeyword(search));
  };

  const categories = ["전체", "프론트엔드", "백엔드", "UI/UX", "데이터 분석"];

  const filtered = lectures
    .filter(
      (l) => selectedCategory === "전체" || l.category === selectedCategory,
    )
    .filter((l) => {
      if (!keyword) return true;
      const kw = keyword.toLowerCase();
      return (
        l.title.toLowerCase().includes(kw) ||
        l.subTitle.toLowerCase().includes(kw)
      );
    });

  return (
    <div className="content">
      <div className="home-container">
        <Searchbar
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          onSearch={handleSearch}
        />
        <div className="category-container">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => {
                setSelectedCategory(category);
                console.log(category);
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="lecture-list">
          {filtered.map((item) => (
            <LectureItem key={item.lectureId} item={item} mode="box" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
