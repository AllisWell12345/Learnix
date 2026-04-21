import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDraftProject } from "../../store/projectSlice";
import useModal from "../../hooks/useModal";
import "./ProjectForm.css";

function ProjectForm({ mode = "regist" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lectureId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const draftProject = useSelector((state) => state.project.draftProject);
  const { modal, openModal } = useModal();

  const [formData, setFormData] = useState({
    title: "",
    requireDetail: "",
    feature: "",
    problem: "",
    solution: "",
    projectLink: "",
  });

  useEffect(() => {
    if (mode === "edit" && draftProject) {
      setFormData({
        title: draftProject.title || "",
        requireDetail: draftProject.requireDetail || "",
        feature: draftProject.feature || "",
        problem: draftProject.problem || "",
        solution: draftProject.solution || "",
        projectLink: draftProject.projectLink || "",
      });
    }
  }, [mode, draftProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProject = () => {
    if (!formData.title.trim() || !formData.requireDetail.trim()) {
      openModal("ERROR", {
        mainMsg: "필수 항목을 입력해주세요.",
        subMsg: "제목과 요구사항 분석은 필수입니다.",
      });
      return;
    }

    openModal("CONFIRM", {
      mainMsg:
        mode === "edit"
          ? "프로젝트 수정을 완료하시겠습니까?"
          : "프로젝트 작성을 완료하시겠습니까?",
      subMsg: "저장 후 프로젝트 페이지로 이동합니다.",
      onConfirm: () => {
        try {
          dispatch(
            setDraftProject({
              ...formData,
              userId: Number(currentUser?.userId),
              lectureId: Number(lectureId),
            }),
          );

          navigate(`/student/mylec/${lectureId}/myproj`);
        } catch (error) {
          console.error("임시 저장 실패:", error);
          openModal("ERROR", {
            mainMsg: "저장에 실패했습니다.",
            subMsg: "잠시 후 다시 시도해주세요.",
          });
        }
      },
    });
  };

  const handleCancel = () => {
    openModal("WARNING", {
      mainMsg: "작성을 취소하시겠습니까?",
      subMsg: "작성 중인 내용은 저장되지 않습니다.",
      onConfirm: () => navigate(-1),
    });
  };

  const renderField = (label, name, placeholder, isTextArea = true) => (
    <div className="proj-form-item">
      <label className="proj-form-label">{label}</label>
      {isTextArea ? (
        <textarea
          name={name}
          className="proj-form-textarea"
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
        />
      ) : (
        <input
          type="text"
          name={name}
          className={`proj-form-input ${name === "title" ? "topic-input" : ""}`}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
        />
      )}
    </div>
  );

  return (
    <div className="content">
      {modal}
      <div className="proj-form-container">
        <div className="proj-form-card">
          <p className="proj-form-title">프로젝트 보고서</p>

          <div className="proj-form-body">
            {renderField(
              "제목 *",
              "title",
              "프로젝트 주제를 입력하세요",
              false,
            )}
            <hr className="form-div" />
            {renderField(
              "1. 요구사항 분석 *",
              "requireDetail",
              "프로젝트의 핵심 요구사항을 적어주세요",
            )}
            {renderField(
              "2. 주요 기능 *",
              "feature",
              "구현한 주요 기능을 나열해주세요",
            )}
            {renderField(
              "3. 발생한 문제 *",
              "problem",
              "개발 중 어려웠던 점은 무엇인가요?",
            )}
            {renderField(
              "4. 해결 방법 *",
              "solution",
              "문제를 어떻게 해결했는지 설명해주세요",
            )}
            {renderField(
              "5. 프로젝트 링크 *",
              "projectLink",
              "GitHub 링크나 배포 URL을 입력하세요",
              false,
            )}
          </div>

          <div className="proj-form-btn-group">
            <button
              className="proj-form-btn-submit"
              onClick={handleSaveProject}
            >
              {mode === "edit" ? "수정 완료" : "작성 완료"}
            </button>
            <button className="proj-form-btn-cancel" onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
