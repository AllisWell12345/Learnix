import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MyLecturePage.css";
import LectureItem from "../../components/lecture/LectureItem";
import { getLecturesAll, updateLecture } from "../../services/lectureService";
import { getAttendingsByUserId } from "../../services/attendingService";
import { getUserByUid } from "../../services/userService";
import { auth } from "../../firebase/config";
import { getAttendingCountMapByLectures } from "../../services/attendingService";

function MyLecturePage() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [currentLectures, setCurrentLectures] = useState([]);
  const [finishedLectures, setFinishedLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startingRecruit, setStartingRecruit] = useState(false);

  useEffect(() => {
    const fetchMyLectures = async () => {
      try {
        setLoading(true);

        if (!currentUser) {
          setCurrentLectures([]);
          setFinishedLectures([]);
          return;
        }

        // ================= 학생 =================
        if (currentUser.role === "student") {
          const myAttendings = await getAttendingsByUserId(currentUser.userId);

          const playingLectures = myAttendings.filter(
            (lecture) => lecture.status === "playing",
          );

          const finishedLectures = myAttendings.filter(
            (lecture) => lecture.status === "finished",
          );

          const allStudentLectures = [...playingLectures, ...finishedLectures];
          const attendingCountMap =
          await getAttendingCountMapByLectures(allStudentLectures);

          setCurrentLectures(
            playingLectures.map((lecture) => ({
              ...lecture,
              attendingCount: attendingCountMap[Number(lecture.lectureId)] || 0,
            })),
          );

          setFinishedLectures(
            finishedLectures.map((lecture) => ({
              ...lecture,
              attendingCount: attendingCountMap[Number(lecture.lectureId)] || 0,
            })),
          );
        }

        // ================= 강사 =================
        if (currentUser.role === "teacher") {
          const allLectures = await getLecturesAll();

          const myLectures = allLectures.filter(
            (lecture) => Number(lecture.userId) === Number(currentUser.userId),
          );

          const finishedLectures = myLectures.filter(
            (lecture) => lecture.status === "finished",
          );

          const notFinishedLectures = myLectures.filter(
            (lecture) => lecture.status !== "finished",
          );

          const allTeacherLectures = [
            ...notFinishedLectures,
            ...finishedLectures,
          ];
          const attendingCountMap =
            await getAttendingCountMapByLectures(allTeacherLectures);

          setCurrentLectures(
            notFinishedLectures.map((lecture) => ({
              ...lecture,
              attendingCount: attendingCountMap[Number(lecture.lectureId)] || 0,
            })),
          );

          setFinishedLectures(
            finishedLectures.map((lecture) => ({
              ...lecture,
              attendingCount: attendingCountMap[Number(lecture.lectureId)] || 0,
            })),
          );
        }
      } catch (error) {
        console.error("내 강의 조회 실패:", error);
        setCurrentLectures([]);
        setFinishedLectures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyLectures();
  }, [currentUser]);

  const waitingLecture = useMemo(() => {
    return (
      currentLectures.find((lecture) => lecture.status === "waiting") || null
    );
  }, [currentLectures]);

  const playingLecture = useMemo(() => {
    return (
      currentLectures.find((lecture) => lecture.status === "playing") || null
    );
  }, [currentLectures]);

  const teacherAllLecturesCount = useMemo(() => {
    if (currentUser?.role !== "teacher") return 0;
    return currentLectures.length + finishedLectures.length;
  }, [currentUser, currentLectures, finishedLectures]);

  const currentSectionTitle = useMemo(() => {
    if (!currentUser) return "내 강의";

    if (currentUser.role === "student") {
      return "수강중인 강의";
    }

    if (currentUser.role === "teacher") {
      if (playingLecture) return "진행 중인 강의";
      if (waitingLecture) return "대기 중인 강의";
      return "대기 중인 강의";
    }

    return "내 강의";
  }, [currentUser, playingLecture, waitingLecture]);

  const handleTeacherMainButton = async () => {
    if (!currentUser || currentUser.role !== "teacher") return;

    // 등록한 강의가 하나도 없을 때
    if (teacherAllLecturesCount === 0) {
      navigate("/teacher/mylec/regist");
      return;
    }

    // waiting 강의가 있을 때 모집 시작
    if (waitingLecture) {
      try {
        setStartingRecruit(true);

        await updateLecture(waitingLecture.lectureId, {
          status: "playing",
        });

        setCurrentLectures((prev) =>
          prev.map((lecture) =>
            lecture.lectureId === waitingLecture.lectureId
              ? { ...lecture, status: "playing" }
              : lecture,
          ),
        );
      } catch (error) {
        console.error("모집 시작 실패:", error);
      } finally {
        setStartingRecruit(false);
      }
    }
  };

  const teacherButtonInfo = useMemo(() => {
    if (currentUser?.role !== "teacher") {
      return {
        show: false,
        text: "",
      };
    }

    // 진행 중인 강의가 있으면 버튼 숨김
    if (playingLecture) {
      return {
        show: false,
        text: "",
      };
    }

    // waiting 강의가 있으면 모집 시작 버튼
    if (waitingLecture) {
      return {
        show: true,
        text: "모집 시작",
      };
    }

    // 등록된 강의가 하나도 없으면 강의 등록 버튼
    if (teacherAllLecturesCount === 0) {
      return {
        show: true,
        text: "+ 강의 등록",
      };
    }

    // finished 포함 기타 상황에서는 버튼 숨김
    return {
      show: false,
      text: "",
    };
  }, [currentUser, playingLecture, waitingLecture, teacherAllLecturesCount]);

  if (!currentUser) {
    return (
      <div className="content">
        <div className="mylec-container">
          <div className="loading">불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="content">
        <div className="mylec-container">
          <div className="loading">불러오는 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="mylec-container">
        <div className="mylec-top-container">
          <div className="mylec-title-area">
            <div className="mylec-title-bar" />
            <p className="mylec-title">내 강의</p>
          </div>

          {teacherButtonInfo.show && (
            <button
              className="mylec-regist-btn"
              onClick={handleTeacherMainButton}
              disabled={startingRecruit}
            >
              {startingRecruit ? "변경 중..." : teacherButtonInfo.text}
            </button>
          )}
        </div>

        {/* 현재 강의 섹션 */}
        <div className="mylec-lec-container">
          <div className="mylec-sub-title-area">
            <p className="mylec-sub-title">{currentSectionTitle}</p>
            <div className="mylec-current-number">
              {currentLectures.length}개
            </div>
          </div>

          <div className="mylec-current-list">
            {currentLectures.length > 0 ? (
              currentLectures.map((lecture) => (
                <LectureItem
                  key={lecture.lectureId}
                  lecture={lecture}
                  mode="list"
                  isMyLecturePage={true}
                />
              ))
            ) : (
              <div className="mylec-empty">
                {currentUser?.role === "student"
                  ? "수강중인 강의가 없습니다."
                  : "대기 중이거나 진행 중인 강의가 없습니다."}
              </div>
            )}
          </div>
        </div>

        {/* 끝난 강의 섹션 */}
        <div className="mylec-lec-container">
          <div className="mylec-sub-title-area">
            <p className="mylec-sub-title">종료된 강의</p>
            <div className="mylec-end-number">{finishedLectures.length}개</div>
          </div>

          <div className="mylec-end-list">
            {finishedLectures.length > 0 ? (
              finishedLectures.map((lecture) => (
                <LectureItem
                  key={lecture.lectureId}
                  lecture={lecture}
                  mode="list"
                  isMyLecturePage={true}
                />
              ))
            ) : (
              <div className="mylec-empty">종료된 강의가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLecturePage;
