import { useNavigate } from "react-router-dom";
import "./LectureItem.css";
import "../../pages/common/LectureDetailPage.css";
import StudentIcon from "../../assets/img/Icon/StudentIcon.png";
import CalendarIcon from "../../assets/img/Icon/CalendarIcon.png";
import CartIcon from "../../assets/img/Navbar/NavCartIcon.png";
import ProjectIcon from "../../assets/img/Sidebar/projectselecticon.svg";
import DeleteIcon from "../../assets/img/common/deleteIcon.svg";
import EditIcon from "../../assets/img/common/editIcon.svg";
import thumb from "../../assets/img/lectureThumb.png";
import { useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import { getQuestionsByLectureAndProject } from "../../services/questionService";
import { hasAnswersByQuestionIds } from "../../services/answerService";
import { getProjectByUserAndLecture } from "../../services/projectService";

function LectureItem({
  lecture,
  mode,
  videos = [],
  onAddToCart,
  onDelete,
  isMyLecturePage = false,
  customPath = "",
}) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { modal, openModal } = useModal();

  if (!lecture) return null;

  const isManager = currentUser?.role === "manager";

  // 현재 로그인한 강사가 이 강의를 만든 강사인지 판단
  const isMyTeacherLecture =
    currentUser?.role === "teacher" &&
    Number(lecture.userId) === Number(currentUser.userId);

  // 학생이 모의 면접 강의를 클릭했을 때 질문/답변 존재 여부에 따라 이동 처리
  const handleStudentInterviewClick = async () => {
    try {
      // 1. 현재 학생의 해당 강의 프로젝트 조회
      const currentProject = await getProjectByUserAndLecture(
        Number(currentUser?.userId),
        Number(lecture.lectureId),
      );

      // 프로젝트가 없으면 면접 진행 불가
      if (!currentProject?.projectId) {
        openModal("CHECK", {
          mainMsg: "아직 제출한 프로젝트가 없습니다.",
          subMsg: "프로젝트를 먼저 제출해주세요.",
        });
        return;
      }

      // 2. 현재 학생 프로젝트에 연결된 질문만 조회
      const questions = await getQuestionsByLectureAndProject(
        Number(lecture.lectureId),
        Number(currentProject.projectId),
      );

      // 질문이 하나도 없으면 notice도 못 감
      if (!questions.length) {
        openModal("CHECK", {
          mainMsg: "아직 면접 내용이 존재하지 않습니다.",
          subMsg: "강사님의 등록을 기다려주세요!",
        });
        return;
      }

      // 3. 조회한 질문들의 questionId 추출
      const questionIds = questions.map((item) => Number(item.questionId));

      // 4. 해당 질문들에 연결된 답변이 하나라도 있는지 확인
      const hasAnswers = await hasAnswersByQuestionIds(questionIds);

      // 5. 답변이 없으면 notice, 있으면 상세 페이지
      if (!hasAnswers) {
        navigate(
          `/student/portfolio/interview/${lecture.lectureId}/${currentProject.projectId}/notice`,
        );
        return;
      }

      navigate(
        `/student/portfolio/interview/${lecture.lectureId}/${currentProject.projectId}`,
      );
    } catch (error) {
      console.error("모의 면접 페이지 이동 실패:", error);
      openModal("WARNING", {
        mainMsg: "모의 면접 조회 실패",
        subMsg: "잠시 후 다시 시도해주세요.",
      });
    }
  };

  // 강의 아이템 클릭 시 사용자 역할과 상황에 맞는 페이지로 이동
  const handleClick = async () => {
    // 학생 + 모의 면접 경로 클릭은 별도 분기 처리
    if (
      currentUser?.role === "student" &&
      customPath &&
      customPath.includes("/student/portfolio/interview/")
    ) {
      await handleStudentInterviewClick();
      return;
    }

    if (customPath) {
      navigate(customPath);
      return;
    }

    if (!currentUser) {
      navigate(`/${lecture.lectureId}`);
      return;
    }

    if (isMyLecturePage) {
      navigate(`/${currentUser.role}/mylec/${lecture.lectureId}`);
      return;
    }

    if (currentUser.role === "manager") {
      navigate(`/manager/lecture/${lecture.lectureId}`);
      return;
    }

    navigate(`/${currentUser.role}/${lecture.lectureId}`);
  };

  // 상세 페이지 버튼 클릭 시 역할에 맞는 동작 처리 (삭제 / 수정 / 프로젝트 / 장바구니)
  const handleDetailAction = () => {
    // 관리자일 경우 삭제 처리
    if (isManager) {
      if (onDelete) {
        onDelete(lecture);
      }
      return;
    }

    // 강사일 경우: 내 강의만 수정 가능, 남의 강의는 아무 동작 안함
    if (currentUser?.role === "teacher") {
      if (!isMyTeacherLecture) return;
      if (lecture.status === "finished") return;

      navigate(`/teacher/mylec/${lecture.lectureId}/edit`);
      return;
    }

    // 학생 마이강의 페이지일 경우 프로젝트 페이지로 이동
    if (isMyLecturePage && currentUser?.role === "student") {
      navigate(`/student/mylec/${lecture.lectureId}/myproj`);
      return;
    }

    // 그 외(비로그인 포함): 장바구니 추가 로직 실행
    if (onAddToCart) {
      onAddToCart();
    }
  };

  // 상세 페이지 버튼을 보여줄지 여부 결정 (강사는 본인 강의만 표시)
  const shouldShowDetailButton = () => {
    // 관리자는 항상 표시
    if (isManager) return true;

    // 강사는 본인 강의 + 종료되지 않은 강의만 표시
    if (currentUser?.role === "teacher") {
      return isMyTeacherLecture && lecture.status !== "finished";
    }

    // 학생 마이강의 페이지는 항상 표시
    if (isMyLecturePage && currentUser?.role === "student") {
      return true;
    }

    // 기본적으로는 표시 (장바구니 버튼)
    return true;
  };

  // 상세 버튼에 표시될 텍스트 결정 (삭제 / 수정 / 프로젝트 / 장바구니)
  const getDetailButtonText = () => {
    if (isManager) return "삭제";

    if (currentUser?.role === "teacher" && isMyTeacherLecture) {
      return "수정";
    }

    if (isMyLecturePage && currentUser?.role === "student") {
      return "프로젝트";
    }

    return "장바구니";
  };

  // 상세 버튼에 표시될 아이콘 결정 (삭제 / 수정 / 프로젝트 / 장바구니)
  const getDetailButtonIcon = () => {
    if (isManager) return null;

    if (currentUser?.role === "teacher" && isMyTeacherLecture) {
      return EditIcon;
    }

    if (isMyLecturePage && currentUser?.role === "student") {
      return ProjectIcon;
    }

    return CartIcon;
  };

  if (mode === "box") {
    return (
      <>
        {modal}
        <div className="lecitem-box-card" onClick={handleClick}>
          <div className="lecitem-box-thumbbox">
            <img src={thumb} alt="강의 썸네일" className="lecitem-box-thumb" />
            <span className="lecitem-category-badge">{lecture.category}</span>
          </div>

          <div className="lecitem-box-body">
            <p className="lecitem-title">
              {lecture.title} {lecture.season}기
            </p>
            <p className="lecitem-subtitle">{lecture.subTitle}</p>

            <div className="lecitem-info">
              <p className="lecitem-info-row">
                모집 기간 : ~{lecture.recruitEnd.slice(5)}
              </p>
              <p className="lecitem-info-row">
                학습 기간 : {lecture.studyStart.slice(2)} ~{" "}
                {lecture.studyEnd.slice(2)}
              </p>
            </div>

            <div className="lecitem-footer">
              <span className="lecitem-members">
                <img
                  src={StudentIcon}
                  alt="수강인원"
                  className="lecitem-icon"
                />
                {lecture.attendingCount || 0} / {lecture.members}명
              </span>
              <span className="lecitem-price">
                {lecture.price.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (mode === "list") {
    return (
      <>
        {modal}
        <div className="lecitem-list-card" onClick={handleClick}>
          <img src={thumb} alt="강의 썸네일" className="lecitem-list-thumb" />

          <div className="lecitem-list-text">
            <span className="lecitem-category-badge">{lecture.category}</span>
            <p className="lecitem-title">
              {lecture.title} {lecture.season}기
            </p>
            <p className="lecitem-subtitle">{lecture.subTitle}</p>
          </div>

          <div className="lecitem-info-col">
            <span className="lecitem-info-col-label">
              <img src={StudentIcon} alt="수강인원" className="lecitem-icon" />
              수강생
            </span>
            <span className="lecitem-info-col-val">
              {lecture.attendingCount || 0} / {lecture.members}명
            </span>
          </div>

          <div className="lecitem-info-col">
            <span className="lecitem-info-col-label">
              <img
                src={CalendarIcon}
                alt="학습시작일"
                className="lecitem-icon"
              />
              학습 시작일
            </span>
            <span className="lecitem-info-col-val">{lecture.studyStart}</span>
          </div>

          <div className="lecitem-info-col">
            <span className="lecitem-info-col-label">
              <img
                src={CalendarIcon}
                alt="학습종료일"
                className="lecitem-icon"
              />
              학습 종료일
            </span>
            <span className="lecitem-info-col-val">{lecture.studyEnd}</span>
          </div>

          {isManager && (
            <button
              type="button"
              className="lecitem-manager-delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onDelete) onDelete(lecture);
              }}
            >
              <img src={DeleteIcon} alt="삭제" className="lecitem-icon" />
            </button>
          )}
        </div>
      </>
    );
  }

  if (mode === "detail") {
    return (
      <>
        {modal}
        <div className="content">
          <div className="lecdetail-container">
            <div className="lecdetail-thumbbox">
              <img src={thumb} alt="강의 썸네일" className="lecdetail-thumb" />

              <div className="lecdetail-info-card">
                <div className="lecdetail-info-top">
                  <span className="lecdetail-category">{lecture.category}</span>

                  {shouldShowDetailButton() && (
                    <button
                      type="button"
                      className={`lecdetail-cart-btn ${
                        isManager ? "manager" : ""
                      }`}
                      onClick={handleDetailAction}
                    >
                      {getDetailButtonIcon() && (
                        <img
                          src={getDetailButtonIcon()}
                          alt={getDetailButtonText()}
                          className="lecdetail-cart-icon"
                        />
                      )}
                      {getDetailButtonText()}
                    </button>
                  )}
                </div>

                <h1 className="lecdetail-title">
                  {lecture.title} {lecture.season}기
                </h1>
                <p className="lecdetail-subtitle">{lecture.subTitle}</p>

                <div className="lecdetail-meta">
                  <div className="lecdetail-meta-col">
                    <span className="lecdetail-meta-label">가격</span>
                    <span className="lecdetail-price">
                      {lecture.price.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lecdetail-stat-row">
              <div className="lecdetail-stat-box">
                <img
                  src={CalendarIcon}
                  alt="모집기간"
                  className="lecdetail-icon"
                />
                <p className="lecdetail-stat-label">모집 기간</p>
                <p className="lecdetail-stat-val">
                  {lecture.recruitStart} ~ {lecture.recruitEnd}
                </p>
              </div>

              <div className="lecdetail-stat-box">
                <img
                  src={CalendarIcon}
                  alt="학습기간"
                  className="lecdetail-icon"
                />
                <p className="lecdetail-stat-label">학습 기간</p>
                <p className="lecdetail-stat-val">
                  {lecture.studyStart} ~ {lecture.studyEnd}
                </p>
              </div>

              <div className="lecdetail-stat-box">
                <img
                  src={StudentIcon}
                  alt="수강인원"
                  className="lecdetail-icon"
                />
                <p className="lecdetail-stat-label">수강 인원</p>
                <p className="lecdetail-stat-val">
                  {lecture.attendingCount || 0} / {lecture.members}명
                </p>
              </div>
            </div>

            <div className="lecdetail-video-card">
              <h2 className="lecdetail-video-title">강의 목차</h2>

              <div className="lecdetail-video-list">
                {videos.length > 0 ? (
                  videos.map((video) => (
                    <div
                      className="lecdetail-video-item"
                      key={video.videoId || video.id}
                    >
                      <span className="lecdetail-video-no">{video.order}</span>
                      <div className="lecdetail-video-text">
                        <p className="lecdetail-video-name">{video.title}</p>
                        <p className="lecdetail-video-desc">{video.subTitle}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="lecdetail-video-empty">
                    등록된 강의 영상이 없습니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}

export default LectureItem;
