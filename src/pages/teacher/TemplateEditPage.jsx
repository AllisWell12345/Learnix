import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTemplateDetail,
  clearProjectState,
  registTemplate,
} from "../../store/projectSlice";
import { updateTemplate } from "../../services/templateService";
import TemplateForm from "../../components/project/TemplateForm";
import useModal from "../../hooks/useModal";

function TemplateEditPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal, openModal } = useModal();
  const { lectureId } = useParams();
  const { currentTemplate, status } = useSelector((state) => state.project);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    require: "",
    limit: "",
    guideLine: "",
    reference: "",
  });

  useEffect(() => {
    dispatch(fetchTemplateDetail(lectureId));
    return () => dispatch(clearProjectState());
  }, [dispatch, lectureId]);

  useEffect(() => {
    if (currentTemplate) setFormData(currentTemplate);
  }, [currentTemplate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    try {
      await updateTemplate(currentTemplate.templateId, formData);

      openModal("CHECK", {
        mainMsg: "수정이 완료되었습니다.",
        subMsg: "이전 페이지로 이동합니다.",
        onConfirm: () => navigate(-1),
      });
    } catch (error) {
      console.error("수정 실패:", error);
      openModal("WARNING", {
        mainMsg: "수정 중 오류가 발생했습니다.",
        subMsg: "잠시 후 다시 시도해 주세요.",
        onConfirm: () => console.log("수정 에러 확인"),
      });
    }
  };

  if (status === "loading") return <div className="content"><div className="loading">불러오는 중...</div></div>;

  return (
    <div className="content">
      {modal}
      <TemplateForm
        title="프로젝트 템플릿 수정"
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSave}
        handleCancel={() => navigate(-1)}
      />
    </div>
  );
}

export default TemplateEditPage;
