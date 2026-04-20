import React, { useEffect, useMemo, useState } from "react";
import "./LectureManagePage.css";
import Searchbar from "../../components/common/Searchbar";
import LectureItem from "../../components/lecture/LectureItem";
import { getLecturesAll, deleteLecture } from "../../services/lectureService";
import { deleteCartsByLectureId } from "../../services/cartService";
import { deleteAttendingsByLectureId } from "../../services/attendingService";
import { deleteProjectsByLectureId } from "../../services/projectService";
import { deleteVideosByLectureId } from "../../services/videoService";
import { deleteTemplateByLectureId } from "../../services/templateService";
import { deleteQuestionsByLectureId } from "../../services/questionService";
import { deleteAnswersByLectureId } from "../../services/answerService";
import useModal from "../../hooks/useModal";

function LectureManagePage() {
  const [lectures, setLectures] = useState([]);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const { modal, openModal } = useModal();

  // 강의 목록을 조회
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const lectureList = await getLecturesAll();
        setLectures(lectureList || []);
      } catch (error) {
        console.error("강의 목록 조회 실패:", error);
        setLectures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  // 검색어를 확정
  const handleSearch = () => {
    setKeyword(search.trim());
  };

  // 강의 삭제 시 관련 데이터까지 함께 삭제
  const handleDeleteLecture = (lecture) => {
    openModal("DELETE", {
      mainMsg: "강의를 삭제하시겠습니까?",
      subMsg: "확인 버튼을 누르면 해당 강의와 관련된 데이터도 함께 삭제됩니다.",
      onDelete: async () => {
        try {
          setDeleting(true);

          const lectureId = lecture.lectureId;

          await deleteVideosByLectureId(lectureId);
          await deleteTemplateByLectureId(lectureId);
          await deleteProjectsByLectureId(lectureId);
          await deleteQuestionsByLectureId(lectureId);
          await deleteAnswersByLectureId(lectureId);
          await deleteAttendingsByLectureId(lectureId);
          await deleteCartsByLectureId(lectureId);
          await deleteLecture(lectureId);

          setLectures((prev) =>
            prev.filter((item) => item.lectureId !== lectureId),
          );

          openModal("CHECK", {
            mainMsg: "강의가 삭제 되었습니다.",
          });
        } catch (error) {
          console.error("강의 삭제 실패:", error);
          openModal("WARNING", {
            mainMsg: "강의 삭제 실패",
            subMsg: "잠시 후 다시 시도해주세요.",
          });
        } finally {
          setDeleting(false);
        }
      },
    });
  };

  // 검색어 기준으로 강의 목록 필터링
  const filteredLectures = useMemo(() => {
    return lectures.filter((lecture) => {
      if (!keyword) return true;

      const lowerKeyword = keyword.toLowerCase();

      return (
        lecture.title.toLowerCase().includes(lowerKeyword) ||
        lecture.subTitle.toLowerCase().includes(lowerKeyword)
      );
    });
  }, [lectures, keyword]);

  if (loading) {
    return <div className="loading">불러오는 중...</div>;
  }

  return (
    <div className="lecmanage-page">
      {modal}

      <div className="lecmanage-title-container">
        <div className="lecmanage-title-area">
          <h1 className="lecmanage-title">
            <span className="lecmanage-title-bar" />
            강의 관리
          </h1>
        </div>

        <div className="lecmanage-search-area">
          <Searchbar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="lecmanage-lec-container">
        <div className="lecmanage-total-list">
          {deleting ? (
            <div className="loading">삭제하는 중...</div>
          ) : filteredLectures.length > 0 ? (
            filteredLectures.map((lecture) => (
              <div key={lecture.lectureId} className="lecmanage-lec-box">
                <LectureItem
                  lecture={lecture}
                  mode="list"
                  onDelete={handleDeleteLecture}
                />
              </div>
            ))
          ) : (
            <div className="loading">해당하는 강의가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LectureManagePage;