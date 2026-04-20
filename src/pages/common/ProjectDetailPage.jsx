import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectDetail } from "../../store/projectSlice";
import ProjectItem from "../../components/project/ProjectItem";

function ProjectDetailPage() {
  const { projectid } = useParams();
  const dispatch = useDispatch();
  const { currentProject, status } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjectDetail(projectid));
  }, [dispatch, projectid]);

  if (status === "loading" || !currentProject)
    return <div className="content">로딩 중...</div>;

  return (
    <div className="content">
      <ProjectItem project={currentProject} mode="detail" />
    </div>
  );
}

export default ProjectDetailPage;
