import React, { useState, useRef } from "react";
import "./LectureForm.css";

const categories = ["프론트엔드", "백엔드", "UI/UX", "데이터 분석"];

function LectureForm({ onCancel }) {
  return (
    <form className="lectureform-wrap">
      <h1 className="lectureform-page-title">새 강의 등록</h1>

      {/* 기본 정보 */}
      <div className="lectureform-section">
        <h2 className="lectureform-section-title">기본 정보</h2>

        {/* 썸네일 */}
        <div className="lectureform-field">
          <label className="lectureform-label">
            강의 썸네일 <span className="lectureform-required">*</span>
          </label>
          <div className="lectureform-thumb-upload">썸네일 사진</div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
          {/* 에러메세지 */}
        </div>

        {/* 강의 제목 */}
        <div className="lectureform-field">
          <label className="lectureform-label">
            강의 제목 <span className="lectureform-required">*</span>
          </label>
          <input
            className='lectureform-input'
            placeholder="예: React 완벽 가이드 - 기초부터 실전까지"
            // value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* 에러메세지 */}
        </div>

        {/* 강의 요약 설명 */}
        <div className="lectureform-field">
          <label className="lectureform-label">
            강의 요약 설명 <span className="lectureform-required">*</span>
          </label>
          <textarea
            className='lectureform-textarea'
            placeholder="강의의 주요 내용과 특징을 간단히 설명해주세요"
            // value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
          {/* 에러메세지 */}
        </div>

        {/* 시즌 + 카테고리 */}
        <div className="lectureform-row">
          <div className="lectureform-field">
            <label className="lectureform-label">
              시즌(기) <span className="lectureform-required">*</span>
            </label>
            <input
              className='lectureform-input'
            //   value={season}
              onChange={(e) => setSeason(e.target.value)}
            />
            {/* 에러메세지 */}
          </div>
          <div className="lectureform-field">
            <label className="lectureform-label">
              카테고리 <span className="lectureform-required">*</span>
            </label>
            <select
              className='lectureform-input'
            //   value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">선택하세요</option>
            </select>
            {/* 에러메세지 */}
          </div>
        </div>

        {/* 가격 */}
        <div className="lectureform-field">
          <label className="lectureform-label">
            가격 (원) <span className="lectureform-required">*</span>
          </label>
          <input
            className='lectureform-input'
            type="number"
            placeholder="예: 80,000"
            // value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {/* 에러메세지 */}
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
            // value={members}
            onChange={(e) => setMembers(e.target.value)}
          />
        </div>

        {/* 모집 시작일 / 종료일 */}
        <div className="lectureform-row">
          <div className="lectureform-field">
            <label className="lectureform-label">
              모집 시작일 <span className="lectureform-required">*</span>
            </label>
            <input
              className='lectureform-input'
              type="date"
            //   value={recruitStart}
              onChange={(e) => {
                setRecruitStart(e.target.value);
                // 시작일보다 이전 종료일 초기화
                if (recruitEnd && e.target.value > recruitEnd)
                  setRecruitEnd("");
              }}
              onClick={(e) => e.target.showPicker()}
            />
            {/* 에러메세지 */}
          </div>
          <div className="lectureform-field">
            <label className="lectureform-label">
              모집 종료일 <span className="lectureform-required">*</span>
            </label>
            <input
              className='lectureform-input'
              type="date"
            //   value={recruitEnd}
            //   min={recruitStart || ""} // 모집 시작일 이후만 선택 가능
              onChange={(e) => {
                setRecruitEnd(e.target.value);
                // 종료일보다 이전 학습 시작일 초기화
                if (studyStart && e.target.value > studyStart)
                  setStudyStart("");
              }}
              onClick={(e) => e.target.showPicker()}
            />
            {/* 에러메세지 */}
          </div>
        </div>

        {/* 학습 시작일 / 종료일 */}
        <div className="lectureform-row">
          <div className="lectureform-field">
            <label className="lectureform-label">
              학습 시작일 <span className="lectureform-required">*</span>
            </label>
            <input
              className='lectureform-input'
              type="date"
            //   value={studyStart}
            //   min={recruitEnd || ""} // 모집 종료일 이후만 선택 가능
              onChange={(e) => {
                setStudyStart(e.target.value);
                if (studyEnd && e.target.value > studyEnd) setStudyEnd("");
              }}
              onClick={(e) => e.target.showPicker()}
            />
            {/* 에러메세지 */}
          </div>
          <div className="lectureform-field">
            <label className="lectureform-label">
              학습 종료일 <span className="lectureform-required">*</span>
            </label>
            <input
              className='lectureform-input'
              type="date"
            //   value={studyEnd}
            //   min={studyStart || ""} // 학습 시작일 이후만 선택 가능
            //   onChange={(e) => setStudyEnd(e.target.value)}
              onClick={(e) => e.target.showPicker()}
            />
            {/* 에러메세지 */}
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
            // onClick={handleAddVideo}
          >
            + 영상 추가
          </button>
        </div>

        {/* {videos.map((video, index) => ( */}
          <div className="lectureform-video-item">
            <p className="lectureform-video-week">주차</p>

            <div className="lectureform-field">
              <label className="lectureform-label">
                동영상 제목 <span className="lectureform-required">*</span>
              </label>
              <input
                className='lectureform-input'
                // value={video.title}
                // onChange={(e) =>
                //   handleVideoChange(index, "title", e.target.value)
                // }
              />
              {/* 에러메세지 */}
            </div>

            <div className="lectureform-field">
              <label className="lectureform-label">
                동영상 한줄 설명 <span className="lectureform-required">*</span>
              </label>
              <textarea
                className='lectureform-textarea'
                placeholder="해당 동영상에 대한 한줄 설명을 작성해주세요."
                // value={video.desc}
                // onChange={(e) =>
                //   handleVideoChange(index, "desc", e.target.value)
                // }
              />
              {/* 에러메세지 */}
            </div>

            {/* 파일 첨부 */}
            <div className="lectureform-file-row">
              <label className="lectureform-file-btn">
                <img alt='파일 첨부'  className="lectureform-icon"/>
                파일 첨부
                <input
                  type="file"
                  accept="video/*"
                  style={{ display: "none" }}
                //   onChange={(e) => handleVideoFile(index, e.target.files[0])}
                />
              </label>
              {/* {video.file && (
                <span className="lectureform-file-name">{video.file.name}</span>
              )} */}
            </div>
          </div>
        {/* ))} */}
      </div>

      {/* 하단 버튼 */}
      <div className="lectureform-btn-row">
        <button
          className="lectureform-cancel-btn"
          type="button"
          onClick={onCancel}
        >
          취소
        </button>
        <button className="lectureform-submit-btn" type="submit">
          등록하기
        </button>
      </div>
    </form>
  );
}

export default LectureForm;
