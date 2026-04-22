import React, { useEffect, useRef, useState } from "react";
import {
  createLecture,
  getLectureById,
  updateLecture,
} from "../../services/lectureService";
import {
  createVideo,
  getVideosByLectureId,
  updateVideo,
} from "../../services/videoService";
import useModal from "../../hooks/useModal";
import FileIcon from "../../assets/img/fileIcon.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const categories = ["프론트엔드", "백엔드", "UI/UX", "데이터 분석"];

const createEmptyVideo = (order) => ({
  videoId: null,
  order,
  title: "",
  subTitle: "",
  file: null,
});

function LectureForm({ mode = "regist", lectureId = null, onCancel }) {
  const navigate = useNavigate();
  const thumbInputRef = useRef(null);

  const [loading, setLoading] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTried, setSubmitTried] = useState(false);
  const { modal, openModal } = useModal();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [form, setForm] = useState({
    thumbnail: null,
    title: "",
    subTitle: "",
    season: "",
    category: "",
    price: "",
    members: "",
    recruitStart: "",
    recruitEnd: "",
    studyStart: "",
    studyEnd: "",
  });

  const [errors, setErrors] = useState({});
  const [videos, setVideos] = useState([createEmptyVideo(1)]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  useEffect(() => {
    if (mode !== "edit" || !lectureId) return;

    const fetchLectureData = async () => {
      setLoading(true);
      try {
        const lectureData = await getLectureById(lectureId);
        const lectureVideos = await getVideosByLectureId(Number(lectureId));

        if (lectureData) {
          setForm({
            thumbnail: null,
            title: lectureData.title || "",
            subTitle: lectureData.subTitle || "",
            season: lectureData.season || "",
            category: lectureData.category || "",
            price: lectureData.price || "",
            members: lectureData.members || "",
            recruitStart: lectureData.recruitStart || "",
            recruitEnd: lectureData.recruitEnd || "",
            studyStart: lectureData.studyStart || "",
            studyEnd: lectureData.studyEnd || "",
          });
        }

        if (lectureVideos.length > 0) {
          setVideos(
            lectureVideos.map((video, index) => ({
              videoId: video.videoId || null,
              order: video.order || index + 1,
              title: video.title || "",
              subTitle: video.subTitle || "",
              file: null,
            })),
          );
        } else {
          setVideos([createEmptyVideo(1)]);
        }
      } catch (error) {
        console.error("강의 데이터 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectureData();
  }, [mode, lectureId]);

  const validateForm = (targetForm = form, targetVideos = videos) => {
    const nextErrors = {};

    if (!targetForm.thumbnail && mode === "regist") {
      nextErrors.thumbnail = "강의 썸네일을 업로드해주세요";
    }

    if (!targetForm.title.trim()) {
      nextErrors.title = "강의 제목을 입력해주세요";
    }

    if (!targetForm.subTitle.trim()) {
      nextErrors.subTitle = "강의 요약 설명을 입력해주세요";
    }

    if (!String(targetForm.season).trim()) {
      nextErrors.season = "시즌명을 입력해주세요";
    }

    if (!String(targetForm.category).trim()) {
      nextErrors.category = "카테고리를 선택해주세요";
    }

    if (targetForm.price === "") {
      nextErrors.price = "가격을 입력해주세요";
    }

    if (targetForm.members === "") {
      nextErrors.members = "모집 인원을 입력해주세요";
    }

    if (!targetForm.recruitStart) {
      nextErrors.recruitStart = "모집 시작일을 선택해주세요";
    }

    if (!targetForm.recruitEnd) {
      nextErrors.recruitEnd = "모집 종료일을 선택해주세요";
    }

    if (!targetForm.studyStart) {
      nextErrors.studyStart = "학습 시작일을 선택해주세요";
    }

    if (!targetForm.studyEnd) {
      nextErrors.studyEnd = "학습 종료일을 선택해주세요";
    }

    targetVideos.forEach((video, index) => {
      if (!video.title.trim()) {
        nextErrors[`videoTitle-${index}`] =
          `${index + 1}주차 동영상 제목을 입력해주세요`;
      }

      if (!video.subTitle.trim()) {
        nextErrors[`videoSubTitle-${index}`] =
          `${index + 1}주차 동영상 내용을 입력해주세요`;
      }

      if (!video.file && mode === "regist") {
        nextErrors[`videoFile-${index}`] =
          `${index + 1}주차 동영상 파일을 첨부해주세요`;
      }
    });

    return nextErrors;
  };

  const updateFormField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleThumbChange = (e) => {
    const file = e.target.files?.[0] || null;
    updateFormField("thumbnail", file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  const handleInputChange = (field) => (e) => {
    updateFormField(field, e.target.value);
  };

  const handleDateChange = (field) => (e) => {
    const value = e.target.value;

    setForm((prev) => {
      const next = { ...prev, [field]: value };

      if (
        field === "recruitStart" &&
        prev.recruitEnd &&
        value > prev.recruitEnd
      ) {
        next.recruitEnd = "";
      }

      if (
        field === "recruitEnd" &&
        prev.studyStart &&
        value > prev.studyStart
      ) {
        next.studyStart = "";
      }

      if (field === "studyStart" && prev.studyEnd && value > prev.studyEnd) {
        next.studyEnd = "";
      }

      return next;
    });

    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      if (field === "recruitStart") delete next.recruitEnd;
      if (field === "recruitEnd") delete next.studyStart;
      if (field === "studyStart") delete next.studyEnd;
      return next;
    });
  };

  const handleAddVideo = () => {
    setVideos((prev) => [...prev, createEmptyVideo(prev.length + 1)]);
  };

  const handleVideoChange = (index, field, value) => {
    setVideos((prev) =>
      prev.map((video, i) =>
        i === index ? { ...video, [field]: value } : video,
      ),
    );

    const errorKey =
      field === "title" ? `videoTitle-${index}` : `videoSubTitle-${index}`;

    setErrors((prev) => {
      const next = { ...prev };
      delete next[errorKey];
      return next;
    });
  };

  const handleVideoFile = (index, file) => {
    setVideos((prev) =>
      prev.map((video, i) =>
        i === index ? { ...video, file: file || null } : video,
      ),
    );

    setErrors((prev) => {
      const next = { ...prev };
      delete next[`videoFile-${index}`];
      return next;
    });
  };

  const submitLecture = async () => {
    setIsSubmitting(true);

    try {
      const lecturePayload = {
        title: form.title.trim(),
        subTitle: form.subTitle.trim(),
        season: Number(form.season),
        category: form.category,
        price: Number(form.price),
        members: Number(form.members),
        recruitStart: form.recruitStart,
        recruitEnd: form.recruitEnd,
        studyStart: form.studyStart,
        studyEnd: form.studyEnd,
        userId: currentUser.userId,
      };

      let savedLectureId = lectureId;

      if (mode === "regist") {
        const createdLecture = await createLecture({
          ...lecturePayload,
          status: "waiting",
        });
        savedLectureId = createdLecture.lectureId;
      } else {
        await updateLecture(lectureId, lecturePayload);
      }

      for (let i = 0; i < videos.length; i += 1) {
        const video = videos[i];

        const videoPayload = {
          lectureId: Number(savedLectureId),
          order: i + 1,
          title: video.title.trim(),
          subTitle: video.subTitle.trim(),
        };

        if (mode === "edit" && video.videoId) {
          await updateVideo(video.videoId, videoPayload);
        } else {
          await createVideo(videoPayload);
        }
      }

      openModal("CHECK", {
        mainMsg: mode === "edit" ? "강의 수정 완료" : "강의 등록 완료",
        subMsg:
          mode === "edit"
            ? "강의가 정상적으로 수정되었습니다."
            : "강의가 정상적으로 등록되었습니다.",
        onConfirm: () => {
          if(mode === "edit") {
            navigate(`/teacher/mylec/${lectureId}`)
          } else {
            navigate('/teacher/mylec')
          }
        }
      });
    } catch (error) {
      console.error("강의 저장 실패:", error);
      openModal("WARNING", {
        mainMsg: mode === "edit" ? "강의 수정 실패" : "강의 등록 실패",
        subMsg: "잠시 후 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setSubmitTried(true);

    const validationResult = validateForm();
    setErrors(validationResult);

    if (Object.keys(validationResult).length > 0) return;

    openModal("CONFIRM", {
      mainMsg:
        mode === "edit"
          ? "강의를 수정하시겠습니까?"
          : "강의를 등록하시겠습니까?",
      subMsg:
        mode === "edit"
          ? "확인 버튼을 누르면\n 강의 수정이 진행됩니다."
          : "확인 버튼을 누르면\n 강의 등록이 진행됩니다.",
      onConfirm: submitLecture,
    });
  };

  const getError = (key) => (submitTried ? errors[key] : "");

  if (loading) {
    return (
      <div className="lectureform-wrap">
        <div className="loading">불러오는 중...</div>
      </div>
    );
  }

  return (
    <form className="lectureform-wrap" onSubmit={handleSubmit}>
      {modal}
      <h1 className="lectureform-page-title">
        {mode === "edit" ? "강의 수정" : "새 강의 등록"}
      </h1>

      {/* 기본 정보 */}
      <div className="lectureform-section">
        <h2 className="lectureform-section-title">기본 정보</h2>

        {/* 썸네일 */}
        <div className="lectureform-field">
          <label className="lectureform-label">
            강의 썸네일 <span className="lectureform-required">*</span>
          </label>
          <div
            className="lectureform-thumb-upload"
            onClick={() => thumbInputRef.current?.click()}
          >
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="썸네일 미리보기"
                className="lectureform-thumb-img"
              />
            ) : (
              "썸네일 사진"
            )}
          </div>
          <input
            ref={thumbInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleThumbChange}
          />
          {getError("thumbnail") && (
            <p className="lectureform-error">{getError("thumbnail")}</p>
          )}
        </div>

        {/* 강의 제목 */}
        <div className="lectureform-field">
          <label className="lectureform-label">
            강의 제목 <span className="lectureform-required">*</span>
          </label>
          <input
            className="lectureform-input"
            placeholder="예: React 완벽 가이드 - 기초부터 실전까지"
            value={form.title}
            onChange={handleInputChange("title")}
          />
          {getError("title") && (
            <p className="lectureform-error">{getError("title")}</p>
          )}
        </div>

        {/* 강의 요약 설명 */}
        <div className="lectureform-field">
          <label className="lectureform-label">
            강의 요약 설명 <span className="lectureform-required">*</span>
          </label>
          <textarea
            className="lectureform-textarea"
            placeholder="강의의 주요 내용과 특징을 간단히 설명해주세요"
            value={form.subTitle}
            onChange={handleInputChange("subTitle")}
          />
          {getError("subTitle") && (
            <p className="lectureform-error">{getError("subTitle")}</p>
          )}
        </div>

        {/* 시즌 + 카테고리 */}
        <div className="lectureform-row">
          <div className="lectureform-field">
            <label className="lectureform-label">
              시즌(기) <span className="lectureform-required">*</span>
            </label>
            <input
              className="lectureform-input"
              value={form.season}
              onChange={handleInputChange("season")}
            />
            {getError("season") && (
              <p className="lectureform-error">{getError("season")}</p>
            )}
          </div>
          <div className="lectureform-field">
            <label className="lectureform-label">
              카테고리 <span className="lectureform-required">*</span>
            </label>
            <select
              className="lectureform-input"
              value={form.category}
              onChange={handleInputChange("category")}
            >
              <option value="">선택하세요</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {getError("category") && (
              <p className="lectureform-error">{getError("category")}</p>
            )}
          </div>
        </div>

        {/* 가격 */}
        <div className="lectureform-field">
          <label className="lectureform-label">
            가격 (원) <span className="lectureform-required">*</span>
          </label>
          <input
            className="lectureform-input"
            type="number"
            placeholder="예: 80000"
            value={form.price}
            onChange={handleInputChange("price")}
          />
          {getError("price") && (
            <p className="lectureform-error">{getError("price")}</p>
          )}
        </div>

        {/* 모집 인원 */}
        <div className="lectureform-field">
          <label className="lectureform-label">
            모집 인원 <span className="lectureform-required">*</span>
          </label>
          <input
            className="lectureform-input"
            type="number"
            min="1"
            value={form.members}
            onChange={handleInputChange("members")}
          />
          {getError("members") && (
            <p className="lectureform-error">{getError("members")}</p>
          )}
        </div>

        {/* 모집 시작일 / 종료일 */}
        <div className="lectureform-row">
          <div className="lectureform-field">
            <label className="lectureform-label">
              모집 시작일 <span className="lectureform-required">*</span>
            </label>
            <input
              className="lectureform-input"
              type="date"
              value={form.recruitStart}
              onChange={handleDateChange("recruitStart")}
              onClick={(e) => e.target.showPicker?.()}
            />
            {getError("recruitStart") && (
              <p className="lectureform-error">{getError("recruitStart")}</p>
            )}
          </div>
          <div className="lectureform-field">
            <label className="lectureform-label">
              모집 종료일 <span className="lectureform-required">*</span>
            </label>
            <input
              className="lectureform-input"
              type="date"
              value={form.recruitEnd}
              min={form.recruitStart || ""}
              onChange={handleDateChange("recruitEnd")}
              onClick={(e) => e.target.showPicker?.()}
            />
            {getError("recruitEnd") && (
              <p className="lectureform-error">{getError("recruitEnd")}</p>
            )}
          </div>
        </div>

        {/* 학습 시작일 / 종료일 */}
        <div className="lectureform-row">
          <div className="lectureform-field">
            <label className="lectureform-label">
              학습 시작일 <span className="lectureform-required">*</span>
            </label>
            <input
              className="lectureform-input"
              type="date"
              value={form.studyStart}
              min={form.recruitEnd || ""}
              onChange={handleDateChange("studyStart")}
              onClick={(e) => e.target.showPicker?.()}
            />
            {getError("studyStart") && (
              <p className="lectureform-error">{getError("studyStart")}</p>
            )}
          </div>
          <div className="lectureform-field">
            <label className="lectureform-label">
              학습 종료일 <span className="lectureform-required">*</span>
            </label>
            <input
              className="lectureform-input"
              type="date"
              value={form.studyEnd}
              min={form.studyStart || ""}
              onChange={handleDateChange("studyEnd")}
              onClick={(e) => e.target.showPicker?.()}
            />
            {getError("studyEnd") && (
              <p className="lectureform-error">{getError("studyEnd")}</p>
            )}
          </div>
        </div>
      </div>

      {/* 강의 영상 */}
      <div className="lectureform-section">
        <div className="lectureform-section-header">
          <h2 className="lectureform-section-title">강의 영상</h2>
          <button
            className="lectureform-add-video-btn"
            type="button"
            onClick={handleAddVideo}
          >
            + 영상 추가
          </button>
        </div>

        {videos.map((video, index) => (
          <div
            className="lectureform-video-item"
            key={`${video.videoId || "new"}-${index}`}
          >
            <p className="lectureform-video-week">{index + 1}주차</p>

            <div className="lectureform-field">
              <label className="lectureform-label">
                동영상 제목 <span className="lectureform-required">*</span>
              </label>
              <input
                className="lectureform-input"
                value={video.title}
                onChange={(e) =>
                  handleVideoChange(index, "title", e.target.value)
                }
              />
              {getError(`videoTitle-${index}`) && (
                <p className="lectureform-error">
                  {getError(`videoTitle-${index}`)}
                </p>
              )}
            </div>

            <div className="lectureform-field">
              <label className="lectureform-label">
                동영상 한줄 설명 <span className="lectureform-required">*</span>
              </label>
              <textarea
                className="lectureform-textarea"
                placeholder="해당 동영상에 대한 한줄 설명을 작성해주세요."
                value={video.subTitle}
                onChange={(e) =>
                  handleVideoChange(index, "subTitle", e.target.value)
                }
              />
              {getError(`videoSubTitle-${index}`) && (
                <p className="lectureform-error">
                  {getError(`videoSubTitle-${index}`)}
                </p>
              )}
            </div>

            <div className="lectureform-file-row">
              <label className="lectureform-file-btn">
                <img
                  src={FileIcon}
                  alt="파일 첨부"
                  className="lectureform-icon"
                />
                파일 첨부
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    handleVideoFile(index, e.target.files?.[0] || null)
                  }
                />
              </label>
              {video.file && (
                <span className="lectureform-file-name">{video.file.name}</span>
              )}
            </div>
            {getError(`videoFile-${index}`) && (
              <p className="lectureform-error">
                {getError(`videoFile-${index}`)}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="lectureform-btn-row">
        <button
          className="lectureform-cancel-btn"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          className="lectureform-submit-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "등록중..."
            : mode === "edit"
              ? "수정하기"
              : "등록하기"}
        </button>
      </div>
    </form>
  );
}

export default LectureForm;
