import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectDetail } from "../../store/projectSlice";
import ProjectItem from "../../components/project/ProjectItem";
import review from "../../assets/img/common/reviewIcon.svg";
import send from "../../assets/img/Icon/SendIcon.svg";

function ProjectDetailPage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { currentProject, status } = useSelector((state) => state.project);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectDetail(projectId));
    }
  }, [dispatch, projectId]);

  if (status === "loading") return <div className="content">로딩 중...</div>;

  if (!currentProject)
    return <div className="content">프로젝트를 찾을 수 없습니다.</div>;

  return (
    <div className="pd-container">
      <ProjectItem project={currentProject} mode="detail" />
      <div className="interviewitem-card">
        <div className="interviewitem-comment-header">
          <img src={review} alt="댓글" className="interviewitem-icon" />
          <p className="interviewitem-card-title">댓글</p>
          <span className="interviewitem-comment-count">
            0
          </span>
        </div>
        <div className="interviewitem-comment-input-row">
          <input
            className="interviewitem-comment-input"
            type="text"
            placeholder="댓글을 입력하세요..."
          />
          <button
            className="interviewitem-comment-submit-btn"
          >
            <img src={send} alt="댓글" className="interviewitem-icon" />
          </button>
        </div>
        {/* 댓글 목록 */}
        <div className="interviewitem-comment-list">
          <div className={`interviewitem-comment-item`}>
            <div className="interviewitem-comment-top">
              <div className="interviewitem-comment-author-area">
                <span className="interviewitem-comment-author">
                  홍길동
                  <span className="interviewitem-teacher-badge">(나)</span>
                </span>
                <span className="interviewitem-comment-date">답변내용</span>
              </div>
              <div className="interviewitem-comment-actions">
                <button className="interviewitem-edit-btn">수정</button>
                <button className="interviewitem-delete-btn">삭제</button>
                <button className="interviewitem-report-btn">신고</button>
              </div>
            </div>
          </div>
          <div className={`interviewitem-comment-item`}>
            <div className="interviewitem-comment-top">
              <div className="interviewitem-comment-author-area">
                <span className="interviewitem-comment-author">
                  홍길동
                  <span className="interviewitem-teacher-badge">(나)</span>
                </span>
                <span className="interviewitem-comment-date">답변내용</span>
              </div>
              <div className="interviewitem-comment-actions">
                <button className="interviewitem-edit-btn">수정</button>
                <button className="interviewitem-delete-btn">삭제</button>
                <button className="interviewitem-report-btn">신고</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
