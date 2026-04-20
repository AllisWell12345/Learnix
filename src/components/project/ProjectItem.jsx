import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProjectItem.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";

function ProjectItem({ project, mode = "list", role = "student" }) {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  if (mode === "list" || mode === "interview") {
    return (
      <div
        className="pt-item-list-card"
        onClick={() =>
          navigate(
            `/student/portfolio/project/${lectureId}/${project.projectId}`,
          )
        }
      >
        <div className="pt-item-list-header">
          <p className="pt-item-list-title">{project.title}</p>
          <p className="pt-item-list-lecture">{project.className}</p>
        </div>

        <div className="pt-item-list-footer">
          <div className="pt-item-list-info-group">
            <div className="pt-item-list-info-item">
              <img
                src={StudentIcon}
                alt="수강생"
                className="pt-item-list-icon"
              />
              수강생 <span className="info-value">{project.userId}</span>
            </div>
            <div className="pt-item-list-info-item">
              <img
                src={CalendarIcon}
                alt="제출일"
                className="pt-item-list-icon"
              />
              제출일 <span className="info-value">{project.date}</span>
            </div>
          </div>

          {mode === "interview" &&
            role === "teacher" &&
            project.status === "waiting" && (
              <button
                className="pt-item-list-btn"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                리뷰하기
              </button>
            )}
        </div>
      </div>
    );
  }

  if (mode === "detail") {
    return (
      <div className="pt-wrap">
        <div className="pt-item-detail-container">
          <header className="pt-item-detail-header">
            <p className="pt-item-detail-main-title">( {project.title} )</p>
          </header>

          <div className="pt-item-detail-columns">
            <section className="pt-item-detail-card info-card">
              <p className="card-section-title">프로젝트 정보</p>

              <div className="info-fixed-area">
                <div className="info-row">
                  <span className="info-label">프로젝트 주제</span>
                  <p className="info-content bold">( {project.title} )</p>
                </div>

                <div className="info-row">
                  <span className="info-label">강의명</span>
                  <p className="info-content">
                    {project.className || "강의 정보 없음"}
                  </p>
                </div>

                <div className="info-row">
                  <span className="info-label">1. 요구사항 분석</span>
                  <p className="info-content desc-text">
                    {project.requireDetail}
                  </p>
                </div>

                <div className="info-row">
                  <span className="info-label">2. 주요 기능</span>
                  <p className="info-content desc-text">{project.feature}</p>
                </div>

                <div className="info-row">
                  <span className="info-label">3. 발생한 문제</span>
                  <p className="info-content desc-text">{project.problem}</p>
                </div>

                <div className="info-row">
                  <span className="info-label">4. 해결 방법</span>
                  <p className="info-content desc-text">{project.solution}</p>
                </div>
              </div>
            </section>

            <aside className="pt-item-detail-card student-card">
              <h3 className="card-section-title">수강생 정보</h3>
              <div className="student-info-area">
                <div className="info-row">
                  <span className="info-label">이름</span>
                  <p className="info-content bold">
                    {currentUser?.name || project.name}
                  </p>
                </div>
                <div className="info-row">
                  <span className="info-label">이메일</span>
                  <p className="info-content student-email">
                    {currentUser?.email || project.email}
                  </p>
                </div>
                <hr className="student-div" />
                <div className="info-row student-date-row">
                  <img
                    src={CalendarIcon}
                    alt="제출일"
                    className="student-date-icon"
                  />
                  <div className="student-date-text">
                    <span className="info-label">제출일</span>
                    <p className="info-content">{project.createdAt}</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
  // 댓글창 구현
  return null;
}

export default ProjectItem;
