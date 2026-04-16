import { useState } from "react";
import { useSelector } from "react-redux";
import "./HomePage.css";
import Searchbar from "../../components/common/Searchbar";
import LectureItem from "../../components/lecture/LectureItem";

function HomePage() {
  const { lectures } = useSelector((state) => state.lecture);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = ["전체", "프론트엔드", "백엔드", "UI/UX", "데이터 분석"];

  const filtered =
    selectedCategory === "전체"
      ? lectures
      : lectures.filter((l) => l.category === selectedCategory);

  return (
    <div className="content">
      <div className="home-container">
        <Searchbar />
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
