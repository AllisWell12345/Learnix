import { useState } from "react";
import { useLocation, useParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
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
    desc: "React와 Firebase를 활용한 이커머스 플랫폼입니다.",
  },
  {
    projectId: 2,
    userid: 2,
    title: "Tailwind 포트폴리오",
    className: "React 마스터",
    author: "이철수",
    date: "2026.04.12",
    status: "completed",
    desc: "유틸리티 퍼스트 CSS 프레임워크를 사용한 포트폴리오 사이트입니다.",
  },
  {
    projectId: 3,
    userid: 3,
    title: "Node.js 채팅 앱",
    className: "풀스택 캠프",
    author: "박지민",
    date: "2026.04.13",
    status: "waiting",
    desc: "Socket.io를 이용한 실시간 채팅 애플리케이션입니다.",
  },
  {
    projectId: 4,
    userid: 4,
    title: "Node.js 채팅 앱",
    className: "풀스택 캠프",
    author: "박지민",
    date: "2026.04.13",
    status: "waiting",
    desc: "Socket.io를 이용한 실시간 채팅 애플리케이션입니다.",
  },
  {
    projectId: 5,
    userid: 5,
    title: "Node.js 채팅 앱",
    className: "풀스택 캠프",
    author: "박지민",
    date: "2026.04.13",
    status: "waiting",
    desc: "Socket.io를 이용한 실시간 채팅 애플리케이션입니다.",
  },
  {
    projectId: 6,
    userid: 6,
    title: "Node.js 채팅 앱",
    className: "풀스택 캠프",
    author: "박지민",
    date: "2026.04.13",
    status: "waiting",
    desc: "Socket.io를 이용한 실시간 채팅 애플리케이션입니다.",
  },
];

function ProjectTotalPage() {
  const { pathname } = useLocation();
  const { lectureid } = useParams();

  const currentUser = useSelector((state) => state.user.currentUser);
  const isDetailView = pathname.split("/").filter(Boolean).length > 4;

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
      {!isDetailView ? (
        <>
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
                    <ProjectItem
                      key={p.projectId}
                      project={p}
                      role={user.role}
                    />
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
                    <ProjectItem
                      key={p.projectId}
                      project={p}
                      role={user.role}
                    />
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
                    <ProjectItem
                      key={p.projectId}
                      project={p}
                      role={user.role}
                      mode="interview"
                    />
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
                    <ProjectItem
                      key={p.projectId}
                      project={p}
                      role={user.role}
                    />
                  ))}
                </div>
              </>
            )}
          </main>
        </>
      ) : (
        <div className="pt-detail-view">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default ProjectTotalPage;
