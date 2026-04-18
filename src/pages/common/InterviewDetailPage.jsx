import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { getQuestionsById } from "../../services/questionService";
import { getUserByUid } from "../../services/userService";
import InterviewItem from "../../components/interview/InterviewItem";

function InterviewDetailPage() {
  const { interviewId } = useParams();
  // const { user } = useSelector((state) => state.auth);

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 해당 인터뷰의 질문 불러오기
        const questions = await getQuestionsById(Number(interviewId));

        // 수강생 정보 불러오기
        const student = questions[0]?.studentUid
          ? await getUserByUid(questions[0].studentUid)
          : null;

        setInterview({
          interviewId: Number(interviewId),
          projectTitle: questions[0]?.projectTitle || "",
          lectureTitle: questions[0]?.lectureTitle || "",
          submitDate: questions[0]?.submitDate || "",
          student,
          questions,
          comments: questions[0]?.comments || [],
        });
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [interviewId]);

  if (loading) return <div className="content">불러오는 중...</div>;
  if (!interview)
    return <div className="content">인터뷰를 찾을 수 없습니다.</div>;

  return (
    <div className="content">
      <InterviewItem interview={interview} mode="teacherdetail" currentUser={user} />
    </div>
  );
}

export default InterviewDetailPage;
