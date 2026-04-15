import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProjectTotalPage.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";

// 임시 데이터 리스트
const MOCK_PROJECTS = [
  {
    projectId: 1,
    userid: 1,
    title: "React 쇼핑몰 프로젝트",
    className: "React 마스터",
    author: "김학생",
    date: "2026.04.10",
    status: "completed",
  },
  {
    projectId: 2,
    userid: 2,
    title: "Tailwind 포트폴리오",
    className: "React 마스터",
    author: "이철수",
    date: "2026.04.12",
    status: "waiting",
  },
  {
    projectId: 3,
    userid: 3,
    title: "Node.js 채팅 앱",
    className: "풀스택 캠프",
    author: "박지민",
    date: "2026.04.13",
    status: "waiting",
  },
  {
    projectId: 4,
    userid: 1,
    title: "Next.js 블로그",
    className: "풀스택 캠프",
    author: "김학생",
    date: "2026.04.14",
    status: "waiting",
  },
];

function ProjectTotalPage() {
  const { lectureid } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [projects, setProjects] = useState(MOCK_PROJECTS);

  useEffect(() => {}, [lectureid]);

  const renderCard = (proj) => (
    <div
      key={proj.projectId}
      className="pt-card"
      onClick={() => navigate(`${proj.projectId}`)}
    >
      <div className="pt-card-header">
        <h4 className="pt-card-title">{proj.title}</h4>
        <p className="pt-card-lecture-name">{proj.className}</p>
      </div>
      <div className="pt-card-footer">
        <div className="pt-info-item">
          <span className="info-label">
            <img src={StudentIcon} alt="수강생" className="nav-icon" />
            <span>수강생</span>
          </span>
          <span className="info-value">{proj.author}</span>
        </div>
        <div className="pt-info-item">
          <span className="info-label">
            <img src={CalendarIcon} alt="제출일" className="nav-icon" />
            <span>제출일</span>
          </span>
          <span className="info-value">{proj.date}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-container">
      <header className="pt-header">
        <p className="pt-main-title">프로젝트 조회</p>
      </header>
      <main className="pt-content">
        {user?.role === "student" ? (
          <>
            <section className="pt-section">
              <p className="pt-sub-title">내 프로젝트</p>
              <div className="pt-list">
                {projects
                  .filter((p) => p.userid === user.userid)
                  .map(renderCard)}
              </div>
            </section>
            <section className="pt-section">
              <p className="pt-sub-title">다른 수강생의 프로젝트</p>
              <div className="pt-list">
                {projects
                  .filter((p) => p.userid !== user.userid)
                  .map(renderCard)}
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="pt-section">
              <p className="pt-sub-title">리뷰 대기 중</p>
              <div className="pt-list">
                {projects.filter((p) => p.status === "waiting").map(renderCard)}
              </div>
            </section>
            <section className="pt-section">
              <p className="pt-sub-title">리뷰 완료</p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default ProjectTotalPage;
