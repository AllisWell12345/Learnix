import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DataManagePage.css";
import Searchbar from "../../components/common/Searchbar";
import profile from "../../assets/img/common/profileIcon.svg";
import projectIcon from "../../assets/img/common/dataIcon.svg";
import interviewIcon from "../../assets/img/Sidebar/interviewIcon.svg";
import trash from "../../assets/img/common/deleteIcon.svg";
import useModal from "../../hooks/useModal";

import { getProjectsAll, deleteProject } from "../../services/projectService";
import { getUserByUserId } from "../../services/userService";
import {
  getQuestionsByProjectId,
  deleteQuestionsByProjectId,
} from "../../services/questionService";
import { deleteAnswersByQuestionIds } from "../../services/answerService";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

function DataManagePage() {
  const navigate = useNavigate();
  const { modal, openModal } = useModal();

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearch = () => {
    setKeyword(search.trim().toLowerCase());
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const projectList = await getProjectsAll();

      const merged = await Promise.all(
        projectList.map(async (project) => {
          const user = project.userId
            ? await getUserByUserId(Number(project.userId))
            : null;

          let lectureName = "강의명 정보 없음";
          if (project.lectureId) {
            const lectureSnap = await getDoc(
              doc(db, "lectures", String(project.lectureId)),
            );

            if (lectureSnap.exists()) {
              lectureName = lectureSnap.data().title;
            }
          }

          const questions = await getQuestionsByProjectId(
            Number(project.projectId),
          );
          const hasInterview = questions.length > 0;

          return {
            ...project,
            user,
            lectureName,
            hasInterview,
          };
        }),
      );

      setProjects(merged);
    } catch (error) {
      console.error("자료 관리 조회 실패:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProjects = useMemo(() => {
    if (!keyword) return projects;

    return projects.filter((item) => {
      const userName = item.user?.name?.toLowerCase() || "";
      const lectureName = item.lectureName?.toLowerCase() || "";
      const projectTitle = item.title?.toLowerCase() || "";

      return (
        userName.includes(keyword) ||
        lectureName.includes(keyword) ||
        projectTitle.includes(keyword)
      );
    });
  }, [projects, keyword]);

  const handleDelete = (project) => {
    openModal("DELETE", {
      mainMsg: "자료를 삭제하시겠습니까?",
      subMsg: "해당 프로젝트와 관련된 면접 질문/답변도 함께 삭제됩니다.",
      onDelete: async () => {
        try {
          const questions = await getQuestionsByProjectId(
            Number(project.projectId),
          );
          const questionIds = questions.map((item) => Number(item.questionId));

          await deleteAnswersByQuestionIds(questionIds);
          await deleteQuestionsByProjectId(Number(project.projectId));
          await deleteProject(Number(project.projectId));

          await fetchData();

          openModal("CHECK", {
            mainMsg: "삭제가 완료되었습니다.",
          });
        } catch (error) {
          console.error("자료 삭제 실패:", error);
          openModal("WARNING", {
            mainMsg: "삭제에 실패했습니다.",
            subMsg: "잠시 후 다시 시도해주세요.",
          });
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="datamanage-page">
        {modal}
        <div className="loading">불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="datamanage-page">
      {modal}

      <div className="datamanage-title-container">
        <div className="datamanage-title-area">
          <h1 className="datamanage-title">
            <span className="datamanage-title-bar" />
            자료 관리
          </h1>
        </div>

        <div className="datamanage-search-area">
          <Searchbar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="datamanage-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((item) => (
            <div className="datamanage-user-block" key={item.projectId}>
              <div className="datamanage-user-info">
                <div className="datamanage-avatar">
                  <img
                    src={profile}
                    className="datamanage-profile-icon"
                    alt="프로필"
                  />
                </div>
                <p className="datamanage-user-name">
                  {item.user?.name || "이름 정보 없음"}
                </p>
              </div>

              <div className="datamanage-cards">
                {/* 프로젝트 카드 */}
                <div
                  className="datamanage-card"
                  onClick={() =>
                    navigate(`/manager/data/${item.projectId}/project`, {
                      state: { project: item },
                    })
                  }
                >
                  <p className="datamanage-card-type">
                    <img
                      src={projectIcon}
                      className="datamanage-project-icon"
                      alt="프로젝트"
                    />
                    프로젝트
                  </p>
                  <p className="datamanage-card-title">
                    강의명 : {item.lectureName}
                  </p>
                  <p className="datamanage-card-meta">
                    작성일 : {item.createdAt?.split("T")[0] || "-"}
                  </p>

                  <button
                    className="datamanage-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item);
                    }}
                  >
                    <img
                      src={trash}
                      className="datamanage-delete-icon"
                      alt="삭제"
                    />
                    삭제
                  </button>
                </div>

                {/* 모의면접 카드 */}
                <div
                  className="datamanage-card"
                  onClick={() =>
                    navigate(`/manager/data/${item.projectId}/interview`, {
                      state: { project: item },
                    })
                  }
                >
                  <p className="datamanage-card-type">
                    <img
                      src={interviewIcon}
                      className="datamanage-interview-icon"
                      alt="모의면접"
                    />
                    모의면접
                  </p>
                  <p className="datamanage-card-title">
                    프로젝트명 : {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="datamanage-empty">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default DataManagePage;
