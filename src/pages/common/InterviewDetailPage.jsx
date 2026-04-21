import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQuestionsByLectureAndProject } from "../../services/questionService";
import { getAnswerByQuestionId } from "../../services/answerService.js";
import { getProjectByUserAndLecture } from "../../services/projectService";
import InterviewItem from "../../components/interview/InterviewItem";

function InterviewDetailPage() {
  const location = useLocation();
  const { lectureId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  // teacher 쪽 InterviewTotalPage에서 넘겨준 interview
  const passedInterview = location.state?.interview || null;

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviewDetail = async () => {
      try {
        setLoading(true);

        if (!currentUser?.userId || !lectureId) {
          setInterview(null);
          return;
        }

        // 1. 역할에 따라 프로젝트 주인을 결정
        let targetUserId = null;

        // 학생은 자기 자신의 프로젝트
        if (currentUser.role === "student") {
          targetUserId = Number(currentUser.userId);
        }

        // 강사는 상세 조회 대상으로 넘어온 학생의 프로젝트
        if (currentUser.role === "teacher") {
          targetUserId = Number(passedInterview?.student?.userId);
        }

        if (!targetUserId) {
          setInterview(null);
          return;
        }

        // 2. 해당 유저 + 강의 기준 프로젝트 조회
        const targetProject = await getProjectByUserAndLecture(
          targetUserId,
          Number(lectureId),
        );

        if (!targetProject?.projectId) {
          setInterview(null);
          return;
        }

        // 3. projectId + lectureId로 질문 조회
        const questions = await getQuestionsByLectureAndProject(
          Number(lectureId),
          Number(targetProject.projectId),
        );

        // 4. 각 질문의 questionId로 답변 조회
        const questionsWithAnswer = await Promise.all(
          questions.map(async (q) => {
            const answerDoc = await getAnswerByQuestionId(Number(q.questionId));

            return {
              ...q,
              answer: answerDoc?.answer || "",
            };
          }),
        );

        // 5. 화면에 뿌릴 interview 데이터 구성
        if (currentUser.role === "student") {
          setInterview({
            ...targetProject,
            questions: questionsWithAnswer,
            comments: [],
          });
          return;
        }

        // teacher는 기존에 넘겨받은 interview 정보 + 질문/답변 결합
        setInterview({
          ...passedInterview,
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
  }, [lectureId, currentUser, passedInterview]);

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