import { useState } from "react";
import "./InterviewItem.css";
import review from "../../assets/img/common/reviewIcon.svg";
import send from "../../assets/img/Icon/SendIcon.svg";
import calendar from "../../assets/img/Icon/CalendarIcon.png";
import student from "../../assets/img/Icon/CalendarIcon.png";
import useModal from "../../hooks/useModal";

function InterviewItem({ interview, mode, currentUser, onRegist, onDetail }) {
  const [commentText, setCommentText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const { modal, openModal } = useModal();

  const isTeacher = currentUser?.role === "teacher";

  // 댓글 등록
  const handleAddComment = () => {
    if (!commentText.trim()) return;
    // TODO: commentService 연결
    setCommentText("");
  };

  // 댓글 수정 시작
  const handleEditStart = (comment) => {
    setEditId(comment.commentId);
    setEditText(comment.content);
  };

  // 수정 완료 - CONFIRM 모달
  const handleEditDone = (commentId) => {
    openModal("CONFIRM", {
      mainMsg: "댓글 수정",
      subMsg: "댓글을 수정하시겠습니까?",
      onConfirm: () => {
        // TODO: commentService 수정 연결
        setEditId(null);
        setEditText("");
      },
    });
  };

  // 삭제 - DELETE 모달
  const handleDelete = (commentId) => {
    openModal("DELETE", {
      mainMsg: "댓글 삭제",
      subMsg: "댓글을 삭제하시겠습니까?",
      onDelete: () => {
        // TODO: commentService 삭제 연결
      },
    });
  };

  // ===== list 모드 =====
  if (mode === "list") {
    return (
      <div
        className={`ii-list-card ${interview.status !== "waiting" ? "ii-list-card-clickable" : ""}`}
        onClick={() => interview.status !== "waiting" && onDetail?.(interview)}
      >
        <div className="ii-list-info">
          <h4 className="ii-list-title">{interview.projectTitle}</h4>
          <p className="ii-list-lecture">{interview.lectureTitle}</p>
          <div className="ii-list-meta">
            <span className="ii-list-meta-item">
              <img src={student} className="ii-icon" alt="수강생" />
              수강생: {interview.student?.name}
            </span>
            <span className="ii-list-meta-item">
              <img src={calendar} className="ii-icon" alt="제출일" />
              제출일: {interview.submitDate}
            </span>
          </div>
        </div>

        {interview.status === "waiting" && (
          <button
            className="ii-regist-btn"
            onClick={(e) => {
              e.stopPropagation();
              onRegist?.(interview);
            }}
          >
            모의면접 등록
          </button>
        )}
      </div>
    );
  }

  // ===== 강사 detail 모드 =====
  if (mode === "detail") {
    return (
      <>
        {modal}
        <div className="interviewitem-wrap">
          {/* 상단 제목 */}
          <h1 className="interviewitem-main-title">{interview.projectTitle}</h1>

          {/* 프로젝트 + 수강생 정보 - 강사만 수강생 정보 표시 */}
          {isTeacher ? (
            <div className="interviewitem-info-row">
              <div className="interviewitem-card interviewitem-project-card">
                <p className="interviewitem-card-title">프로젝트 정보</p>
                <div className="interviewitem-info-field">
                  <span className="interviewitem-info-label">프로젝트명</span>
                  <p className="interviewitem-info-val interviewitem-info-bold">
                    {interview.projectTitle}
                  </p>
                </div>
                <div className="interviewitem-info-field">
                  <span className="interviewitem-info-label">강의명</span>
                  <p className="interviewitem-info-val">
                    {interview.lectureTitle}
                  </p>
                </div>
              </div>

              <div className="interviewitem-card interviewitem-student-card">
                <p className="interviewitem-card-title">수강생 정보</p>
                <div className="interviewitem-info-field">
                  <span className="interviewitem-info-label">이름</span>
                  <p className="interviewitem-info-val interviewitem-info-bold">
                    {interview.student?.name}
                  </p>
                </div>
                <div className="interviewitem-info-field">
                  <span className="interviewitem-info-label">이메일</span>
                  <p className="interviewitem-info-val">
                    {interview.student?.email}
                  </p>
                </div>
                <div className="interviewitem-info-field">
                  <div className="interviewitem-date-label">
                    <img
                      src={calendar}
                      alt="제출일"
                      className="interviewitem-icon"
                    />
                    제출일
                  </div>
                  <p className="interviewitem-info-val">
                    {interview.submitDate}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // 학생은 프로젝트 정보만
            <div className="interviewitem-card">
              <p className="interviewitem-card-title">프로젝트 정보</p>
              <div className="interviewitem-info-field">
                <span className="interviewitem-info-label">프로젝트명</span>
                <p className="interviewitem-info-val interviewitem-info-bold">
                  {interview.projectTitle}
                </p>
              </div>
              <div className="interviewitem-info-field">
                <span className="interviewitem-info-label">강의명</span>
                <p className="interviewitem-info-val">
                  {interview.lectureTitle}
                </p>
              </div>
            </div>
          )}

          {/* 면접 질문 + 답변 - 텍스트로만 표시 */}
          <div className="interviewitem-card">
            <p className="interviewitem-card-title">면접 질문</p>
            <div className="interviewitem-qa-list">
              {interview.questions.map((qa, index) => (
                <div className="interviewitem-qa-item" key={index}>
                  <p className="interviewitem-question">
                    질문 {index + 1}. {qa.question}
                  </p>
                  <p className="interviewitem-answer-label">답변 :</p>
                  {/* ← textarea 대신 텍스트로 표시 */}
                  <p className="interviewitem-answer-text">
                    {qa.answer || "답변이 없습니다."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 댓글 */}
          <div className="interviewitem-card">
            <div className="interviewitem-comment-header">
              <img src={review} alt="댓글" className="interviewitem-icon" />
              <p className="interviewitem-card-title">댓글</p>
              <span className="interviewitem-comment-count">
                ({interview.comments.length})
              </span>
            </div>

            {/* 댓글 입력 */}
            <div className="interviewitem-comment-input-row">
              <input
                className="interviewitem-comment-input"
                type="text"
                placeholder="댓글을 입력하세요..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              />
              <button
                className="interviewitem-comment-submit-btn"
                onClick={handleAddComment}
              >
                <img src={send} alt="댓글" className="interviewitem-icon" />
              </button>
            </div>

            {/* 댓글 목록 */}
            <div className="interviewitem-comment-list">
              {interview.comments.map((comment) => (
                <div
                  className={`interviewitem-comment-item ${comment.role === "teacher" ? "interviewitem-comment-teacher" : ""}`}
                  key={comment.commentId}
                >
                  <div className="interviewitem-comment-top">
                    <div className="interviewitem-comment-author-area">
                      <span className="interviewitem-comment-author">
                        {comment.author}
                        {comment.role === "teacher" && (
                          <span className="interviewitem-teacher-badge">
                            (나)
                          </span>
                        )}
                      </span>
                      <span className="interviewitem-comment-date">
                        {comment.date}
                      </span>
                    </div>
                    <div className="interviewitem-comment-actions">
                      {/* 본인 댓글이면 수정/삭제 (강사, 학생 모두) */}
                      {comment.authorUid === currentUser?.uid ? (
                        <>
                          <button
                            className="interviewitem-edit-btn"
                            onClick={() => handleEditStart(comment)}
                          >
                            수정
                          </button>
                          <button
                            className="interviewitem-delete-btn"
                            onClick={() => handleDelete(comment.commentId)}
                          >
                            삭제
                          </button>
                        </>
                      ) : (
                        <button className="interviewitem-report-btn">
                          신고
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 수정 모드 */}
                  {editId === comment.commentId ? (
                    <div className="interviewitem-edit-row">
                      <input
                        className="interviewitem-edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button
                        className="interviewitem-edit-done-btn"
                        onClick={() => handleEditDone(comment.commentId)}
                      >
                        완료
                      </button>
                    </div>
                  ) : (
                    <p className="interviewitem-comment-content">
                      {comment.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default InterviewItem;
