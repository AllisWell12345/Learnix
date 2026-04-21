import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectsAll } from "../../store/projectSlice";
import { getUserByUserId } from "../../services/userService";
import { getQuestionsByLectureAndProject } from "../../services/questionService";
import InterviewItem from "../../components/interview/InterviewItem";
import "./InterviewTotalPage.css";

function InterviewTotalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const dispatch = useDispatch();

  const { projects, status } = useSelector((state) => state.project);
  const [projectsWithUser, setProjectsWithUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchProjectsAll());
  }, [dispatch, location.key]);

  useEffect(() => {
    if (status !== "succeeded") return;
    setLoading(true);

    const completedProjects = projects.filter(
      (p) =>
        String(p.lectureId) === String(lectureId) && p.status === "completed",
    );

    const fetchData = async () => {
      try {
        const merged = await Promise.all(
          completedProjects.map(async (project) => {
            const student = project.userId
              ? await getUserByUserId(project.userId)
              : null;

            const questions = await getQuestionsByLectureAndProject(
              String(lectureId),
              project.projectId,
            );

            if (questions.length === 0) {
              return { ...project, student, interviewStatus: "before" };
            }

            return {
              ...project,
              student,
              questions,
              interviewStatus: "completed",
            };
          }),
        );
        setProjectsWithUser(merged);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projects, status, lectureId, location.key]);

  const handleRegist = (interview) => {
    navigate(
      `/teacher/portfolio/interview/${interview.lectureId}/${interview.projectId}/regist`,
      {
        state: {
          projectInfo: {
            projectTitle: interview.title,
            lectureId: interview.lectureId,
            projectId: interview.projectId,
            className: interview.className,
            requireDetail: interview.requireDetail,
            feature: interview.feature,
            problem: interview.problem,
            solution: interview.solution,
            projectLink: interview.projectLink,
            createdAt: interview.createdAt?.split("T")[0],
            student: interview.student,
          },
        },
      },
    );
  };

  const handleDetail = (interview) => {
    navigate(
      `/teacher/portfolio/interview/${interview.lectureId}/${interview.projectId}/detail`,
      { state: { interview } },
    );
  };

  const beforeProjects = projectsWithUser.filter(
    (it) => it.interviewStatus === "before",
  );
  const completedInterviews = projectsWithUser.filter(
    (it) => it.interviewStatus === "completed",
  );

  if (loading) return <div className="it-page">불러오는 중...</div>;

  return (
    <div className="it-page">
      <header className="it-header">
        <p className="it-main-title">모의 면접 관리</p>
      </header>

      <main className="it-sections-container">
        <section className="it-section">
          <div className="it-section-title-wrapper">
            <p className="it-sub-title">모의 면접 진행 전</p>
            <span className="it-count-badge badge-waiting">
              {beforeProjects.length}개
            </span>
          </div>
          <div className="it-list">
            {beforeProjects.length > 0 ? (
              beforeProjects.map((it) => (
                <InterviewItem
                  key={it.projectId}
                  interview={it}
                  mode="list"
                  onRegist={handleRegist}
                />
              ))
            ) : (
              <p className="it-empty-msg">해당하는 프로젝트가 없습니다.</p>
            )}
          </div>
        </section>

        <section className="it-section">
          <div className="it-section-title-wrapper">
            <p className="it-sub-title">모의 면접 완료</p>
            <span className="it-count-badge badge-reviewing">
              {completedInterviews.length}개
            </span>
          </div>
          <div className="it-list-detail">
            {completedInterviews.length > 0 ? (
              completedInterviews.map((it) => (
                <InterviewItem
                  key={it.projectId}
                  interview={it}
                  mode="list"
                  onDetail={handleDetail}
                />
              ))
            ) : (
              <p className="it-empty-msg">해당하는 프로젝트가 없습니다.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default InterviewTotalPage;
