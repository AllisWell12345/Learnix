import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registTemplate } from "../../store/projectSlice";
import TemplateForm from "../../components/project/TemplateForm";
import useModal from "../../hooks/useModal";

function TemplateProjectRegistPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lectureId } = useParams();
  const { modal, openModal } = useModal();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    require: "",
    limit: "",
    guideLine: "",
    reference: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegist = () => {
    openModal("CONFIRM", {
      mainMsg: "템플릿을 등록하시겠습니까?",
      onConfirm: () => {
        dispatch(registTemplate({ ...formData, lectureId:Number(lectureId) })).then(() =>
          navigate(-1),
        );
      },
    });
  };

  return (
    <div className="content">
      {modal}
      <TemplateForm
        title="프로젝트 템플릿 등록"
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleRegist}
        handleCancel={() => navigate(-1)}
      />
    </div>
  );
}
export default TemplateProjectRegistPage;
