import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../../store/interviewSlice";
import "./InterviewItem.css";
import review from "../../assets/img/common/reviewIcon.svg";
import send from "../../assets/img/Icon/SendIcon.svg";
import calendar from "../../assets/img/Icon/CalendarIcon.png";

function InterviewItem({ interview, mode, currentUser, onRegist, onDetail }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const isTeacher = currentUser?.role === "teacher";

  // 댓글 등록
  const handleAddComment = () => {
    if (!commentText.trim()) return;
    dispatch(
      addComment({
        interviewId: interview.interviewId,
        comment: {
          commentId: Date.now(),
          author: currentUser?.name || "익명",
          role: currentUser?.role || "student",
          date: new Date().toLocaleString("ko-KR"),
          content: commentText,
        },
      }),
    );
    setCommentText("");
  };

  // 댓글 수정 시작
  const handleEditStart = (comment) => {
    setEditId(comment.commentId);
    setEditText(comment.content);
  };

  // 댓글 수정 완료
  const handleEditDone = (commentId) => {
    dispatch(
      updateComment({
        interviewId: interview.interviewId,
        commentId,
        content: editText,
      }),
    );
    setEditId(null);
    setEditText("");
  };

  // 댓글 삭제
  const handleDelete = (commentId) => {
    dispatch(
      deleteComment({
        interviewId: interview.interviewId,
        commentId,
      }),
    );
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
              <img src={StudentIcon} className="ii-icon" alt="수강생" />
              수강생: {interview.student?.name}
            </span>
            <span className="ii-list-meta-item">
              <img src={CalendarIcon} className="ii-icon" alt="제출일" />
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
  if (mode === "teacherdetail") {
    return (
      <div className="interviewitem-wrap">
        {/* 상단 제목 */}
        <h1 className="interviewitem-main-title">{interview.projectTitle}</h1>

        {/* 프로젝트 정보 + 수강생 정보 */}
        <div className="interviewitem-info-row">
          {/* 프로젝트 정보 */}
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
              <p className="interviewitem-info-val">{interview.lectureTitle}</p>
            </div>
          </div>

          {/* 수강생 정보 */}
          <div className="interviewitem-card interviewitem-student-card">
            <p className="interviewitem-card-title">수강생 정보</p>
            <div className="interviewitem-info-field">
              <span className="interviewitem-info-label">이름</span>
              <p className="interviewitem-info-val interviewitem-info-bold">
                {interview.student.name}
              </p>
            </div>
            <div className="interviewitem-info-field">
              <span className="interviewitem-info-label">이메일</span>
              <p className="interviewitem-info-val">
                {interview.student.email}
              </p>
            </div>
            <div className="interviewitem-info-field">
              <div className="interviewitem-date-label">
                <img src={calendar} alt="댓글" className="interviewitem-icon" />
                제출일
              </div>
              <p className="interviewitem-info-val">{interview.submitDate}</p>
            </div>
          </div>
        </div>

        {/* 면접 질문 + 답변 */}
        <div className="interviewitem-card">
          <p className="interviewitem-card-title">면접 질문</p>
          <div className="interviewitem-qa-list">
            {interview.questions.map((qa, index) => (
              <div className="interviewitem-qa-item" key={index}>
                <p className="interviewitem-question">
                  질문 {index + 1}. {qa.question}
                </p>
                <p className="interviewitem-answer-label">답변 :</p>
                <textarea
                  className="interviewitem-answer-input"
                  value={qa.answer}
                  readOnly={!isTeacher}
                  placeholder="답변을 입력하세요"
                />
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
                    {/* 강사 본인 댓글이면 수정/삭제 */}
                    {isTeacher && comment.role === "teacher" && (
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
                    )}
                    {/* 본인이 아닌 댓글엔 신고 */}
                    {!(isTeacher && comment.role === "teacher") && (
                      <button className="interviewitem-report-btn">신고</button>
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
    );
  }

  // ===== 강사 detail 모드 =====
  if (mode === "teacherdetail") {
    return (
      <div className="interviewitem-wrap">
        {/* 상단 제목 */}
        <h1 className="interviewitem-main-title">{interview.projectTitle}</h1>

        {/* 프로젝트 정보 + 수강생 정보 */}
        <div className="interviewitem-info-row">
          {/* 프로젝트 정보 */}
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
              <p className="interviewitem-info-val">{interview.lectureTitle}</p>
            </div>
          </div>

          {/* 수강생 정보 */}
          <div className="interviewitem-card interviewitem-student-card">
            <p className="interviewitem-card-title">수강생 정보</p>
            <div className="interviewitem-info-field">
              <span className="interviewitem-info-label">이름</span>
              <p className="interviewitem-info-val interviewitem-info-bold">
                {interview.student.name}
              </p>
            </div>
            <div className="interviewitem-info-field">
              <span className="interviewitem-info-label">이메일</span>
              <p className="interviewitem-info-val">
                {interview.student.email}
              </p>
            </div>
            <div className="interviewitem-info-field">
              <div className="interviewitem-date-label">
                <img src={calendar} alt="댓글" className="interviewitem-icon" />
                제출일
              </div>
              <p className="interviewitem-info-val">{interview.submitDate}</p>
            </div>
          </div>
        </div>

        {/* 면접 질문 + 답변 */}
        <div className="interviewitem-card">
          <p className="interviewitem-card-title">면접 질문</p>
          <div className="interviewitem-qa-list">
            {interview.questions.map((qa, index) => (
              <div className="interviewitem-qa-item" key={index}>
                <p className="interviewitem-question">
                  질문 {index + 1}. {qa.question}
                </p>
                <p className="interviewitem-answer-label">답변 :</p>
                <textarea
                  className="interviewitem-answer-input"
                  value={qa.answer}
                  readOnly={!isTeacher}
                  placeholder="답변을 입력하세요"
                />
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
                    {/* 강사 본인 댓글이면 수정/삭제 */}
                    {isTeacher && comment.role === "teacher" && (
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
                    )}
                    {/* 본인이 아닌 댓글엔 신고 */}
                    {!(isTeacher && comment.role === "teacher") && (
                      <button className="interviewitem-report-btn">신고</button>
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
    );
  }
}

export default InterviewItem;
