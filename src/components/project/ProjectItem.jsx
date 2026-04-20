import { useNavigate, useParams } from "react-router-dom";
import "./ProjectItem.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";

function ProjectItem({ project, mode = "list", role = "student" }) {
  const navigate = useNavigate();
  const { lectureId } = useParams();

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
              수강생 <span className="info-value">{project.userid}</span>
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
      <div className="pt-item-detail-container">
        <header className="pt-item-detail-header">
          <h1 className="pt-item-detail-main-title">( {project.title} )</h1>
        </header>

        <div className="pt-item-detail-columns">
          <section className="pt-item-detail-card info-card">
            <h3 className="card-section-title">프로젝트 정보</h3>

            <div className="info-fixed-area">
              <div className="info-row">
                <span className="info-label">프로젝트 주제</span>
                <p className="info-content bold">( {project.title} )</p>
              </div>

              <div className="info-row">
                <span className="info-label">강의명</span>
                <p className="info-content">{project.className}</p>
              </div>

              <div className="info-row">
                <span className="info-label">프로젝트 설명</span>
                <p className="info-content desc-text">
                  1. 주요 기능
                  <br />
                  2. 기능 구현 중 발생한 문제
                  <br />
                  3. 문제 해결 방법
                </p>
              </div>
            </div>
          </section>

          <aside className="pt-item-detail-card student-card">
            <h3 className="card-section-title">수강생 정보</h3>

            <div className="student-info-area">
              <div className="info-row">
                <span className="info-label">이름</span>
                <p className="info-content bold">
                  {project.author || "김철수"}
                </p>
              </div>

              <div className="info-row">
                <span className="info-label">이메일</span>
                <p className="info-content student-email">
                  {project.email || "kim@example.com"}
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
                  <p className="info-content">{project.date}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="pt-item-detail-card link-card">
          <h3 className="card-section-title">제출 링크</h3>
          <div className="link-list">
            <div className="link-item">
              <img src={StudentIcon} alt="저장소" className="link-type-icon" />
              <div className="link-text-group">
                <span className="link-title">GitHub 저장소</span>
                {project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    className="link-url"
                  >
                    {project.projectLink}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      // 댓글창 추가 구현
    );
  }

  return null;
}

export default ProjectItem;
