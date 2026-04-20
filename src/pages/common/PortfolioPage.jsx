import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PortfolioPage.css";
import LectureItem from "../../components/lecture/LectureItem";
import { getAttendingsByUserId } from "../../services/attendingService";
import { getLecturesAll } from "../../services/lectureService";
import { getTemplateById } from "../../services/templateService";

function PortfolioPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [studentCurrentLectures, setStudentCurrentLectures] = useState([]);
  const [teacherTargetLecture, setTeacherTargetLecture] = useState(null);
  const [teacherHasTemplate, setTeacherHasTemplate] = useState(false);
  const [finishedLectures, setFinishedLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  const isProjectPage =
    location.pathname === "/student/portfolio/project" ||
    location.pathname === "/teacher/portfolio/project";

  const isInterviewPage =
    location.pathname === "/student/portfolio/interview" ||
    location.pathname === "/teacher/portfolio/interview";

  // 포트폴리오 페이지에 필요한 강의와 템플릿 존재 여부를 조회
  useEffect(() => {
    const fetchPortfolioLectures = async () => {
      try {
        setLoading(true);

        if (!currentUser) {
          setStudentCurrentLectures([]);
          setTeacherTargetLecture(null);
          setTeacherHasTemplate(false);
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

          setStudentCurrentLectures(playingLectures);
          setTeacherTargetLecture(null);
          setTeacherHasTemplate(false);
          setFinishedLectures(finished);
          return;
        }

        if (currentUser.role === "teacher") {
          const allLectures = await getLecturesAll();

          const myLectures = allLectures.filter(
            (lecture) => Number(lecture.userId) === Number(currentUser.userId),
          );

          const targetLecture =
            myLectures.find((lecture) => lecture.status === "waiting") ||
            myLectures.find((lecture) => lecture.status === "playing") ||
            null;

          const finished = myLectures.filter(
            (lecture) => lecture.status === "finished",
          );

          setTeacherTargetLecture(targetLecture);
          setFinishedLectures(finished);

          if (isProjectPage && targetLecture) {
            const template = await getTemplateById(targetLecture.lectureId);
            setTeacherHasTemplate(!!template);
          } else {
            setTeacherHasTemplate(false);
          }

          return;
        }
      } catch (error) {
        console.error("포트폴리오 강의 조회 실패:", error);
        setStudentCurrentLectures([]);
        setTeacherTargetLecture(null);
        setTeacherHasTemplate(false);
        setFinishedLectures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioLectures();
  }, [currentUser, isProjectPage]);

  // 강의 카드 클릭 시 포트폴리오 상세 페이지 경로 생성
  const getLecturePath = (lectureId) => {
    if (!currentUser) return "";

    const role = currentUser.role;
    const type = isProjectPage ? "project" : "interview";

    return `/${role}/portfolio/${type}/${lectureId}`;
  };

  // 페이지 종류에 따라 상단 제목을 결정
  const portfolioTitle = useMemo(() => {
    if (isProjectPage) return "프로젝트 관리";
    if (isInterviewPage) return "모의 면접 관리";
    return "포트폴리오 관리";
  }, [isProjectPage, isInterviewPage]);

  // 강사 프로젝트 관리 페이지의 현재 강의 섹션 제목을 상태값 기준으로 결정
  const teacherCurrentSectionTitle = useMemo(() => {
    if (!teacherTargetLecture) return "진행 중인 강의";
    return teacherTargetLecture.status === "waiting"
      ? "대기 중인 강의"
      : "진행 중인 강의";
  }, [teacherTargetLecture]);

  // 강사 프로젝트 버튼 클릭 시 템플릿 존재 여부에 따라 등록 또는 수정 페이지로 이동
  const handleTeacherProjectAction = () => {
    if (currentUser?.role !== "teacher") return;
    if (!isProjectPage) return;
    if (!teacherTargetLecture) return;

    if (teacherHasTemplate) {
      navigate(
        `/teacher/portfolio/project/${teacherTargetLecture.lectureId}/edit`,
      );
      return;
    }

    navigate(
      `/teacher/portfolio/project/${teacherTargetLecture.lectureId}/regist`,
    );
  };

  // 강사 프로젝트 버튼 문구를 템플릿 존재 여부에 따라 결정
  const teacherProjectButtonText = useMemo(() => {
    if (currentUser?.role !== "teacher" || !isProjectPage) return "";
    return teacherHasTemplate ? "프로젝트 수정" : "+ 프로젝트 등록";
  }, [currentUser, isProjectPage, teacherHasTemplate]);

  if (!currentUser || loading) {
    return (
      <div className="content">
        <div className="portfolio-empty">로딩 중입니다...</div>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <div className="portfolio-top-container">
        <div className="portfolio-title-area">
          <div className="portfolio-title-bar"></div>
          <p className="portfolio-title">{portfolioTitle}</p>
        </div>

        {currentUser.role === "teacher" && isProjectPage && teacherTargetLecture && (
          <button
            className="portfolio-regist-btn"
            onClick={handleTeacherProjectAction}
          >
            {teacherProjectButtonText}
          </button>
        )}
      </div>

      {currentUser.role === "teacher" ? (
        <div className="portfolio-lec-container">
          <div className="portfolio-sub-title-area">
            <p className="portfolio-sub-title">{teacherCurrentSectionTitle}</p>
            <div className="portfolio-current-number">
              {teacherHasTemplate && teacherTargetLecture ? "1개" : "0개"}
            </div>
          </div>

          <div className="portfolio-current-list">
            {teacherTargetLecture ? (
              teacherHasTemplate ? (
                <LectureItem
                  key={teacherTargetLecture.lectureId}
                  lecture={teacherTargetLecture}
                  mode="list"
                  customPath={getLecturePath(teacherTargetLecture.lectureId)}
                />
              ) : (
                <div className="portfolio-empty">
                  작성된 프로젝트가 없습니다.
                </div>
              )
            ) : (
              <div className="portfolio-empty">
                {isProjectPage
                  ? "대기 중이거나 진행 중인 강의가 없습니다."
                  : "진행 중인 모의면접 강의가 없습니다."}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="portfolio-lec-container">
          <div className="portfolio-sub-title-area">
            <p className="portfolio-sub-title">수강 중인 강의</p>
            <div className="portfolio-current-number">
              {studentCurrentLectures.length}개
            </div>
          </div>

          <div className="portfolio-current-list">
            {studentCurrentLectures.length > 0 ? (
              studentCurrentLectures.map((lecture) => (
                <LectureItem
                  key={lecture.lectureId}
                  lecture={lecture}
                  mode="list"
                  customPath={getLecturePath(lecture.lectureId)}
                />
              ))
            ) : (
              <div className="portfolio-empty">수강 중인 강의가 없습니다.</div>
            )}
          </div>
        </div>
      )}

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
              <LectureItem
                key={lecture.lectureId}
                lecture={lecture}
                mode="list"
                customPath={getLecturePath(lecture.lectureId)}
              />
            ))
          ) : (
            <div className="portfolio-lec-box">
              <div className="portfolio-empty">종료된 강의가 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage;