import { useNavigate } from "react-router-dom";
import LectureForm from "../../components/lecture/LectureForm";
import './LectureRegistPage.css'

function LectureRegistPage() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="content">
      <LectureForm mode="regist" onCancel={handleCancel} />
    </div>
  );
}

export default LectureRegistPage;
