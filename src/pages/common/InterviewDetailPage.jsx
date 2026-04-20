import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserByUid } from "../../services/userService";
import { getQuestionsByLectureAndProject } from "../../services/questionService";
import { getAnswerByQuestionId } from "../../services/answerService.js";
import InterviewItem from "../../components/interview/InterviewItem";

function InterviewDetailPage() {
  const { lectureId, projectId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await getQuestionsByLectureAndProject(
          Number(lectureId),
          Number(projectId),
        );

        // 각 질문에 답변 매핑
        const questionsWithAnswer = await Promise.all(
          questions.map(async (q) => {
            const answer = await getAnswerByQuestionId(q.questionId);
            return { ...q, answer: answer?.answer || "" };
          }),
        );

        const student = questions[0]?.studentUid
          ? await getUserByUid(questions[0].studentUid)
          : null;

        setInterview({
          lectureId: Number(lectureId),
          projectId: Number(projectId),
          projectTitle: questions[0]?.projectTitle || "",
          lectureTitle: questions[0]?.lectureTitle || "",
          submitDate: questions[0]?.submitDate || "",
          student,
          questions: questionsWithAnswer,
          comments: [],
        });
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lectureId, projectId]);

  if (loading) return <div className="content">불러오는 중...</div>;
  if (!interview)
    return <div className="content">인터뷰를 찾을 수 없습니다.</div>;

  return (
    <div className="content">
      <InterviewItem
        interview={interview}
        mode="detail" // teacherdetail → detail로 통일
        currentUser={currentUser}
      />
    </div>
  );
}

export default InterviewDetailPage;
