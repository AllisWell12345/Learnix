import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQuestionsByLectureAndProject } from "../../services/questionService";
import { getAnswerByQuestionId } from "../../services/answerService";
import { getProjectById } from "../../services/projectService";
import InterviewItem from "../../components/interview/InterviewItem";
import { getUserByUserId } from "../../services/userService";

function InterviewDetailPage() {
  const location = useLocation();
  const { lectureId, projectId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  const passedInterview = location.state?.interview || null;
  const passedProject = location.state?.project || null;

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviewDetail = async () => {
      try {
        setLoading(true);

        if (!projectId) {
          setInterview(null);
          return;
        }

        // 1. projectId로 프로젝트 조회
        const targetProject = await getProjectById(Number(projectId));

        if (!targetProject?.projectId) {
          setInterview(null);
          return;
        }

        // 2. lectureId는 URL 우선, 없으면 project에서 사용 (관리자 대응)
        const targetLectureId = lectureId
          ? Number(lectureId)
          : Number(targetProject.lectureId);

        if (!targetLectureId) {
          setInterview(null);
          return;
        }

        // 3. lectureId + projectId로 질문 조회
        const questions = await getQuestionsByLectureAndProject(
          targetLectureId,
          Number(targetProject.projectId),
        );

        // 4. 질문별 답변 조회
        const questionsWithAnswer = await Promise.all(
          questions.map(async (q) => {
            const answerDoc = await getAnswerByQuestionId(Number(q.questionId));
            return {
              ...q,
              answer: answerDoc?.answer || "",
            };
          }),
        );

        // 5. 학생 정보
        let student = null;
        if (targetProject.userId) {
          student = await getUserByUserId(Number(targetProject.userId));
        }

        setInterview({
          ...(passedInterview || {}),
          ...(passedProject || {}),
          ...targetProject,
          student,
          projectTitle: targetProject.title,
          questions: questionsWithAnswer,
          comments: passedInterview?.comments || [],
        });
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
        setInterview(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewDetail();
  }, [lectureId, projectId, passedInterview, passedProject]);

  if (loading) return <div className="content"><div className="loading">불러오는 중...</div></div>;
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
