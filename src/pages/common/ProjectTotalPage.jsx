import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ProjectTotalPage.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";

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
    status: "completed",
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

  // 임시 경로 지정
  const { pathname } = useLocation();
  const user = {
    userid: 1,
    role: pathname.includes("teacher") ? "teacher" : "student",
  };

  const myProjects = MOCK_PROJECTS.filter((p) => p.userid === user.userid);
  const otherProjects = MOCK_PROJECTS.filter((p) => p.userid !== user.userid);
  const waitingProjects = MOCK_PROJECTS.filter((p) => p.status === "waiting");
  const completedProjects = MOCK_PROJECTS.filter(
    (p) => p.status === "completed",
  );

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
          <img src={StudentIcon} alt="수강생" className="nav-icon" />
          <span className="info-value">{proj.author}</span>
        </div>
        <div className="pt-info-item">
          <img src={CalendarIcon} alt="제출일" className="nav-icon" />
          <span className="info-value">{proj.date}</span>
        </div>
        {user.role === "teacher" && (
          <span className={`pt-badge ${proj.status}`}>
            {proj.status === "waiting" ? "리뷰 대기" : "리뷰 완료"}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="pt-container">
      <header className="pt-header">
        <h2 className="pt-main-title">프로젝트 조회</h2>
      </header>

      <main className="pt-content">
        {user.role === "student" ? (
          <>
            <ProjectSection
              title="내 프로젝트"
              list={myProjects}
              render={renderCard}
            />
            <ProjectSection
              title="다른 수강생의 프로젝트"
              list={otherProjects}
              render={renderCard}
            />
          </>
        ) : (
          <>
            <ProjectSection
              title="리뷰 대기 중"
              list={waitingProjects}
              render={renderCard}
            />
            <ProjectSection
              title="리뷰 완료"
              list={completedProjects}
              render={renderCard}
            />
          </>
        )}
      </main>
    </div>
  );
}

function ProjectSection({ title, list, render }) {
  return (
    <section className="pt-section">
      <p className="pt-sub-title">{title}</p>
      <div className="pt-list">{list.map(render)}</div>
    </section>
  );
}

export default ProjectTotalPage;
