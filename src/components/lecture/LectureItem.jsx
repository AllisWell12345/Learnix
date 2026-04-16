import { useNavigate } from "react-router-dom";
import "./LectureItem.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";

function LectureItem({ item, mode }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/:role/lecture/${item.lectureId}`); // 수정 필요
  };

  // ===== box 모드 =====
  if (mode === "box") {
    return (
      <div className="lecitem-box-card" onClick={handleClick}>
        <div className="lecitem-box-thumb">
          <span className="lecitem-category-badge">{item.category}</span>
        </div>
        <div className="lecitem-box-body">
          <p className="lecitem-title">{item.title}</p>
          <p className="lecitem-subtitle">{item.subTitle}</p>
          <div className="lecitem-info">
            <p className="lecitem-info-row">
              모집 기간 : ~{item.recruitEnd.slice(5)}
            </p>
            <p className="lecitem-info-row">
              학습 기간 : {item.studyStart.slice(2)} ~ {item.studyEnd.slice(2)}
            </p>
          </div>
          <div className="lecitem-footer">
            <span className="lecitem-members">
              <img src={StudentIcon} alt="수강인원" className="lecitem-icon" />
              {item.members}명
            </span>
            <span className="lecitem-price">
              {item.price.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ===== list 모드 =====
  if (mode === "list") {
    return (
      <div className="lecitem-list-card" onClick={handleClick}>
        {/* 썸네일 */}
        <div className="lecitem-list-thumb" />

        {/* 제목 + 설명 */}
        <div className="lecitem-list-text">
          <span className="lecitem-category-badge">{item.category}</span>
          <p className="lecitem-title">{item.title}</p>
          <p className="lecitem-subtitle">{item.subTitle}</p>
        </div>

        {/* 수강생 수 */}
        <div className="lecitem-info-col">
          <span className="lecitem-info-col-label">
            <img src={StudentIcon} alt="수강인원" className="lecitem-icon" />
            수강생
          </span>
          <span className="lecitem-info-col-val">{item.members}/{item.members}명</span>
        </div>

        {/* 학습 시작일 */}
        <div className="lecitem-info-col">
          <span className="lecitem-info-col-label">
            <img src={CalendarIcon} alt="학습시작일" className="lecitem-icon" />
            학습 시작일
          </span>
          <span className="lecitem-info-col-val">{item.studyStart}</span>
        </div>

        {/* 학습 종료일 */}
        <div className="lecitem-info-col">
          <span className="lecitem-info-col-label">
            <img src={CalendarIcon} alt="학습종료일" className="lecitem-icon" />
            학습 종료일
          </span>
          <span className="lecitem-info-col-val">{item.studyEnd.replace(/-/g, ".")}</span>
        </div>
      </div>
    );
  }
}

export default LectureItem;
