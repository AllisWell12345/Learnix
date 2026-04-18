import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestionsAll } from "../../services/questionService";
import { getUserByUid } from "../../services/userService";
import InterviewItem from "../../components/interview/InterviewItem";
import "./InterviewTotalPage.css";

function InterviewTotalPage() {
  const navigate = useNavigate();
  const [projects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allQuestions = await getQuestionsAll();
        const projectsWithUser = await Promise.all(
          allQuestions.map(async (q) => {
            const student = q.studentUid
              ? await getUserByUid(q.studentUid)
              : null;
            return { ...q, student };
          }),
        );
        setProjects(projectsWithUser);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRegist = (interview) => {
    navigate(`/teacher/interview/${interview.interviewId}/regist`);
  };

  const handleDetail = (interview) => {
    navigate(`/teacher/interview/${interview.interviewId}/detail`);
  };

  if (loading) return <div className="it-page">불러오는 중...</div>;

  return (
    <div className="it-page">
      <header className="it-header">
        <p className="it-main-title">모의 면접 관리</p>
      </header>

      <main className="it-sections-container">
        <section className="it-section">
          <div className="it-section-title-wrapper">
            <p className="it-sub-title">질문생성중</p>
            <span className="it-count-badge badge-waiting">
              {projects.filter((it) => it.status === "waiting").length}개
            </span>
          </div>
          <div className="it-list">
            {projects
              .filter((it) => it.status === "waiting")
              .map((it) => (
                <InterviewItem
                  key={it.interviewId}
                  interview={it}
                  mode="list"
                  onRegist={handleRegist}
                />
              ))}
          </div>
        </section>

        <section className="it-section">
          <div className="it-section-title-wrapper">
            <p className="it-sub-title">리뷰중</p>
            <span className="it-count-badge badge-reviewing">
              {projects.filter((it) => it.status === "reviewing").length}개
            </span>
          </div>
          <div className="it-list-detail">
            {projects
              .filter((it) => it.status === "reviewing")
              .map((it) => (
                <InterviewItem
                  key={it.interviewId}
                  interview={it}
                  mode="list"
                  onDetail={handleDetail}
                />
              ))}
          </div>
        </section>

        <section className="it-section">
          <div className="it-section-title-wrapper">
            <p className="it-sub-title">면접완료</p>
            <span className="it-count-badge badge-completed">
              {projects.filter((it) => it.status === "completed").length}개
            </span>
          </div>
          <div className="it-list-detail">
            {projects
              .filter((it) => it.status === "completed")
              .map((it) => (
                <InterviewItem
                  key={it.interviewId}
                  interview={it}
                  mode="list"
                  onDetail={handleDetail}
                />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default InterviewTotalPage;
