import "./InterviewPracticePage.css";

function InterviewPracticePage() {
  return (
    <div className="practice-container">
      <div className="practice-card">
        <div className="question-wrapper">
          <div className="question-header">
            <span className="question-text">
              1. 1분 자기소개를 시작해주세요.
            </span>
            <span className="timer">1 : 29</span>
          </div>

          <textarea className="answer-input" placeholder="답변을 입력하세요" />
        </div>

        <div className="button-area">
          <button className="next-action-btn">다음 문제</button>
        </div>
      </div>
    </div>
  );
}

export default InterviewPracticePage;
