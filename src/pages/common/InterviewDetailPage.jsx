import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import InterviewItem from "../../components/interview/InterviewItem";

function InterviewDetailPage() {
  const { interviewId } = useParams();
  const { interviews } = useSelector((state) => state.interview);
  // const { user } = useSelector((state) => state.auth); // 현재 로그인 유저

  const interview = interviews.find((i) => i.interviewId === Number(interviewId));

  if (!interview) return <div className="content">인터뷰를 찾을 수 없습니다.</div>;

  return (
    <div className="content">
      <InterviewItem  />
      {/* interview={interview} currentUser={user} */}
    </div>
  );
}

export default InterviewDetailPage;
