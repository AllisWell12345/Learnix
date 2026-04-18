import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import './LectureRegistPage.css'
import LectureForm from "../../components/lecture/LectureForm";

function LectureEditPage() {
  const navigate = useNavigate();
  const { lectureId } = useParams();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="content">
      <LectureForm mode="edit" lectureId={lectureId} onCancel={handleCancel} />
    </div>
  );
}

export default LectureEditPage;
