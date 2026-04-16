import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InterviewTotalPage.css";

function InterviewTotalPage() {
  const navigate = useNavigate();

  // 임시 데이터
  const testItems = [
    { id: 1, title: "강의아이템", status: "waiting" },
    { id: 2, title: "강의아이템", status: "waiting" },
    { id: 3, title: "강의아이템", status: "reviewing" },
    { id: 4, title: "강의아이템", status: "completed" },
  ];

  const [projects] = useState(testItems);

  const renderCard = (it) => (
    <div key={it.id} className="it-card">
      <div className="it-card-info">
        <h4 className="it-card-title">{it.title}</h4>
      </div>

      {it.status === "waiting" && (
        <button
          className="it-register-btn"
          onClick={() => navigate(`${it.id}`)}
        >
          모의면접 등록
        </button>
      )}
    </div>
  );

  return (
    <div className="it-page">
      <header className="it-header">
        <p className="it-main-title">모의 면접 관리</p>
      </header>

      <main className="it-sections-container">
        <section className="it-section">
          <div className="it-section-title-wrapper">
            <p className="it-sub-title">질문생성중</p>
            <span className="it-count-badge badge-waiting">
              {projects.filter((it) => it.status === "waiting").length}개
            </span>
          </div>
          <div className="it-list">
            {projects
              .filter((it) => it.status === "waiting")
              .map((it) => renderCard(it))}
          </div>
        </section>

        <section className="it-section">
          <div className="it-section-title-wrapper">
            <p className="it-sub-title">리뷰중</p>
            <span className="it-count-badge badge-reviewing">
              {projects.filter((it) => it.status === "reviewing").length}개
            </span>
          </div>
          <div className="it-list">
            {projects
              .filter((it) => it.status === "reviewing")
              .map((it) => renderCard(it))}
          </div>
        </section>

        <section className="it-section">
          <div className="it-section-title-wrapper">
            <p className="it-sub-title">면접완료</p>
            <span className="it-count-badge badge-completed">
              {projects.filter((it) => it.status === "completed").length}개
            </span>
          </div>
          <div className="it-list">
            {projects
              .filter((it) => it.status === "completed")
              .map((it) => renderCard(it))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default InterviewTotalPage;
