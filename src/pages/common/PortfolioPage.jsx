import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PortfolioPage.css";
import LectureItem from "../../components/lecture/LectureItem";
import {
  getAttendingsByUserId,
  getAttendingCountMapByLectures,
} from "../../services/attendingService";
import { getLecturesAll } from "../../services/lectureService";
import { getTemplateById } from "../../services/templateService";

function PortfolioPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [studentCurrentLectures, setStudentCurrentLectures] = useState([]);
  const [teacherTargetLecture, setTeacherTargetLecture] = useState(null);
  const [teacherTemplateMap, setTeacherTemplateMap] = useState({});
  const [finishedLectures, setFinishedLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  const isProjectPage =
    location.pathname === "/student/portfolio/project" ||
    location.pathname === "/teacher/portfolio/project";

  const isInterviewPage =
    location.pathname === "/student/portfolio/interview" ||
    location.pathname === "/teacher/portfolio/interview";

  // 포트폴리오 페이지에 필요한 강의 목록과 템플릿 존재 여부를 조회
  useEffect(() => {
    const fetchPortfolioLectures = async () => {
      try {
        setLoading(true);

        if (!currentUser) {
          setStudentCurrentLectures([]);
          setTeacherTargetLecture(null);
          setTeacherTemplateMap({});
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

          const lectureList = [...playingLectures, ...finished];
          const attendingCountMap =
            await getAttendingCountMapByLectures(lectureList);

          setStudentCurrentLectures(
            playingLectures.map((lecture) => ({
              ...lecture,
              attendingCount: attendingCountMap[Number(lecture.lectureId)] || 0,
            })),
          );

          setFinishedLectures(
            finished.map((lecture) => ({
              ...lecture,
              attendingCount: attendingCountMap[Number(lecture.lectureId)] || 0,
            })),
          );

          setTeacherTargetLecture(null);
          setTeacherTemplateMap({});
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

          const lecturesToCheckCount = [
            ...(targetLecture ? [targetLecture] : []),
            ...finished,
          ];

          const attendingCountMap =
            await getAttendingCountMapByLectures(lecturesToCheckCount);

          const targetLectureWithCount = targetLecture
            ? {
                ...targetLecture,
                attendingCount:
                  attendingCountMap[Number(targetLecture.lectureId)] || 0,
              }
            : null;

          const finishedWithCount = finished.map((lecture) => ({
            ...lecture,
            attendingCount: attendingCountMap[Number(lecture.lectureId)] || 0,
          }));

          setTeacherTargetLecture(targetLectureWithCount);
          setFinishedLectures(finishedWithCount);

          // 프로젝트/면접 탭 모두 프로젝트 템플릿 존재 여부를 기준으로 강의 리스트 노출
          if (
            (isProjectPage || isInterviewPage) &&
            (targetLecture || finished.length > 0)
          ) {
            const lecturesToCheck = [
              ...(targetLecture ? [targetLecture] : []),
              ...finished,
            ];

            const templateResults = await Promise.all(
              lecturesToCheck.map(async (lecture) => {
                const template = await getTemplateById(lecture.lectureId);

                return {
                  lectureId: lecture.lectureId,
                  hasTemplate: !!template,
                };
              }),
            );

            const templateMap = templateResults.reduce((acc, item) => {
              acc[item.lectureId] = item.hasTemplate;
              return acc;
            }, {});

            setTeacherTemplateMap(templateMap);
          } else {
            setTeacherTemplateMap({});
          }

          return;
        }
      } catch (error) {
        console.error("포트폴리오 강의 조회 실패:", error);
        setStudentCurrentLectures([]);
        setTeacherTargetLecture(null);
        setTeacherTemplateMap({});
        setFinishedLectures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioLectures();
  }, [currentUser, isProjectPage, isInterviewPage]);

  // 현재 탭과 사용자 역할에 맞는 클릭 경로 생성
  const getLecturePath = (lectureId) => {
    if (!currentUser) return "";

    if (currentUser.role === "teacher") {
      if (isProjectPage) {
        return `/teacher/portfolio/project/${lectureId}`;
      }

      if (isInterviewPage) {
        return `/teacher/portfolio/interview/${lectureId}`;
      }
    }

    if (currentUser.role === "student") {
      if (isProjectPage) {
        return `/student/portfolio/project/${lectureId}`;
      }

      if (isInterviewPage) {
        return `/student/portfolio/interview/${lectureId}`;
      }
    }

    return "";
  };

  // 페이지 종류에 따라 상단 제목을 결정
  const portfolioTitle = useMemo(() => {
    if (isProjectPage) return "프로젝트 관리";
    if (isInterviewPage) return "모의 면접 관리";
    return "포트폴리오 관리";
  }, [isProjectPage, isInterviewPage]);

  // 강사 현재 강의 섹션 제목을 waiting/playing 상태에 따라 결정
  const teacherCurrentSectionTitle = useMemo(() => {
    if (!teacherTargetLecture) {
      return isProjectPage ? "대기 중인 강의" : "대기 중인 강의";
    }

    return teacherTargetLecture.status === "waiting"
      ? "대기 중인 강의"
      : "진행 중인 강의";
  }, [teacherTargetLecture, isProjectPage]);

  // 강사 현재 강의에 프로젝트 템플릿이 있는지 판단
  const teacherHasCurrentTemplate = useMemo(() => {
    if (!teacherTargetLecture) return false;
    return !!teacherTemplateMap[teacherTargetLecture.lectureId];
  }, [teacherTargetLecture, teacherTemplateMap]);

  // 종료된 강의 중 프로젝트 템플릿이 있는 강의만 필터링
  const teacherFinishedLecturesWithTemplate = useMemo(() => {
    if (currentUser?.role !== "teacher") return finishedLectures;

    return finishedLectures.filter(
      (lecture) => !!teacherTemplateMap[lecture.lectureId],
    );
  }, [currentUser, finishedLectures, teacherTemplateMap]);

  // 강사 프로젝트 버튼 클릭 시 템플릿 존재 여부에 따라 등록 또는 수정 페이지로 이동
  const handleTeacherProjectAction = () => {
    if (currentUser?.role !== "teacher") return;
    if (!isProjectPage) return;
    if (!teacherTargetLecture) return;

    if (teacherHasCurrentTemplate) {
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

    return teacherHasCurrentTemplate ? "프로젝트 수정" : "+ 프로젝트 등록";
  }, [currentUser, isProjectPage, teacherHasCurrentTemplate]);

  // 현재 강의 영역에 템플릿이 없을 때 표시할 문구 결정
  const emptyCurrentMessage = useMemo(() => {
    if (currentUser?.role === "teacher") {
      if (!teacherTargetLecture) {
        return isProjectPage
          ? "대기 중이거나 진행 중인 강의가 없습니다."
          : "대기 중이거나 진행 중인 강의가 없습니다.";
      }

      return isProjectPage
        ? "작성된 프로젝트가 없습니다."
        : "진행 가능한 모의 면접이 없습니다.";
    }

    return "수강 중인 강의가 없습니다.";
  }, [currentUser, teacherTargetLecture, isProjectPage, isInterviewPage]);

  if (!currentUser || loading) {
    return (
      <div className="content">
        <div className="loading">불러오는 중...</div>
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

        {currentUser.role === "teacher" &&
          isProjectPage &&
          teacherTargetLecture && (
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
              {teacherHasCurrentTemplate && teacherTargetLecture
                ? "1개"
                : "0개"}
            </div>
          </div>

          <div className="portfolio-current-list">
            {teacherTargetLecture ? (
              teacherHasCurrentTemplate ? (
                <LectureItem
                  key={teacherTargetLecture.lectureId}
                  lecture={teacherTargetLecture}
                  mode="list"
                  customPath={getLecturePath(teacherTargetLecture.lectureId)}
                />
              ) : (
                <div className="portfolio-empty">{emptyCurrentMessage}</div>
              )
            ) : (
              <div className="portfolio-empty">{emptyCurrentMessage}</div>
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
            {currentUser.role === "teacher"
              ? teacherFinishedLecturesWithTemplate.length
              : finishedLectures.length}
            개
          </div>
        </div>

        <div className="portfolio-end-list">
          {(currentUser.role === "teacher"
            ? teacherFinishedLecturesWithTemplate
            : finishedLectures
          ).length > 0 ? (
            (currentUser.role === "teacher"
              ? teacherFinishedLecturesWithTemplate
              : finishedLectures
            ).map((lecture) => (
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
