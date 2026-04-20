import { useNavigate } from "react-router-dom";
import "./LectureItem.css";
import "../../pages/common/LectureDetailPage.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";
import CartIcon from "../../assets/img/Navbar/NavCartIcon.png";
import ProjectIcon from "../../assets/img/Sidebar/projectselecticon.svg";
import DeleteIcon from "../../assets/img/common/deleteIcon.svg";
import EditIcon from "../../assets/img/common/editIcon.svg";
import thumb from "../../assets/img/lectureThumb.png";
import { useSelector } from "react-redux";

function LectureItem({
  lecture,
  mode,
  videos = [],
  onAddToCart,
  onDelete,
  isMyLecturePage = false,
  customPath = "",
}) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!lecture) return null;

  const isManager = currentUser?.role === "manager";

  const handleClick = () => {
    if (customPath) {
      navigate(customPath);
      return;
    }

    if (!currentUser) {
      navigate(`/${lecture.lectureId}`);
      return;
    }

    if (isMyLecturePage) {
      navigate(`/${currentUser.role}/mylec/${lecture.lectureId}`);
      return;
    }

    if (currentUser.role === "manager") {
      navigate(`/manager/lecture/${lecture.lectureId}`);
      return;
    }

    navigate(`/${currentUser.role}/${lecture.lectureId}`);
  };

  const handleDetailAction = () => {
    if (isManager) {
      if (onDelete) {
        onDelete(lecture);
      }
      return;
    }
    
    if (isMyLecturePage) {
      if (currentUser.role === "student") {
        navigate(`/student/mylec/${lecture.lectureId}/myproj`);
        return;
      }

      if (currentUser.role === "teacher") {
        if (lecture.status === "finished") return;

        navigate(`/teacher/mylec/${lecture.lectureId}/edit`);
        return;
      }
    }

    if (onAddToCart) {
      onAddToCart();
    }
  };

  const shouldShowDetailButton = () => {
    if (isManager) return true;

    if (isMyLecturePage) {
      if (currentUser?.role === "student") return true;
      if (currentUser?.role === "teacher") {
        return lecture.status !== "finished";
      }
    }

    return true;
  };

  const getDetailButtonText = () => {
    if (isManager) return "삭제";

    if (isMyLecturePage) {
      if (currentUser?.role === "student") return "프로젝트";
      if (currentUser?.role === "teacher" && lecture.status !== "finished") {
        return "수정";
      }
    }

    return "장바구니";
  };

  const getDetailButtonIcon = () => {
    if (isManager) return null;

    if (isMyLecturePage) {
      if (currentUser?.role === "student") return ProjectIcon;
      if (currentUser?.role === "teacher" && lecture.status !== "finished") {
        return EditIcon;
      }
    }

    return CartIcon;
  };

  if (mode === "box") {
    return (
      <div className="lecitem-box-card" onClick={handleClick}>
        <div className="lecitem-box-thumbbox">
          <img src={thumb} alt="강의 썸네일" className="lecitem-box-thumb" />
          <span className="lecitem-category-badge">{lecture.category}</span>
        </div>

        <div className="lecitem-box-body">
          <p className="lecitem-title">{lecture.title}</p>
          <p className="lecitem-subtitle">{lecture.subTitle}</p>

          <div className="lecitem-info">
            <p className="lecitem-info-row">
              모집 기간 : ~{lecture.recruitEnd.slice(5)}
            </p>
            <p className="lecitem-info-row">
              학습 기간 : {lecture.studyStart.slice(2)} ~{" "}
              {lecture.studyEnd.slice(2)}
            </p>
          </div>

          <div className="lecitem-footer">
            <span className="lecitem-members">
              <img src={StudentIcon} alt="수강인원" className="lecitem-icon" />
              {lecture.members}명
            </span>
            <span className="lecitem-price">
              {lecture.price.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "list") {
    return (
      <div className="lecitem-list-card" onClick={handleClick}>
        <img src={thumb} alt="강의 썸네일" className="lecitem-list-thumb" />

        <div className="lecitem-list-text">
          <span className="lecitem-category-badge">{lecture.category}</span>
          <p className="lecitem-title">{lecture.title}</p>
          <p className="lecitem-subtitle">{lecture.subTitle}</p>
        </div>

        <div className="lecitem-info-col">
          <span className="lecitem-info-col-label">
            <img src={StudentIcon} alt="수강인원" className="lecitem-icon" />
            수강생
          </span>
          <span className="lecitem-info-col-val">15/{lecture.members}명</span>
        </div>

        <div className="lecitem-info-col">
          <span className="lecitem-info-col-label">
            <img src={CalendarIcon} alt="학습시작일" className="lecitem-icon" />
            학습 시작일
          </span>
          <span className="lecitem-info-col-val">{lecture.studyStart}</span>
        </div>

        <div className="lecitem-info-col">
          <span className="lecitem-info-col-label">
            <img src={CalendarIcon} alt="학습종료일" className="lecitem-icon" />
            학습 종료일
          </span>
          <span className="lecitem-info-col-val">
            {lecture.studyEnd}
          </span>
        </div>

        {isManager && (
          <button
            type="button"
            className="lecitem-manager-delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(lecture);
            }}
          >
            <img src={DeleteIcon} alt="삭제" className="lecitem-icon" />
          </button>
        )}
      </div>
    );
  }

  if (mode === "detail") {
    return (
      <div className="content">
        <div className="lecdetail-container">
          <div className="lecdetail-thumbbox">
            <img src={thumb} alt="강의 썸네일" className="lecdetail-thumb" />

            <div className="lecdetail-info-card">
              <div className="lecdetail-info-top">
                <span className="lecdetail-category">{lecture.category}</span>

                {shouldShowDetailButton() && (
                  <button
                    type="button"
                    className={`lecdetail-cart-btn ${isManager? "manager": ""}`}
                    onClick={handleDetailAction}
                  >
                    {getDetailButtonIcon() && (
                      <img
                        src={getDetailButtonIcon()}
                        alt={getDetailButtonText()}
                        className="lecdetail-cart-icon"
                      />
                    )}
                    {getDetailButtonText()}
                  </button>
                )}
              </div>

              <h1 className="lecdetail-title">{lecture.title}</h1>
              <p className="lecdetail-subtitle">{lecture.subTitle}</p>

              <div className="lecdetail-meta">
                <div className="lecdetail-meta-col">
                  <span className="lecdetail-meta-label">강사명</span>
                  <span className="lecdetail-meta-val">
                    {lecture.teacherName || "강사"}
                  </span>
                </div>

                <div className="lecdetail-meta-col">
                  <span className="lecdetail-meta-label">가격</span>
                  <span className="lecdetail-price">
                    {lecture.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lecdetail-stat-row">
            <div className="lecdetail-stat-box">
              <img
                src={CalendarIcon}
                alt="모집기간"
                className="lecdetail-icon"
              />
              <p className="lecdetail-stat-label">모집 기간</p>
              <p className="lecdetail-stat-val">
                {lecture.recruitStart} ~ {lecture.recruitEnd}
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
                {lecture.studyStart} ~ {lecture.studyEnd}
              </p>
            </div>

            <div className="lecdetail-stat-box">
              <img
                src={StudentIcon}
                alt="수강인원"
                className="lecdetail-icon"
              />
              <p className="lecdetail-stat-label">수강 인원</p>
              <p className="lecdetail-stat-val">28 / {lecture.members}명</p>
            </div>
          </div>

          <div className="lecdetail-video-card">
            <h2 className="lecdetail-video-title">강의 목차</h2>

            <div className="lecdetail-video-list">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <div
                    className="lecdetail-video-item"
                    key={video.videoId || video.id}
                  >
                    <span className="lecdetail-video-no">{video.order}</span>
                    <div className="lecdetail-video-text">
                      <p className="lecdetail-video-name">{video.title}</p>
                      <p className="lecdetail-video-desc">{video.subTitle}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="lecdetail-video-empty">
                  등록된 강의 영상이 없습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default LectureItem;