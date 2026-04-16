import "./InterviewNoticePage.css";

function InterviewNoticePage() {
  const projectTitle = "React를 활용한 앱 구축";

  return (
    <div className="interview-notice-container">
      <div className="interview-notice-card">
        <h1 className="interview-project-title">
          프로젝트 명 : {projectTitle}
        </h1>

        <div className="interview-guide-box">
          <p>
            1. 해당 콘텐츠는 수강생의 프로젝트 결과물을 분석 및 평가하고 강사가
            직접 작성한 모의 면접입니다.
          </p>
          <p>
            2. 각 질문마다 답변을 작성하는데 강사가 설정한 제한 시간이
            존재합니다.
          </p>
          <p>
            3. 해당 모의 면접은 구두가 아닌 텍스트로 진행되는 점을 고려하여,
            설정된 제한시간에 30초가 추가됩니다.
          </p>
          <p>
            4. 시작 버튼을 누르면 첫 번째 질문이 나타남과 동시에 제한 시간이
            시작됩니다.
          </p>
          <p>
            5. 답변 완료 버튼을 누르거나 제한 시간이 종료되면 답변 입력란이
            비활성화되고 다음 질문 시작 버튼이 활성화됩니다.
          </p>
          <p>
            6. 다음 질문 시작 버튼을 누르면 다음 질문이 나타남과 동시에 제한
            시간이 시작됩니다.
          </p>
          <p>
            7. 모의 면접이 종료되면 내 포트폴리오 탭의 모의 면접 탭에서 확인이
            가능합니다.
          </p>
          <p>8. 모의 면접 결과는 강사와 수강생만 열람이 가능합니다.</p>
        </div>

        <div className="interview-action-area">
          <button className="interview-start-btn">시작</button>
        </div>
      </div>
    </div>
  );
}

export default InterviewNoticePage;
