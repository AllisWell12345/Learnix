import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectDetail } from "../../store/projectSlice";
import ProjectItem from "../../components/project/ProjectItem";

function ProjectDetailPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { currentProject, status } = useSelector((state) => state.project);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectDetail(projectId));
    }
  }, [dispatch, projectId]);

  if (status === "loading") return <div className="content">로딩 중...</div>;

  if (!currentProject)
    return <div className="content">프로젝트를 찾을 수 없습니다.</div>;

  return (
    <div className="content">
      <ProjectItem project={currentProject} mode="detail" />
    </div>
  );
}

export default ProjectDetailPage;
