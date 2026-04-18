import React, { useEffect, useMemo, useState } from "react";
import "./LectureManagePage.css";
import Searchbar from "../../components/common/Searchbar";
import filter from "../../assets/img/common/filterIcon.svg";
import LectureItem from "../../components/lecture/LectureItem";
import { getLecturesAll, deleteLecture } from "../../services/lectureService";
import useModal from "../../hooks/useModal";

function LectureManagePage() {
  const [lectures, setLectures] = useState([]);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  const { modal, openModal } = useModal();

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

  const handleSearch = () => {
    setKeyword(search.trim());
  };

  const handleDeleteLecture = (lecture) => {
    openModal("CONFIRM", {
      mainMsg: "강의를 삭제하시겠습니까?",
      subMsg: "확인 버튼을 누르면 해당 강의가 삭제됩니다.",
      onConfirm: async () => {
        try {
          await deleteLecture(lecture.lectureId);

          setLectures((prev) =>
            prev.filter((item) => item.lectureId !== lecture.lectureId),
          );

          openModal("CHECK", {
            mainMsg: "삭제가 되었습니다.",
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
    return <div>로딩중입니다...</div>;
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
          {filteredLectures.map((lecture) => (
            <div key={lecture.lectureId} className="lecmanage-lec-box">
              <LectureItem
                lecture={lecture}
                mode="list"
                onDelete={handleDeleteLecture}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LectureManagePage;