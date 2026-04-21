import { useState } from "react";
import "./InterviewForm.css";
import InterviewQuestion from "./InterviewQuestion";

const initialQuestions = [
  { value: "", error: "" },
  { value: "", error: "" },
  { value: "", error: "" },
];

function InterviewForm({ projectInfo, onSubmit, onCancel, lectureName }) {
  const [questions, setQuestions] = useState(initialQuestions);

  // 질문 변경
  const handleQuestionChange = (index, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, value, error: "" } : q)),
    );
  };

  // 질문 추가
  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, { value: "", error: "" }]);
  };

  // 유효성 검사
  const validate = () => {
    let isValid = true;
    const updated = questions.map((q) => {
      if (!q.value.trim()) {
        isValid = false;
        return { ...q, error: "질문을 입력해주세요" };
      }
      return { ...q, error: "" };
    });
    setQuestions(updated);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit?.({
      ...projectInfo,
      questions: questions.map((q) => q.value),
    });
  };

  return (
    <div className="interviewform-wrap">
      <div className="interviewform-page-title-area">
        <h1 className="interviewform-page-title">모의 면접 등록</h1>
        <p className="interviewform-page-subtitle">
          수강생에게 제공할 모의 면접 문제를 등록하세요
        </p>
      </div>

      {/* 프로젝트 정보 */}
      <div className="interviewform-section">
        <h2 className="interviewform-section-title">프로젝트 정보</h2>

        <div className="interviewform-info-field">
          <span className="interviewform-info-label">프로젝트명</span>
          <p className="interviewform-info-val interviewform-info-val-bold">
            {projectInfo?.projectTitle || "(수강생의 프로젝트 명)"}
          </p>
        </div>

        <div className="interviewform-info-row">
          <div className="interviewform-info-field">
            <span className="interviewform-info-label">강의명</span>
            <p className="interviewform-info-val">{lectureName || "-"}</p>
          </div>
          <div className="interviewform-info-field">
            <span className="interviewform-info-label">제출일</span>
            <p className="interviewform-info-val">{projectInfo?.createdAt || "-"}</p>
          </div>
        </div>

        <div className="interviewform-info-field">
          <span className="interviewform-info-label">프로젝트 설명</span>
          <p className="interviewform-info-val interviewform-info-desc">
            요구사항: <br/>
            {projectInfo?.requireDetail || "-"} <br/>
            <br/>
            주요 기능: <br/>
            {projectInfo?.feature || "-"} <br/>
            <br/>
            문제사항: <br/>
            {projectInfo?.problem || "-"} <br/>
            <br/>
            해결방법: <br/>
            {projectInfo?.solution || "-"} <br/>
            <br/>
            프로젝트 링크: <br/>
            {projectInfo?.projectLink || "-"} <br/>
          </p>
        </div>
      </div>

      {/* 면접 질문 */}
      <InterviewQuestion
        questions={questions}
        onChange={handleQuestionChange}
        onAdd={handleAddQuestion}
      />

      {/* 하단 버튼 */}
      <div className="interviewform-btn-row">
        <button className="interviewform-cancel-btn" type="button" onClick={onCancel}>
          취소
        </button>
        <button className="interviewform-submit-btn" type="button" onClick={handleSubmit}>
          면접 등록
        </button>
      </div>
    </div>
  );
}

export default InterviewForm;
