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

        // 학생
        if (currentUser.role === "student") {
          const myAttendings = await getAttendingsByUserId(currentUser.userId);

          const playingLectures = myAttendings.filter(
            (lecture) => lecture.status === "playing",
          );

          const finishedLectures = myAttendings.filter(
            (lecture) => lecture.status === "finished",
          );

          setCurrentLectures(playingLectures);
          setFinishedLectures(finishedLectures);
          return;
        }

        // 강사
        if (currentUser.role === "teacher") {
          const allLectures = await getLecturesAll();

          const myLectures = allLectures.filter(
            (lecture) => Number(lecture.userId) === Number(currentUser.userId),
          );

          const playingLectures = myLectures.filter(
            (lecture) => lecture.status === "playing",
          );

          const finishedLectures = myLectures.filter(
            (lecture) => lecture.status === "finished",
          );

          // 아직 project/interview가 등록되지 않았으므로 위쪽 목록은 비움
          // 이후 project/interview 등록 여부가 생기면 playingLectures 중 등록된 것만 setCurrentLectures 하시면 됩니다.
          setCurrentLectures([]);
          setFinishedLectures(finishedLectures);

          // 참고용으로 필요하면 나중에 이 값 활용 가능
          // console.log("playingLectures for future regist:", playingLectures);
        }
      } catch (error) {
        console.error("포트폴리오 강의 조회 실패:", error);
        setCurrentLectures([]);
        setFinishedLectures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioLectures();
  }, [currentUser]);

  const portfolioTitle = useMemo(() => {
    if (isProjectPage) return "프로젝트 관리";
    if (isInterviewPage) return "모의 면접 관리";
    return "포트폴리오 관리";
  }, [isProjectPage, isInterviewPage]);

  const currentSectionTitle = useMemo(() => {
    if (currentUser?.role === "student") return "수강 중인 강의";
    if (currentUser?.role === "teacher") return "대기 중인 강의";
    return "현재 강의";
  }, [currentUser]);

  const emptyCurrentMessage = useMemo(() => {
    if (currentUser?.role === "student") {
      return "수강 중인 강의가 없습니다.";
    }

    if (currentUser?.role === "teacher") {
      return isProjectPage
        ? "대기 중인 프로젝트가 없습니다."
        : "대기 중인 모의면접이 없습니다.";
    }

    return "표시할 강의가 없습니다.";
  }, [currentUser, isProjectPage]);

  const teacherPlayingLecture = useMemo(() => {
    return currentUser?.role === "teacher" ? null : null;
  }, [currentUser]);

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

  const getLecturePath = (lectureId) => {
    if (!currentUser) return "";

    if (currentUser.role === "student") {
      if (isProjectPage) {
        return `/student/portfolio/project/${lectureId}`;
      }
      if (isInterviewPage) {
        return `/student/portfolio/interview/${lectureId}`;
      }
    }

    if (currentUser.role === "teacher") {
      if (isProjectPage) {
        return `/teacher/portfolio/project/${lectureId}`;
      }
      if (isInterviewPage) {
        return `/teacher/portfolio/interview/${lectureId}`;
      }
    }

    return "";
  };

  if (!currentUser || loading) {
    return <div>로딩중입니다...</div>;
  }

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
          <p className="portfolio-sub-title">끝난 강의</p>
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
