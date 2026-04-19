import React from "react";
import "./TemplateForm.css";

function TemplateForm({
  formData,
  handleChange,
  handleSubmit,
  handleCancel,
  title,
}) {
  if (!formData) {
    return <div className="content">데이터를 불러오는 중입니다...</div>;
  }

  return (
    <div className="template-form-wrap">
      <div className="temp-form-card">
        <p className="temp-form-title">{title || "프로젝트 템플릿 설정"}</p>

        <div className="temp-form-body">
          <div className="temp-form-item topic-section">
            <label className="temp-form-label">프로젝트 주제 *</label>
            <input
              type="text"
              name="title"
              className="temp-form-input topic-input"
              placeholder="프로젝트 주제를 입력하세요"
              value={formData.title || ""}
              onChange={handleChange}
            />
          </div>

          <hr className="form-div" />

          <div className="temp-form-item">
            <label className="temp-form-label">1. 프로젝트 설명 *</label>
            <textarea
              name="content"
              className="temp-form-textarea"
              placeholder="상세 설명을 입력하세요"
              value={formData.content || ""}
              onChange={handleChange}
            />
          </div>

          <div className="temp-form-item">
            <label className="temp-form-label">2. 프로젝트 요구사항 *</label>
            <textarea
              name="require"
              className="temp-form-textarea"
              placeholder="반드시 구현해야 하는 기능을 입력하세요"
              value={formData.require || ""}
              onChange={handleChange}
            />
          </div>

          <div className="temp-form-item">
            <label className="temp-form-label">3. 프로젝트 제약사항 *</label>
            <textarea
              name="limit"
              className="temp-form-textarea"
              placeholder="기술 스택이나 마감 기한 등을 입력하세요"
              value={formData.limit || ""}
              onChange={handleChange}
            />
          </div>

          <div className="temp-form-item">
            <label className="temp-form-label">4. 가이드라인 (선택)</label>
            <textarea
              name="guideLine"
              className="temp-form-textarea"
              placeholder="참고할 순서나 팁을 적어주세요"
              value={formData.guideLine || ""}
              onChange={handleChange}
            />
          </div>

          <div className="temp-form-item">
            <label className="temp-form-label">5. 참고자료 (선택)</label>
            <input
              type="text"
              name="reference"
              className="temp-form-input"
              placeholder="참고 URL을 입력하세요"
              value={formData.reference || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="temp-form-btn-group">
          <button className="temp-form-btn-submit" onClick={handleSubmit}>
            저장하기
          </button>
          <button className="temp-form-btn-cancel" onClick={handleCancel}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplateForm;
