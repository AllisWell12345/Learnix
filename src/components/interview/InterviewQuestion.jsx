import "./InterviewForm.css";

function InterviewQuestion({ questions, onChange, onAdd }) {
  return (
    <div className="interviewform-section">
      <div className="interviewform-section-header">
        <h2 className="interviewform-section-title">면접 질문</h2>
        <button className="interviewform-add-btn" type="button" onClick={onAdd}>
          + 질문 추가
        </button>
      </div>

      {questions.map((q, index) => (
        <div className="interviewform-field" key={index}>
          <label className="interviewform-label">
            질문 {index + 1} <span className="interviewform-required">*</span>
          </label>
          <textarea
            className={`interviewform-textarea ${q.error ? "interviewform-error-border" : ""}`}
            placeholder={`${index + 1}번 질문을 입력하세요`}
            value={q.value}
            onChange={(e) => onChange(index, e.target.value)}
          />
          {q.error && <p className="interviewform-error-msg">{q.error}</p>}
        </div>
      ))}

      <p className="interviewform-hint">* 최소 3개 이상의 질문을 입력해야합니다.</p>
    </div>
  );
}

export default InterviewQuestion;