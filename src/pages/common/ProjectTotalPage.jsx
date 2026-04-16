import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectItem from "../../components/project/ProjectItem";
import "./ProjectTotalPage.css";

// 임시 데이터
const PRACTICE_DATA = [
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
    projectId: 6,
    userid: 6,
    title: "Node.js 채팅 앱",
    className: "풀스택 캠프",
    author: "박지민",
    date: "2026.04.13",
    status: "waiting",
  },
  {
    projectId: 5,
    userid: 5,
    title: "Node.js 채팅 앱",
    className: "풀스택 캠프",
    author: "박지민",
    date: "2026.04.13",
    status: "waiting",
  },
  {
    projectId: 4,
    userid: 4,
    title: "Node.js 채팅 앱",
    className: "풀스택 캠프",
    author: "박지민",
    date: "2026.04.13",
    status: "waiting",
  },
];

function ProjectTotalPage() {
  const { pathname } = useLocation();

  // 임시 경로 지정
  const user = {
    userid: 1,
    role: pathname.includes("teacher") ? "teacher" : "student",
  };

  const [projects] = useState(PRACTICE_DATA);

  const myProjects = projects.filter((p) => p.userid === user.userid);
  const otherProjects = projects.filter((p) => p.userid !== user.userid);

  const waitingProjects = projects.filter((p) => p.status === "waiting");
  const completedProjects = projects.filter((p) => p.status === "completed");

  return (
    <div className="pt-container">
      <header className="pt-header">
        <div className="cart-title-area">
          <div className="cart-title-bar" />
          <h2 className="pt-main-title">프로젝트 조회</h2>
        </div>
      </header>

      <main className="pt-content">
        {user.role === "student" ? (
          <>
            <div className="pt-section-header">
              <p className="pt-sub-title">내 프로젝트</p>
              <span className="pt-count-badge badge-my">
                {myProjects.length}
              </span>
            </div>
            <div className="pt-list">
              {myProjects.map((p) => (
                <ProjectItem key={p.projectId} project={p} role={user.role} />
              ))}
            </div>

            <div className="pt-section-header">
              <p className="pt-sub-title">다른 수강생의 프로젝트</p>
              <span className="pt-count-badge badge-other">
                {otherProjects.length}
              </span>
            </div>
            <div className="pt-list">
              {otherProjects.map((p) => (
                <ProjectItem key={p.projectId} project={p} role={user.role} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="pt-section-header">
              <p className="pt-sub-title">리뷰 대기 중</p>
              <span className="pt-count-badge badge-waiting">
                {waitingProjects.length}
              </span>
            </div>
            <div className="pt-list">
              {waitingProjects.map((p) => (
                <ProjectItem key={p.projectId} project={p} role={user.role} />
              ))}
            </div>

            <div className="pt-section-header">
              <p className="pt-sub-title">리뷰 완료</p>
              <span className="pt-count-badge badge-completed">
                {completedProjects.length}
              </span>
            </div>
            <div className="pt-list">
              {completedProjects.map((p) => (
                <ProjectItem key={p.projectId} project={p} role={user.role} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default ProjectTotalPage;
