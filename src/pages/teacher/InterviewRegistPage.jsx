import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config.js";
import { doc, getDoc } from "firebase/firestore";
import { createQuestion } from "../../services/questionService";
import InterviewForm from "../../components/interview/InterviewForm";
import useModal from "../../hooks/useModal";

function InterviewRegistPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { modal, openModal } = useModal();

  const projectInfo = location.state?.projectInfo || null;
  const [lectureName, setLectureName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLectureName = async () => {
      if (!projectInfo?.lectureId) return;
      try {
        const lecDoc = await getDoc(
          doc(db, "lectures", Number(projectInfo.lectureId)),
        );
        if (lecDoc.exists()) {
          setLectureName(lecDoc.data().title);
        }
      } catch (error) {
        console.error("강의명 로드 실패:", error);
      }
    };
    fetchLectureName();
  }, [projectInfo?.lectureId]);

  const handleSubmit = async (data) => {
    
    openModal("CONFIRM", {
      mainMsg: "모의 면접을\n등록하시겠습니까?",
      onConfirm: async () => {
        try {
          setLoading(true);
          for (const questionText of data.questions) {
            await createQuestion({
              lectureId: projectInfo.lectureId,
              projectId: projectInfo.projectId,
              question: questionText,
            });
          }

          openModal("CHECK", {
            mainMsg: "등록되었습니다.",
            onConfirm: () => navigate(-1),
          });
        } catch (err) {
          console.error("모의면접 등록 실패:", err);

          openModal("WARNING", {
            mainMsg: "등록 실패",
            subMsg: "모의면접 등록 중\n오류가 발생했습니다.",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleCancel = () => {
    openModal("CONFIRM", {
      mainMsg: "등록 취소",
      subMsg: "모의면접 등록을\n 취소하시겠습니까?",
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
            lectureName={lectureName}
            loading = {loading}
          />
        </form>
      </div>
    </>
  );
}

export default InterviewRegistPage;
