import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setKeyword } from "../../store/searchbarSlice";
import { getPlayingLectures } from "../../services/lectureService";
import { getAttendingCountMapByLectures } from "../../services/attendingService";
import "./HomePage.css";
import Searchbar from "../../components/common/Searchbar";
import LectureItem from "../../components/lecture/LectureItem";

function HomePage() {
  const dispatch = useDispatch();
  const { search, keyword } = useSelector((state) => state.searchbar);

  const [lectures, setLectures] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectureList = async () => {
      try {
        setLoading(true);

        const lectureList = await getPlayingLectures();
        const attendingCountMap = await getAttendingCountMapByLectures(
          lectureList,
        );

        const lecturesWithCount = lectureList.map((lecture) => ({
          ...lecture,
          attendingCount: attendingCountMap[Number(lecture.lectureId)] || 0,
        }));

        setLectures(lecturesWithCount);
      } catch (error) {
        console.error("강의 목록 조회 실패:", error);
        setLectures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLectureList();
  }, []);

  const handleSearch = () => {
    dispatch(setKeyword(search.trim()));
  };

  const categories = ["전체", "프론트엔드", "백엔드", "UI/UX", "데이터 분석"];

  const filteredLectures = lectures
    .filter(
      (lecture) =>
        selectedCategory === "전체" || lecture.category === selectedCategory,
    )
    .filter((lecture) => {
      if (!keyword.trim()) return true;

      const lowerKeyword = keyword.toLowerCase();

      return (
        lecture.title.toLowerCase().includes(lowerKeyword) ||
        lecture.subTitle.toLowerCase().includes(lowerKeyword)
      );
    });

  if (loading) {
    return (
      <div className="content">
        <div className="loading">불러오는 중...</div>
      </div>
    );
  }

  if (!lectures) {
    return (
      <div className="content">
        <div className="loading">해당하는 강의가 없습니다.</div>
      </div>
    );
  }

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
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="lecture-list">
          {filteredLectures.map((lecture) => (
            <LectureItem key={lecture.lectureId} lecture={lecture} mode="box" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;