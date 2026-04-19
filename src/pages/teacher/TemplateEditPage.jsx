import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTemplateDetail,
  clearProjectState,
} from "../../store/projectSlice";
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

  if (status === "loading") return <div className="content">로딩 중...</div>;

  return (
    <div className="content">
      <TemplateForm
        title="프로젝트 템플릿 수정"
        formData={formData}
        handleChange={handleChange}
        handleSubmit={() => navigate(-1)}
        handleCancel={() => navigate(-1)}
      />
    </div>
  );
}
export default TemplateEditPage;
