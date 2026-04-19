import { useNavigate, useLocation } from "react-router-dom";
import { createQuestion } from "../../services/questionService";
import InterviewForm from "../../components/interview/InterviewForm";
import useModal from "../../hooks/useModal";

function InterviewRegistPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { modal, openModal } = useModal();

  const projectInfo = location.state?.projectInfo || null;

  const handleSubmit = async (data) => {
    try {
      await Promise.all(
        data.questions.map((q) =>
          createQuestion({
            lectureId: projectInfo.lectureId,
            projectId: projectInfo.projectId,
            projectTitle: projectInfo.projectTitle,
            lectureTitle: projectInfo.lectureTitle,
            submitDate: projectInfo.submitDate,
            projectDesc: projectInfo.projectDesc,
            studentUid: projectInfo.studentUid,
            question: q,
            status: "waiting",
          }),
        ),
      );
      openModal("CHECK", {
        mainMsg: "등록 완료",
        subMsg: "모의면접이 등록되었습니다!",
        onConfirm: () => navigate(-1), // 확인 버튼 누르면 이동
      });
    } catch (err) {
      console.error("모의면접 등록 실패:", err);
      openModal("WARNING", {
        mainMsg: "등록 실패",
        subMsg: "모의면접 등록 중 오류가 발생했습니다.",
      });
    }
  };

  const handleCancel = () => {
    openModal("CONFIRM", {
      mainMsg: "등록 취소",
      subMsg: "모의면접 등록을 취소하시겠습니까?",
      onConfirm: () => navigate(-1),
    });
  };

  return (
    <>
      {modal}
      <div className="content">
        <form
          className="interview-regist-page"
          onSubmit={(e) => e.preventDefault()}
        >
          <InterviewForm
            projectInfo={projectInfo}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </form>
      </div>
    </>
  );
}

export default InterviewRegistPage;
