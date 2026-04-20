import { useEffect } from "react";
import { useLocation, useParams, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectsAll } from "../../store/projectSlice";
import ProjectItem from "../../components/project/ProjectItem";
import "./ProjectTotalPage.css";

function ProjectTotalPage() {
  const { pathname } = useLocation();
  const { lectureId } = useParams();
  const dispatch = useDispatch();

  const { projects, status } = useSelector((state) => state.project);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProjectsAll());
  }, [dispatch]);

  const currentLectureProjects = projects.filter(
    (p) => String(p.lectureId) === String(lectureId),
  );

  const myProjects = currentLectureProjects.filter(
    (p) => p.userId === currentUser?.uid,
  );
  const otherProjects = currentLectureProjects.filter(
    (p) => p.userId !== currentUser?.uid,
  );
  const waitingProjects = currentLectureProjects.filter(
    (p) => p.status === "waiting",
  );
  const completedProjects = currentLectureProjects.filter(
    (p) => p.status === "completed",
  );

  const isDetailView = pathname.split("/").filter(Boolean).length > 4;
  const role = pathname.includes("teacher") ? "teacher" : "student";

  if (status === "loading")
    return <div className="content">목록 불러오는 중...</div>;

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
            {role === "student" ? (
              <>
                <Section
                  title="내 프로젝트"
                  count={myProjects.length}
                  projects={myProjects}
                  role={role}
                  badgeClass="badge-my"
                />
                <Section
                  title="다른 수강생의 프로젝트"
                  count={otherProjects.length}
                  projects={otherProjects}
                  role={role}
                  badgeClass="badge-other"
                />
              </>
            ) : (
              <>
                <Section
                  title="리뷰 대기 중"
                  count={waitingProjects.length}
                  projects={waitingProjects}
                  role={role}
                  mode="interview"
                  badgeClass="badge-waiting"
                />
                <Section
                  title="리뷰 완료"
                  count={completedProjects.length}
                  projects={completedProjects}
                  role={role}
                  badgeClass="badge-completed"
                />
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

function Section({ title, count, projects, role, mode, badgeClass }) {
  return (
    <div className="pt-section-wrapper">
      <div className="pt-section-header">
        <p className="pt-sub-title">{title}</p>
        <span className={`pt-count-badge ${badgeClass}`}>{count}</span>
      </div>
      <div className="pt-list">
        {projects.length > 0 ? (
          projects.map((p) => (
            <ProjectItem
              key={p.projectId}
              project={p}
              role={role}
              mode={mode}
            />
          ))
        ) : (
          <p className="pt-empty-msg">해당하는 프로젝트가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default ProjectTotalPage;
