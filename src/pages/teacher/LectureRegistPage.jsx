import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import LectureForm from "../../components/lecture/LectureForm";

function LectureRegistPage() {
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);

  const handleSubmit = (data) => {
    console.log("등록 데이터:", data);
    // TODO: Firebase에 데이터 저장
    navigate(-1);
  };

  // const handleSubmit = async (data) => {
  //   try {
  //     await registLecture(data, user.uid);
  //     alert("강의가 등록되었습니다!");
  //     navigate(-1);
  //   } catch (err) {
  //     console.error("강의 등록 실패:", err);
  //     alert("강의 등록 중 오류가 발생했습니다.");
  //   }
  // };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="content">
      강의 등록
      <LectureForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

export default LectureRegistPage;
