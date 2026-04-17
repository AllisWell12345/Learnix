import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MyLecturePage.css";
import LectureItem from "../../components/lecture/LectureItem";

// 강의 등록 버튼 롤값에 따라 유무 나눠야함

function MyLecturePage() {
  const navigate = useNavigate();
  const { lectures } = useSelector((state) => state.lecture);

  const waiting = lectures.filter((l) => l.status === "recruiting");
  const finished = lectures.filter((l) => l.status === "finished");

  return (
    <div className="content">
      <div className="mylec-container">
        <div className="mylec-top-container">
          <div className="mylec-title-area">
            <div className="mylec-title-bar" />
            <p className="mylec-title">내 강의</p>
          </div>
          <button
            className="mylec-regist-btn"
            onClick={() => navigate("/teacher/mylec/regist")}
          >
            + 강의 등록
          </button>
        </div>

        {/* 대기 중인 강의 */}
        <div className="mylec-lec-container">
          <div className="mylec-sub-title-area">
            <p className="mylec-sub-title">대기 중인 강의</p>
            <div className="mylec-current-number">{waiting.length}개</div>
          </div>
          <div className="mylec-current-list">
            {waiting.map((item) => (
              <LectureItem key={item.lectureId} item={item} mode="list" />
            ))}
          </div>
        </div>

        {/* 끝난 강의 */}
        <div className="mylec-lec-container">
          <div className="mylec-sub-title-area">
            <p className="mylec-sub-title">끝난 강의</p>
            <div className="mylec-end-number">{finished.length}개</div>
          </div>
          <div className="mylec-end-list">
            {finished.map((item) => (
              <LectureItem key={item.lectureId} item={item} mode="my" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLecturePage;
