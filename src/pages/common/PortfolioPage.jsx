import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PortfolioPage.css";
import LectureItem from "../../components/lecture/LectureItem";
import { getAttendingsByUserId } from "../../services/attendingService";
import { getLecturesAll } from "../../services/lectureService";

function PortfolioPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [currentLectures, setCurrentLectures] = useState([]);
  const [finishedLectures, setFinishedLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  const isProjectPage =
    location.pathname === "/student/portfolio/project" ||
    location.pathname === "/teacher/portfolio/project";

  const isInterviewPage =
    location.pathname === "/student/portfolio/interview" ||
    location.pathname === "/teacher/portfolio/interview";

  useEffect(() => {
    const fetchPortfolioLectures = async () => {
      try {
        setLoading(true);

        if (!currentUser) {
          setCurrentLectures([]);
          setFinishedLectures([]);
          return;
        }

        if (currentUser.role === "student") {
          const myAttendings = await getAttendingsByUserId(currentUser.userId);
          const playingLectures = myAttendings.filter(
            (lecture) => lecture.status === "playing",
          );
          const finished = myAttendings.filter(
            (lecture) => lecture.status === "finished",
          );

          setCurrentLectures(playingLectures);
          setFinishedLectures(finished);
          return;
        }

        if (currentUser.role === "teacher") {
          const allLectures = await getLecturesAll();

          const myLectures = allLectures.filter(
            (lecture) => Number(lecture.userId) === Number(currentUser.userId),
          );

          const playing = myLectures.filter(
            (lecture) => lecture.status === "playing",
          );
          const finished = myLectures.filter(
            (lecture) => lecture.status === "finished",
          );

          setCurrentLectures(playing);
          setFinishedLectures(finished);
        }
      } catch (error) {
        console.error("포트폴리오 강의 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioLectures();
  }, [currentUser]);

  const getLecturePath = (lectureId) => {
    if (!currentUser) return "";
    const role = currentUser.role;
    const type = isProjectPage ? "project" : "interview";
    return `/${role}/portfolio/${type}/${lectureId}`;
  };

  const portfolioTitle = useMemo(() => {
    if (isProjectPage) return "프로젝트 관리";
    if (isInterviewPage) return "모의 면접 관리";
    return "포트폴리오 관리";
  }, [isProjectPage, isInterviewPage]);

  const currentSectionTitle = useMemo(() => {
    return currentUser?.role === "student"
      ? "수강 중인 강의"
      : "진행 중인 강의";
  }, [currentUser]);

  const emptyCurrentMessage = useMemo(() => {
    if (currentUser?.role === "student") return "수강 중인 강의가 없습니다.";
    return isProjectPage
      ? "진행 중인 프로젝트가 없습니다."
      : "진행 중인 모의면접이 없습니다.";
  }, [currentUser, isProjectPage]);

  const handleTeacherProjectRegist = async () => {
    if (currentUser?.role !== "teacher") return;
    const allLectures = await getLecturesAll();
    const myAvailableLecture = allLectures.find(
      (lecture) =>
        Number(lecture.userId) === Number(currentUser.userId) &&
        (lecture.status === "playing" || lecture.status === "waiting"),
    );
    if (!myAvailableLecture) return;
    navigate(
      `/teacher/portfolio/project/${myAvailableLecture.lectureId}/regist`,
    );
  };

  if (!currentUser || loading)
    return <div className="content">로딩 중입니다...</div>;

  return (
    <div className="portfolio-container">
      <div className="portfolio-top-container">
        <div className="portfolio-title-area">
          <div className="portfolio-title-bar"></div>
          <p className="portfolio-title">{portfolioTitle}</p>
        </div>

        {currentUser.role === "teacher" && isProjectPage && (
          <button
            className="portfolio-regist-btn"
            onClick={handleTeacherProjectRegist}
          >
            + 프로젝트 등록
          </button>
        )}
      </div>

      <div className="portfolio-lec-container">
        <div className="portfolio-sub-title-area">
          <p className="portfolio-sub-title">{currentSectionTitle}</p>
          <div className="portfolio-current-number">
            {currentLectures.length}개
          </div>
        </div>

        <div className="portfolio-current-list">
          {currentLectures.length > 0 ? (
            currentLectures.map((lecture) => (
              <LectureItem
                key={lecture.lectureId}
                lecture={lecture}
                mode="list"
                customPath={getLecturePath(lecture.lectureId)}
              />
            ))
          ) : (
            <div className="portfolio-lec-box">
              <div className="prtfolio-empty">{emptyCurrentMessage}</div>
            </div>
          )}
        </div>
      </div>

      <div className="portfolio-lec-container">
        <div className="portfolio-sub-title-area">
          <p className="portfolio-sub-title">종료된 강의</p>
          <div className="portfolio-end-number">
            {finishedLectures.length}개
          </div>
        </div>

        <div className="portfolio-end-list">
          {finishedLectures.length > 0 ? (
            finishedLectures.map((lecture) => (
              <div className="portfolio-lec-box" key={lecture.lectureId}>
                <LectureItem
                  lecture={lecture}
                  mode="list"
                  customPath={getLecturePath(lecture.lectureId)}
                />
              </div>
            ))
          ) : (
            <div className="portfolio-lec-box">
              <div className="test-item2">지난 강의가 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage;
