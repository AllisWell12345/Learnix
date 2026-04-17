import { useNavigate } from "react-router-dom";
import "./LectureItem.css";
import "../../pages/common/LectureDetailPage.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";
import CartIcon from "../../assets/img/Navbar/NavCartIcon.png";
import thumb from "../../assets/img/lectureThumb.png";

function LectureItem({ item, mode }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${item.lectureId}`); // 수정 필요
  };

  // ===== box 모드 =====
  if (mode === "box") {
    return (
      <div className="lecitem-box-card" onClick={handleClick}>
        <div className="lecitem-box-thumbbox">
          <img src={thumb} alt="강의 썸네일" className="lecitem-box-thumb" />
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
        <img src={thumb} alt="강의 썸네일" className="lecitem-list-thumb" />

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
          <span className="lecitem-info-col-val">
            {item.members}/{item.members}명
          </span>
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
          <span className="lecitem-info-col-val">
            {item.studyEnd.replace(/-/g, ".")}
          </span>
        </div>
      </div>
    );
  }
  // ===== list 모드 =====
  if (mode === "detail") {
    return (
      <div className="content">
        <div className="lecdetail-container">
          {/* 썸네일 + 정보 카드 */}
          <div className="lecdetail-thumbbox">
            <img src={thumb} alt="강의 썸네일" className="lecdetail-thumb" />
            <div className="lecdetail-info-card">
              <div className="lecdetail-info-top">
                <span className="lecdetail-category">{item.category}</span>
                <button className="lecdetail-cart-btn">
                  <img
                    src={CartIcon}
                    alt="장바구니"
                    className="lecdetail-cart-icon"
                  />
                  장바구니
                </button>
              </div>
              <h1 className="lecdetail-title">{item.title}</h1>
              <p className="lecdetail-subtitle">{item.subTitle}</p>
              <div className="lecdetail-meta">
                <div className="lecdetail-meta-col">
                  <span className="lecdetail-meta-label">강사명</span>
                  <span className="lecdetail-meta-val">
                    {item.teacherName || "강사"}
                  </span>
                </div>
                <div className="lecdetail-meta-col">
                  <span className="lecdetail-meta-label">가격</span>
                  <span className="lecdetail-price">
                    {item.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 기간 + 수강인원 */}
          <div className="lecdetail-stat-row">
            <div className="lecdetail-stat-box">
              <img
                src={CalendarIcon}
                alt="모집기간"
                className="lecdetail-icon"
              />
              <p className="lecdetail-stat-label">모집 기간</p>
              <p className="lecdetail-stat-val">
                {item.recruitStart} ~ {item.recruitEnd}
              </p>
            </div>
            <div className="lecdetail-stat-box">
              <img
                src={CalendarIcon}
                alt="학습기간"
                className="lecdetail-icon"
              />
              <p className="lecdetail-stat-label">학습 기간</p>
              <p className="lecdetail-stat-val">
                {item.studyStart} ~ {item.studyEnd}
              </p>
            </div>
            <div className="lecdetail-stat-box">
              <img
                src={StudentIcon}
                alt="수강인원"
                className="lecdetail-icon"
              />
              <p className="lecdetail-stat-label">수강 인원</p>
              <p className="lecdetail-stat-val">28 / {item.members}명</p>
            </div>
          </div>

          {/* 강의 목차 */}
          <div className="lecdetail-video-card">
            <h2 className="lecdetail-video-title">강의 목차</h2>
            <div className="lecdetail-video-list">
              {/* TODO: 커리큘럼 데이터 연결 */}
              <div className="lecdetail-video-item">
                <span className="lecdetail-video-no">1</span>
                <div className="lecdetail-video-text">
                  <p className="lecdetail-video-name">영상 제목</p>
                  <p className="lecdetail-video-desc">영상 설명</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LectureItem;
