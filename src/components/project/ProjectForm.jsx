import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProjectForm.css";
import useModal from "../../hooks/useModal";

function ProjectForm() {
  const navigate = useNavigate();
  const { lectureid } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    requireDetail: "",
    feature: "",
    problem: "",
    solution: "",
    projectLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { modal, openModal } = useModal();

  const handleTwoTest = () => {
    openModal("CONFIRM", {
      mainMsg: "프로젝트 작성을 완료하시겠습니까?",
      subMsg: "저장 후 프로젝트 목록으로 이동합니다.",
      onConfirm: async () => {
        // 파이어베이스 연동 후 추가
        console.log("제출 데이터:", formData);
        navigate(-1);
      },
    });
  };

  const handleDeleteTest = () => {
    openModal("WARNING", {
      mainMsg: "작성을 취소하시겠습니까?",
      subMsg: "작성 중인 내용은 저장되지 않습니다.",
      onConfirm: async () => {
        navigate(-1);
      },
    });
  };

  return (
    <div className="content">
      {modal}
      <div className="proj-form-container">
        <div className="proj-form-card">
          <p className="proj-form-title">프로젝트 보고서</p>

          <div className="proj-form-body">
            <div className="proj-form-item topic-section">
              <label className="proj-form-label">제목 *</label>
              <input
                type="text"
                name="title"
                className="proj-form-input topic-input"
                placeholder="프로젝트 주제를 입력하세요"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <hr className="form-div" />

            <div className="proj-form-item">
              <label className="proj-form-label">1. 요구사항 분석 *</label>
              <textarea
                name="requireDetail"
                className="proj-form-textarea"
                value={formData.requireDetail}
                onChange={handleChange}
              />
            </div>

            <div className="proj-form-item">
              <label className="proj-form-label">2. 주요 기능 *</label>
              <textarea
                name="feature"
                className="proj-form-textarea"
                value={formData.feature}
                onChange={handleChange}
              />
            </div>

            <div className="proj-form-item">
              <label className="proj-form-label">
                3. 기능 구현 중 발생한 문제 *
              </label>
              <textarea
                name="problem"
                className="proj-form-textarea"
                value={formData.problem}
                onChange={handleChange}
              />
            </div>

            <div className="proj-form-item">
              <label className="proj-form-label">4. 문제 해결 방법 *</label>
              <textarea
                name="solution"
                className="proj-form-textarea"
                value={formData.solution}
                onChange={handleChange}
              />
            </div>

            <div className="proj-form-item">
              <label className="proj-form-label">5. 프로젝트 링크 *</label>
              <input
                type="text"
                name="projectLink"
                className="proj-form-input"
                value={formData.projectLink}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="proj-form-btn-group">
            <button className="proj-form-btn-submit" onClick={handleTwoTest}>
              작성
            </button>
            <button className="proj-form-btn-cancel" onClick={handleDeleteTest}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
