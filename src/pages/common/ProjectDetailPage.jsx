import { useParams } from "react-router-dom";
import ProjectItem from "../../components/project/ProjectItem";

// 임시 데이터
const PRACTICE_DATA = [
  {
    projectId: 1,
    userid: 1,
    lectureId: 1,
    title: "프로젝트 제목",
    requireDetail: "요구사항분석",
    feature: "주요 기능",
    problem: "기능구현중발생한문제",
    solution: "문제해결방법",
    projectLink: "프로젝트링크",
  },
  {
    projectId: 2,
    userid: 1,
    lectureId: 2,
    title: "프로젝트 제목",
    requireDetail: "요구사항분석",
    feature: "주요 기능",
    problem: "기능구현중발생한문제",
    solution: "문제해결방법",
    projectLink: "프로젝트링크",
  },
];

function ProjectDetailPage() {
  const { projectid } = useParams();

  const project = PRACTICE_DATA.find((p) => p.projectId === Number(projectid));

  if (!project) {
    return <div className="content">프로젝트를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <ProjectItem project={project} mode="detail" />
      {/* 댓글 부분 추가 */}
    </div>
  );
}

export default ProjectDetailPage;
