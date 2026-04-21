import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQuestionsByLectureAndProject } from "../../services/questionService";
import { getAnswerByQuestionId } from "../../services/answerService.js";
import InterviewItem from "../../components/interview/InterviewItem";

function InterviewDetailPage() {
  const location = useLocation();
  const { lectureId, projectId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  const passedInterview = location.state?.interview || null;

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (passedInterview) {
      const fetchQuestions = async () => {
        try {
          const questions = await getQuestionsByLectureAndProject(
            String(lectureId),
            Number(projectId),
          );

          // 각 질문에 답변 매핑
          const questionsWithAnswer = await Promise.all(
            questions.map(async (q) => {
              const answer = await getAnswerByQuestionId(q.questionId);
              return { ...q, answer: answer?.answer || "" };
            }),
          );

          setInterview({
            ...passedInterview,
            questions: questionsWithAnswer,
            comments: [],
          });
        } catch (err) {
          console.error("데이터 불러오기 실패:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchQuestions();
      return;
    }
  }, [lectureId, projectId]);

  if (loading) return <div className="content">불러오는 중...</div>;
  if (!interview)
    return <div className="content">인터뷰를 찾을 수 없습니다.</div>;

  return (
    <InterviewItem
      interview={interview}
      mode="detail"
      currentUser={currentUser}
    />
  );
}

export default InterviewDetailPage;
