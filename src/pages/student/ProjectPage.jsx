import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemplateDetail, clearDraftProject } from "../../store/projectSlice";
import "./ProjectPage.css";
import send from "../../assets/img/Icon/SendIcon.svg";
import useModal from "../../hooks/useModal";
import { createProject } from "../../services/projectService";

function ProjectPage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const template = useSelector((state) => state.project.currentTemplate);
  const draftProject = useSelector((state) => state.project.draftProject);
  const currentUser = useSelector((state) => state.user.currentUser);

  const { modal, openModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchTemplateDetail(lectureId));
  }, [dispatch, lectureId]);

  const handleDeleteProject = () => {
    openModal("DELETE", {
      mainMsg: "삭제하시겠습니까?",
      subMsg: "작성한 내용이 모두 삭제됩니다.",
      onDelete: () => {
        dispatch(clearDraftProject());

        openModal("CHECK", {
          mainMsg: "삭제 되었습니다.",
        });
      },
    });
  };

  const handleSubmitProject = () => {
    if (!draftProject) return;

    openModal("CONFIRM", {
      mainMsg: "제출하시겠습니까?",
      subMsg: "제출한 프로젝트는 더 이상 수정 및 삭제가 불가능합니다.",
      onConfirm: async () => {
        try {
          setIsSubmitting(true);

          const projectData = {
            ...draftProject,
            userId: Number(currentUser?.userId),
            lectureId: Number(lectureId),
            createdAt: new Date().toISOString(),
            status: "waiting",
          };

          await createProject(projectData);

          openModal("CHECK", {
            mainMsg: "제출되었습니다.",
            subMsg: "프로젝트 관리 페이지로 이동합니다.",
            onConfirm: () => {
              navigate(`/student/portfolio/project`);
            },
          });

          dispatch(clearDraftProject());
        } catch (error) {
          console.error("프로젝트 제출 실패:", error);
          openModal("ERROR", {
            mainMsg: "제출에 실패했습니다.",
            subMsg: "잠시 후 다시 시도해주세요.",
          });
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };

  return (
    <div className="content">
      {modal}
      <div className="proj-container">
        <div className="proj-left-card">
          <div className="proj-card-header">프로젝트 템플릿</div>
          {template ? (
            <div className="proj-guide-list">
              <div className="proj-topic-box">주제 : {template.title}</div>
              <p>1. 설명 : {template.content}</p>
              <p>2. 요구 사항 : {template.require}</p>
              <p>3. 제약 사항 : {template.limit}</p>
              <p>4. 가이드 라인 : {template.guideLine}</p>
            </div>
          ) : (
            <p className="no-data">등록된 가이드가 없습니다.</p>
          )}
        </div>

        <div className="proj-right-card">
          <div className="proj-card-header">프로젝트 결과 보고서</div>

          {!draftProject ? (
            <button
              className="proj-write-btn"
              onClick={() =>
                navigate(`/student/mylec/${lectureId}/myproj/regist`)
              }
            >
              ＋ 작성하기
            </button>
          ) : (
            <>
              <div className="proj-right-content">
                <p className="proj-right-text">
                  1. 프로젝트 제목 : {draftProject.title}
                </p>
                <p className="proj-right-text">
                  2. 요구 사항 분석 : {draftProject.requireDetail}
                </p>
                <p className="proj-right-text">
                  3. 주요 기능 : {draftProject.feature}
                </p>
                <p className="proj-right-text">
                  4. 발생한 문제 : {draftProject.problem}
                </p>
                <p className="proj-right-text">
                  5. 해결 방법 : {draftProject.solution}
                </p>
                <p className="proj-right-text">
                  6. 프로젝트 링크 : {draftProject.projectLink}
                </p>
              </div>

              <div className="proj-btn-list">
                <button
                  className="proj-submit-btn"
                  onClick={handleSubmitProject}
                  disabled={isSubmitting}
                >
                  <img src={send} alt="제출" />
                  {isSubmitting ? "제출 중..." : "제출"}
                </button>

                <div className="proj-btn-two">
                  <button
                    className="proj-edit-btn"
                    onClick={() =>
                      navigate(`/student/mylec/${lectureId}/myproj/edit`)
                    }
                    disabled={isSubmitting}
                  >
                    수정
                  </button>
                  <button
                    className="proj-delete-btn"
                    onClick={handleDeleteProject}
                    disabled={isSubmitting}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;