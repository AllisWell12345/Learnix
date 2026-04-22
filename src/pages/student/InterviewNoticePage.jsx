import { useNavigate, useParams } from "react-router-dom";
import "./InterviewNoticePage.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProjectByUserAndLecture } from "../../services/projectService";
import useModal from "../../hooks/useModal";

function InterviewNoticePage() {
  const { lectureId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const { modal, openModal } = useModal();

  useEffect(() => {
    const fetchProjectTitle = async () => {
      if (!currentUser?.userId || !lectureId) return;
      try {
        setLoading(true);
        const currentProject = await getProjectByUserAndLecture(
          currentUser.userId,
          lectureId,
        );
        setProjectTitle(currentProject.title);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectTitle();
    return;
  }, [currentUser, lectureId]);

  const handleMovePractice = () => {
    openModal("CONFIRM", {
      mainMsg : "모의 면접을 시작하시겠습니까?",
      subMsg : "확인 버튼을 누르면\n 면접이 바로 시작됩니다.",
      onConfirm : () => {
        navigate(`/student/portfolio/interview/${lectureId}/practice`);
      }
    })
  }

  return (
    <div className="interview-notice-container">
      {modal}
      <div className="interview-notice-card">
        {loading ? (
          <h1 className="loading">불러오는 중...</h1>
        ) : (
          <h1 className="interview-project-title">
            프로젝트 명 : {projectTitle}
          </h1>
        )}

        <div className="interview-guide-box">
          <p>
            1. 해당 콘텐츠는 수강생의 프로젝트 결과물을 분석 및 평가하고 강사가
            직접 작성한 모의 면접입니다.
          </p>
          <p>
            2. 각 질문마다 답변을 작성하는데 강사가 설정한 제한 시간이
            존재합니다.
          </p>
          <p>
            3. 해당 모의 면접은 구두가 아닌 텍스트로 진행되는 점을 고려하여,
            설정된 제한시간에 30초정도의 여유시간이 주어집니다.
          </p>
          <p>
            4. 시작 하자마자 첫 번째 질문이 나타남과 동시에 제한 시간이
            시작됩니다.
          </p>
          <p>
            5. 답변 완료 버튼을 누르거나 제한 시간이 종료되면 답변 입력란이
            비활성화되고 다음 질문 시작 버튼이 활성화됩니다.
          </p>
          <p>
            6. 다음 질문 시작 버튼을 누르면 다음 질문이 나타남과 동시에 제한
            시간이 시작됩니다.
          </p>
          <p>
            7. 모의 면접이 종료되면 내 포트폴리오 탭의 모의 면접 탭에서 확인이
            가능합니다.
          </p>
          <p>8. 모의 면접 결과는 강사와 수강생만 열람이 가능합니다.</p>
        </div>

        <div className="interview-action-area">
          <button className="interview-start-btn" onClick={handleMovePractice}>시작</button>
        </div>
      </div>
    </div>
  );
}

export default InterviewNoticePage;
