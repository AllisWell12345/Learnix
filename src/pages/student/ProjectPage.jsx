import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplateDetail } from "../../store/projectSlice";
import "./ProjectPage.css";

function ProjectPage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const template = useSelector((state) => state.project.currentTemplate);

  useEffect(() => {
    dispatch(fetchTemplateDetail(lectureId));
  }, [dispatch, lectureId]);

  return (
    <div className="content">
      <div className="proj-container">
        <div className="proj-left-card">
          <div className="proj-card-header">프로젝트 템플릿</div>
          {template ? (
            <div className="proj-guide-list">
              <div className="proj-topic-box">주제: {template.title}</div>
              <p>1. 설명: {template.content}</p>
              <p>2. 요구 사항: {template.require}</p>
              <p>3. 제약 사항: {template.limit}</p>
              <p>4. 가이드 라인: {template.guideLine}</p>
            </div>
          ) : (
            <p className="no-data">등록된 가이드가 없습니다.</p>
          )}
        </div>
        <div className="proj-right-card">
          <div className="proj-card-header">프로젝트 결과 보고서</div>
          <button
            className="proj-write-btn"
            onClick={() =>
              navigate(`/student/mylec/${lectureId}/myproj/regist`)
            }
          >
            ＋ 작성하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProjectPage;
