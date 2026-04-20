import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config.js";
import { doc, getDoc } from "firebase/firestore";
import "./ProjectItem.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";
import { getUserByUserId } from "../../services/userService.js";

function ProjectItem({ project, mode = "list", role = "student" }) {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [lectureName, setLectureName] = useState("");
  const [projectUser, setProjectUser] = useState(null);

  useEffect(() => {
    const fetchLectureName = async () => {
      if (lectureId) {
        try {
          const lecDoc = await getDoc(doc(db, "lectures", String(lectureId)));

          if (lecDoc.exists()) {
            setLectureName(lecDoc.data().title);
          } else {
            setLectureName("강의명 로드실패");
          }
        } catch (error) {
          console.error("강의명 로드 실패:", error);
          setLectureName("강의명 로드실패");
        }
      }
    };

    fetchLectureName();
  }, [lectureId]);

  useEffect(() => {
  const fetchProjectUser = async () => {
    try {
      if (!project?.userId) {
        setProjectUser(null);
        return;
      }

      const userData = await getUserByUserId(project.userId);
      setProjectUser(userData);
    } catch (error) {
      console.error("프로젝트 작성자 정보 조회 실패:", error);
      setProjectUser(null);
    }
  };

  fetchProjectUser();
}, [project]);

  if (mode === "list" || mode === "interview") {
    return (
      <div
        className="pt-item-list-card"
        onClick={() =>
          navigate(
            `/${currentUser.role}/portfolio/project/${lectureId}/${project.projectId}`,
          )
        }
      >
        <div className="pt-item-list-header">
          <p className="pt-item-list-title">{project.title}</p>
          <p className="pt-item-list-lecture">{project.className}</p>
        </div>

        <div className="pt-item-list-footer">
          <div className="pt-item-list-info-group">
            <div className="pt-item-list-info-item">
              <img
                src={StudentIcon}
                alt="수강생"
                className="pt-item-list-icon"
              />
              수강생{" "}
              <span className="info-value">
                {projectUser?.name || "이름 정보 없음"}
              </span>
            </div>
            <div className="pt-item-list-info-item">
              <img
                src={CalendarIcon}
                alt="제출일"
                className="pt-item-list-icon"
              />
              제출일{" "}
              <span className="info-value">
                {project.createdAt?.split("T")[0] || "날짜 정보 없음"}
              </span>
            </div>
          </div>

          {mode === "interview" &&
            role === "teacher" &&
            project.status === "waiting" && (
              <button
                className="pt-item-list-btn"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                리뷰하기
              </button>
            )}
        </div>
      </div>
    );
  }

  if (mode === "detail") {
    return (
      <div className="pt-wrap">
        <div className="pt-item-detail-container">
          <header className="pt-item-detail-header">
            <p className="pt-item-detail-main-title">{project.title}</p>
          </header>

          <div className="pt-item-detail-columns">
            <section className="pt-item-detail-card info-card">
              <p className="card-section-title">프로젝트 정보</p>

              <div className="info-fixed-area">
                <div className="info-row">
                  <span className="info-label">프로젝트 제목</span>
                  <p className="info-content bold">{project.title}</p>
                </div>

                <div className="info-row">
                  <span className="info-label">강의명</span>
                  <p className="info-content">
                    {lectureName || "강의 정보 로딩 중..."}
                  </p>
                </div>

                <div className="info-row">
                  <span className="info-label">1. 요구사항 분석</span>
                  <p className="info-content desc-text">
                    {project.requireDetail}
                  </p>
                </div>

                <div className="info-row">
                  <span className="info-label">2. 주요 기능</span>
                  <p className="info-content desc-text">{project.feature}</p>
                </div>

                <div className="info-row">
                  <span className="info-label">3. 발생한 문제</span>
                  <p className="info-content desc-text">{project.problem}</p>
                </div>

                <div className="info-row">
                  <span className="info-label">4. 해결 방법</span>
                  <p className="info-content desc-text">{project.solution}</p>
                </div>

                <div className="info-row">
                  <span className="info-label">5. 프로젝트 링크</span>
                  <p className="info-content desc-text link">{project.projectLink}</p>
                </div>
              </div>
            </section>

            <aside className="pt-item-detail-card student-card">
              <h3 className="card-section-title">수강생 정보</h3>
              <div className="student-info-area">
                <div className="info-row">
                  <span className="info-label">이름</span>
                  <p className="info-content bold">
                    {projectUser?.name || "이름 정보 없음"}
                  </p>
                </div>
                <div className="info-row">
                  <span className="info-label">이메일</span>
                  <p className="info-content student-email">
                    {projectUser?.email || "이메일 정보 없음"}
                  </p>
                </div>
                <hr className="student-div" />
                <div className="info-row student-date-row">
                  <img
                    src={CalendarIcon}
                    alt="제출일"
                    className="student-date-icon"
                  />
                  <div className="student-date-text">
                    <span className="info-label">제출일</span>
                    <p className="info-content">
                      {project.createdAt?.split("T")[0] || "날짜 정보 없음"}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
  // 댓글창 구현
  return null;
}

export default ProjectItem;
