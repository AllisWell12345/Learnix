import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LectureItem from "../../components/lecture/LectureItem";
import { getLectureById, deleteLecture } from "../../services/lectureService";
import { getVideosByLectureId } from "../../services/videoService";
import {
  createCart,
  getCartByUserAndLecture,
} from "../../services/cartService";
import {
  getAttendingByUserAndLecture,
  getAttendingCountByLectureId,
} from "../../services/attendingService";
import useModal from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { deleteCartsByLectureId } from "../../services/cartService";
import { deleteAttendingsByLectureId } from "../../services/attendingService";
import { deleteProjectsByLectureId } from "../../services/projectService";
import { deleteVideosByLectureId } from "../../services/videoService";
import { deleteTemplateByLectureId } from "../../services/templateService";
import { deleteQuestionsByLectureId } from "../../services/questionService";
import { deleteAnswersByLectureId } from "../../services/answerService";

function LectureDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lectureId } = useParams();
  const { modal, openModal } = useModal();

  const [lecture, setLecture] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [attendingCount, setAttendingCount] = useState(0);

  const currentUser = useSelector((state) => state.user.currentUser);

  const isMyLecturePage = location.pathname.includes("/mylec/");

  useEffect(() => {
    const fetchLectureDetail = async () => {
      try {
        setLoading(true);

        const lectureData = await getLectureById(Number(lectureId));
        const videoList = await getVideosByLectureId(Number(lectureId));
        const attendingList = await getAttendingCountByLectureId(Number(lectureId));

        setLecture({
          ...lectureData,
          attendingCount: attendingList.length,
        });
        setVideos(videoList || []);
        setAttendingCount(attendingList.length);
      } catch (error) {
        console.error("강의 상세 조회 실패:", error);
        setLecture(null);
        setVideos([]);
        setAttendingCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchLectureDetail();
  }, [lectureId]);

  // 관리자 강의 삭제 시 관련 데이터도 함께 삭제
  const handleDeleteLecture = (targetLecture) => {
    openModal("DELETE", {
      mainMsg: "강의를 삭제하시겠습니까?",
      subMsg: "확인 버튼을 누르면\n 해당 강의와 관련된 데이터도 함께 삭제됩니다.",
      onDelete: async () => {
        try {
          const lectureId = targetLecture.lectureId;

          // 강의에 연결된 하위 데이터 먼저 삭제
          await deleteVideosByLectureId(lectureId);
          await deleteTemplateByLectureId(lectureId);
          await deleteProjectsByLectureId(lectureId);
          await deleteQuestionsByLectureId(lectureId);
          await deleteAnswersByLectureId(lectureId);
          await deleteAttendingsByLectureId(lectureId);
          await deleteCartsByLectureId(lectureId);

          // 마지막으로 강의 삭제
          await deleteLecture(lectureId);

          openModal("CHECK", {
            mainMsg: "강의가 삭제 되었습니다.",
            onConfirm: () => {
              navigate("/manager/lecture");
            },
          });
        } catch (error) {
          console.error("강의 삭제 실패:", error);
          openModal("WARNING", {
            mainMsg: "강의 삭제 실패",
            subMsg: "잠시 후 다시 시도해주세요.",
          });
        }
      },
    });
  };

  const handleAddToCart = () => {
    if (!currentUser) {
      openModal("WARNING", {
        mainMsg: "로그인 후 이용해주세요.",
        subMsg: "로그인 페이지로 이동합니다.",
        onConfirm: () => {
          navigate("/login");
        },
      });
      return;
    }

    if (!lecture) return;

    openModal("CONFIRM", {
      mainMsg: "장바구니에 추가하시겠습니까?",
      subMsg: "확인 버튼을 누르면\n 해당 강의가 장바구니에 추가됩니다.",
      onConfirm: async () => {
        try {
          setCartLoading(true);

          const existingAttending = await getAttendingByUserAndLecture(
            currentUser.userId,
            lecture.lectureId,
          );

          if (existingAttending) {
            openModal("WARNING", {
              mainMsg: "장바구니 추가 실패",
              subMsg: "이미 신청한 강의입니다.",
            });
            return;
          }

          const existingCart = await getCartByUserAndLecture(
            currentUser.userId,
            lecture.lectureId,
          );

          if (existingCart) {
            openModal("WARNING", {
              mainMsg: "장바구니 추가 실패",
              subMsg: "이미 장바구니에 추가된 강의입니다.",
            });
            return;
          }

          await createCart({
            userId: currentUser.userId,
            lectureId: lecture.lectureId,
            title: lecture.title,
            subTitle: lecture.subTitle,
            season: lecture.season,
            category: lecture.category,
            price: lecture.price,
            members: lecture.members,
            recruitEnd: lecture.recruitEnd,
            studyStart: lecture.studyStart,
            studyEnd: lecture.studyEnd,
          });

          openModal("CHECK", {
            mainMsg: "장바구니에 추가되었습니다.",
            subMsg: "확인 버튼을 누르면\n 장바구니 페이지로 이동합니다.",
            onConfirm: () => {
              navigate(`/${currentUser.role}/cart`);
            },
          });
        } catch (error) {
          console.error("장바구니 추가 실패:", error);
          openModal("WARNING", {
            mainMsg: "장바구니 추가 실패",
            subMsg: "잠시 후 다시 시도해주세요.",
          });
        } finally {
          setCartLoading(false);
        }
      },
    });
  };

  if (loading || cartLoading) {
    return <div className="content"><div className="loading">불러오는 중...</div></div>;
  }

  if (!lecture) {
    return <div>강의를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      {modal}
      <LectureItem
        lecture={lecture}
        mode="detail"
        videos={videos}
        onAddToCart={handleAddToCart}
        onDelete={handleDeleteLecture}
        isMyLecturePage={isMyLecturePage}
      />
    </>
  );
}

export default LectureDetailPage;
