import { useState } from "react";
import Searchbar from "../../components/common/Searchbar";
import "./HomePage.css";

function HomePage() {
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

  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = ["전체", "프론트엔드", "백엔드", "UI/UX", "데이터 분석"];

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
          {testItems.map((item, index) => (
            <div key={index} className="test-item">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
