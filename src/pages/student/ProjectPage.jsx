import { Outlet } from "react-router-dom";
import "./ProjectPage.css";

function ProjectPage() {
  return (
    <div className="content">
      <div className="proj-container">
        <div className="proj-left-card">
          <div className="proj-card-header">프로젝트 템플릿</div>
          <div className="proj-topic-box">주제:</div>
          <div className="proj-guide-list">
            <p>1. 프로젝트 설명 :</p>
            <p>2. 요구 사항 :</p>
            <p>3. 제약 사항 :</p>
            <p>4. 가이드 라인 :</p>
            <p>5. 참고자료 :</p>
          </div>
        </div>

        <div className="proj-right-card">
          <div className="proj-card-header">프로젝트 결과 보고서</div>
          <button className="proj-write-btn">＋ 작성하기</button>

          <div className="proj-report-content">{/* 요소 가져오기 */}</div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
