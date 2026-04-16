import { useNavigate } from "react-router-dom";
import "./ProjectItem.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";

function ProjectItem({ project, mode = "list", role = "student" }) {
  const navigate = useNavigate();

  // 모드 (리스트)
  if (mode === "list") {
    return (
      <div
        className="project-item-card"
        onClick={() => navigate(`${project.projectId}`)}
      >
        <div className="project-item-card-header">
          <p className="project-item-card-title">{project.title}</p>
          <p className="project-item-card-lecture-name">{project.className}</p>
        </div>

        <div className="project-item-card-footer">
          <div className="project-item-info-group">
            <div className="project-item-info-item">
              <img src={StudentIcon} alt="수강생" className="nav-icon" />
              수강생
              <span className="info-value">{project.author}</span>
            </div>
            <div className="project-item-info-item">
              <img src={CalendarIcon} alt="제출일" className="nav-icon" />
              제출일
              <span className="info-value">{project.date}</span>
            </div>
          </div>

          {mode === "interview" &&
            role === "teacher" &&
            project.status === "waiting" && (
              <button className="project-item-list-btn">리뷰하기</button>
            )}
        </div>
      </div>
    );
  }

  return null;
}

export default ProjectItem;
