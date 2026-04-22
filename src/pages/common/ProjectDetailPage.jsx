import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectDetail } from "../../store/projectSlice";
import ProjectItem from "../../components/project/ProjectItem";
import review from "../../assets/img/common/reviewIcon.svg";
import send from "../../assets/img/Icon/SendIcon.svg";
import useModal from "../../hooks/useModal";
import { updateProject } from "../../services/projectService";

function ProjectDetailPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { currentProject, status } = useSelector((state) => state.project);
  const [onStatus, setOnStatus] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const { modal, openModal } = useModal();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isManager = currentUser?.role === "manager";

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectDetail(projectId));
    }
  }, [dispatch, projectId]);

  const handleAddComment = () => {
    openModal("CONFIRM", {
      mainMsg: "댓글을 등록하시겠습니까?",
      subMsg: "댓글을 등록하면 해당 프로젝트는 리뷰 완료 상태가 됩니다.",
      onConfirm: async () => {
        try {
          setCommenting(true);
          await updateProject(projectId, {
            ...currentProject,
            status: "completed",
          });
          setOnStatus(true);
          openModal("CHECK", {
            mainMsg: "등록이 완료되었습니다.",
          });
        } catch (error) {
          console.error("댓글 등록 실패:", error);
          openModal("WARNING", {
            mainMsg: "댓글 등록 실패",
            subMsg: "잠시 후 다시 시도해주세요.",
          });
        } finally {
          setCommenting(false);
        }
      },
    });
  };

  if (status === "loading")
    return (
      <div className="content">
        <div className="loading">로딩 중...</div>
      </div>
    );

  if (!currentProject)
    return <div className="content">프로젝트를 찾을 수 없습니다.</div>;

  return (
    <div className="pd-container">
      {modal}
      <ProjectItem project={currentProject} mode="detail" />
      <div className="interviewitem-card">
        <div className="interviewitem-comment-header">
          <img src={review} alt="댓글" className="interviewitem-icon" />
          <p className="interviewitem-card-title">댓글</p>
          <span className="interviewitem-comment-count">
            {onStatus || currentProject.status === "completed" ? 2 : 1}
          </span>
        </div>
        {!isManager && (
          <div className="interviewitem-comment-input-row">
            <input
              className="interviewitem-comment-input"
              type="text"
              placeholder="댓글을 입력하세요..."
            />
            <button
              className="interviewitem-comment-submit-btn"
              onClick={handleAddComment}
            >
              {commenting ? (
                "..."
              ) : (
                <img src={send} alt="댓글" className="interviewitem-icon" />
              )}
            </button>
          </div>
        )}
        {/* 댓글 목록 */}
        <div className="interviewitem-comment-list">
          {onStatus || currentProject.status === "completed" ? (
            <div
              className={`interviewitem-comment-item interviewitem-comment-teacher`}
            >
              <div className="interviewitem-comment-top">
                <div className="interviewitem-comment-author-area">
                  <span className="interviewitem-comment-author">
                    김철수
                    {currentUser.role === "teacher" ? (
                      <span className="interviewitem-teacher-badge">(나)</span>
                    ) : (
                      <span className="interviewitem-teacher-badge">
                        (강사)
                      </span>
                    )}
                  </span>
                  <span className="interviewitem-comment-date">
                    인증 미들웨어에서 토큰 검증 로직은 잘 작성하셨는데, 에러 응답 형식이 일부 컨트롤러와 다르게 처리되고 있습니다.<br></br>
                    응답 포맷을 통일하면 유지보수성이 더 좋아질 것 같습니다.
                  </span>
                </div>
                <div className="interviewitem-comment-actions">
                  {isManager ? (
                    <button className="interviewitem-delete-btn">삭제</button>
                  ) : currentUser.role === "teacher" ? (
                    <>
                      <button className="interviewitem-edit-btn">수정</button>
                      <button className="interviewitem-delete-btn">삭제</button>
                    </>
                  ) : (
                    <button className="interviewitem-report-btn">신고</button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className={`interviewitem-comment-item`}>
            <div className="interviewitem-comment-top">
              <div className="interviewitem-comment-author-area">
                <span className="interviewitem-comment-author">김유리</span>
                <span className="interviewitem-comment-date">
                  저도 처음에 컨트롤러에 로직을 다 넣었는데, 나중에 보니까 너무 복잡해져서 service로 분리했습니다.<br></br>확실히 관리하기 편해지더라고요.
                </span>
              </div>
              <div className="interviewitem-comment-actions">
                {isManager ? (
                  <button className="interviewitem-delete-btn">삭제</button>
                ) : currentUser.role === "teacher" ? (
                  <>
                    <button className="interviewitem-edit-btn">수정</button>
                    <button className="interviewitem-delete-btn">삭제</button>
                  </>
                ) : (
                  <button className="interviewitem-report-btn">신고</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
