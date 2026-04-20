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

function TemplateEditPage() {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const dispatch = useDispatch();
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

      alert("수정되었습니다!");

      navigate(-1);
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  if (status === "loading") return <div className="content">로딩 중...</div>;

  return (
    <div className="content">
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
