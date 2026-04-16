import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProjectForm.css";

function ProjectForm() {
  const navigate = useNavigate();
  const { lectureid } = useParams();

  const [formData, setFormData] = useState({
    topic: "",
    desc: "",
    requirements: "",
    constraints: "",
    guideline: "",
    reference: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("제출 데이터:", formData);
    alert("등록되었습니다.");
    navigate(-1);
  };

  return (
    <div className="content">
      <div className="proj-form-container">
        <div className="proj-form-card">
          <h2 className="proj-form-title">프로젝트 결과 보고서</h2>

          <div className="proj-form-body">
            <div className="proj-form-item topic-section">
              <label className="proj-form-label">주제</label>
              <input
                type="text"
                name="topic"
                className="proj-form-input topic-input"
                placeholder="프로젝트 주제를 입력하세요"
                value={formData.topic}
                onChange={handleChange}
              />
            </div>

            <hr className="form-divider" />

            <div className="proj-form-item">
              <label className="proj-form-label">1. 프로젝트 설명</label>
              <textarea
                name="desc"
                className="proj-form-textarea"
                value={formData.desc}
                onChange={handleChange}
              />
            </div>

            <div className="proj-form-item">
              <label className="proj-form-label">2. 요구 사항</label>
              <textarea
                name="requirements"
                className="proj-form-textarea"
                value={formData.requirements}
                onChange={handleChange}
              />
            </div>

            <div className="proj-form-item">
              <label className="proj-form-label">3. 제약 사항</label>
              <textarea
                name="constraints"
                className="proj-form-textarea"
                value={formData.constraints}
                onChange={handleChange}
              />
            </div>

            <div className="proj-form-item">
              <label className="proj-form-label">4. 가이드 라인</label>
              <textarea
                name="guideline"
                className="proj-form-textarea"
                value={formData.guideline}
                onChange={handleChange}
              />
            </div>

            <div className="proj-form-item">
              <label className="proj-form-label">5. 참고자료</label>
              <textarea
                name="reference"
                className="proj-form-textarea"
                value={formData.reference}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="proj-form-btn-group">
            <button className="proj-form-btn-submit" onClick={handleSubmit}>
              작성
            </button>
            <button
              className="proj-form-btn-cancel"
              onClick={() => navigate(-1)}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
