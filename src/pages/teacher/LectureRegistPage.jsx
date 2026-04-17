import { useNavigate } from "react-router-dom";
import LectureForm from "../../components/lecture/LectureForm";

function LectureRegistPage() {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log("등록 데이터:", data);
    // TODO: Firebase에 데이터 저장
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="content"> 강의 등록
      <LectureForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

export default LectureRegistPage;