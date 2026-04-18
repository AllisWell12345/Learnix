import { useNavigate, useLocation } from "react-router-dom";
import InterviewForm from "../../components/interview/InterviewForm";

function InterviewRegistPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 프로젝트 정보는 이전 페이지에서 navigate state로 전달받음
  const projectInfo = location.state?.projectInfo || null;

  const handleSubmit = (data) => {
    console.log("면접 등록 데이터:", data);
    // TODO: Firebase에 데이터 저장
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="content">
      <form className="interview-regist-page" onSubmit={(e) => e.preventDefault()}>
        <InterviewForm
          projectInfo={projectInfo}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </form>
    </div>
  );
}

export default InterviewRegistPage;
