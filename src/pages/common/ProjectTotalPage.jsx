import { useEffect } from "react";
import { useParams, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectsAll } from "../../store/projectSlice";
import ProjectItem from "../../components/project/ProjectItem";
import "./ProjectTotalPage.css";

function ProjectTotalPage() {
  const { lectureId, projectId } = useParams();
  const dispatch = useDispatch();

  const { projects, status } = useSelector((state) => state.project);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchProjectsAll());
  }, [dispatch]);

  const role = currentUser?.role;
  const isDetailView = !!projectId;

  if (status === "loading" && !isDetailView)
    return <div className="content"><div className="loading">로딩 중...</div></div>;

  if (isDetailView) return <Outlet />;

  const lectureProjects = projects.filter(
    (p) => String(p.lectureId) === String(lectureId),
  );

  return (
    <div className="pt-container">
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
              projects={lectureProjects.filter(
                (p) => String(p.userId) === String(currentUser?.userId),
              )}
              role={role}
              badgeClass="badge-my"
            />
            <Section
              title="다른 수강생의 프로젝트"
              projects={lectureProjects.filter(
                (p) => String(p.userId) !== String(currentUser?.userId),
              )}
              role={role}
              badgeClass="badge-other"
            />
          </>
        ) : (
          <>
            <Section
              title="리뷰 대기 중"
              projects={lectureProjects.filter((p) => p.status === "waiting")}
              role={role}
              mode="interview"
              badgeClass="badge-waiting"
            />
            <Section
              title="리뷰 완료"
              projects={lectureProjects.filter((p) => p.status === "completed")}
              role={role}
              badgeClass="badge-completed"
            />
          </>
        )}
      </main>
    </div>
  );
}

function Section({ title, projects, role, mode, badgeClass }) {
  return (
    <div className="pt-section-wrapper">
      <div className="pt-section-header">
        <p className="pt-sub-title">{title}</p>
        <span className={`pt-count-badge ${badgeClass}`}>
          {projects.length}개
        </span>
      </div>
      <div className="pt-list">
        {projects.length > 0 ? (
          projects.map((p) => (
            <ProjectItem key={p.projectId || p.id} project={p} role={role} />
          ))
        ) : (
          <p className="pt-empty-msg">내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default ProjectTotalPage;
