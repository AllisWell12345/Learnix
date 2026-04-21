import "./InterviewPracticePage.css";
import timer from "../../assets/img/TimerIcon.svg";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useModal from "../../hooks/useModal";
import { getQuestionsByLectureAndProject } from "../../services/questionService";
import { getProjectByUserAndLecture } from "../../services/projectService";
import { createAnswer } from "../../services/answerService";

// 문제당 제한 시간: 2분(120초)
const QUESTION_TIME = 120;

function InterviewPracticePage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const { modal, openModal } = useModal();

  // 불러온 질문 목록
  const [questions, setQuestions] = useState([]);

  // 각 질문에 대한 답변 상태
  // 화면 제어를 위해 answerText, isLocked 등을 함께 관리
  const [answers, setAnswers] = useState([]);

  // 현재 진행 중인 질문의 인덱스
  const [activeIndex, setActiveIndex] = useState(0);

  // 현재 질문에 대한 남은 시간
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  // 초기 질문 로딩 상태
  const [loading, setLoading] = useState(true);

  // 제출 중 상태
  const [submitting, setSubmitting] = useState(false);

  // setInterval ID를 저장해서 문제 전환 시 타이머를 정리하기 위한 ref
  const timerRef = useRef(null);

  // 현재 마지막 문제인지 여부
  const isLastQuestion =
    questions.length > 0 && activeIndex === questions.length - 1;

  // 현재까지 화면에 보여줄 문제들
  // 예: 2번 문제 진행 중이면 1번, 2번 문제가 보임
  const visibleQuestions = useMemo(() => {
    return questions.slice(0, activeIndex + 1);
  }, [questions, activeIndex]);

  // 초를 "m : ss" 형태로 변환
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min} : ${sec}`;
  };

  // 페이지 진입 시 lectureId에 해당하는 질문 목록을 불러옴
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        if (!currentUser?.userId || !lectureId) {
          setQuestions([]);
          setAnswers([]);
          return;
        }

        // 1. 현재 학생의 해당 강의 프로젝트 조회
        const currentProject = await getProjectByUserAndLecture(
          currentUser.userId,
          lectureId,
        );

        // 프로젝트가 없으면 질문도 없음
        if (!currentProject?.projectId) {
          setQuestions([]);
          setAnswers([]);
          return;
        }

        // 2. lectureId + projectId를 모두 만족하는 질문만 조회
        const questionList = await getQuestionsByLectureAndProject(
          Number(lectureId),
          Number(currentProject.projectId),
        );

        // 3. 순서 정렬
        const sortedQuestions = [...(questionList || [])].sort(
          (a, b) => Number(a.order) - Number(b.order),
        );

        setQuestions(sortedQuestions);

        // 4. 답변 상태 초기화
        setAnswers(
          sortedQuestions.map((question, index) => ({
            questionId: Number(question.questionId),
            order: Number(question.order ?? index + 1),
            questionText: question.question,
            answerText: "",
            isLocked: false,
          })),
        );
      } catch (error) {
        console.error("질문 조회 실패:", error);
        setQuestions([]);
        setAnswers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [lectureId, currentUser]);

  // 현재 활성 질문이 바뀔 때마다 2분 타이머를 새로 시작
  useEffect(() => {
    // 아직 로딩 중이거나 질문이 없으면 실행하지 않음
    if (loading || !questions.length) return;

    // 제출 중이면 타이머 동작 중지
    if (submitting) return;

    // 이전 타이머가 남아 있다면 먼저 정리
    clearInterval(timerRef.current);

    const currentAnswer = answers[activeIndex];

    // 현재 답변이 없거나 이미 잠겨 있으면 타이머 시작 불필요
    if (!currentAnswer || currentAnswer.isLocked) return;

    // 새 문제 시작 시 타이머 2분으로 초기화
    setTimeLeft(QUESTION_TIME);

    // 1초마다 감소
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        // 시간이 0이 되면 입력 잠금
        if (prev <= 1) {
          clearInterval(timerRef.current);

          setAnswers((prevAnswers) =>
            prevAnswers.map((item, index) =>
              index === activeIndex
                ? {
                    ...item,
                    isLocked: true,
                  }
                : item,
            ),
          );

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    // cleanup
    return () => clearInterval(timerRef.current);
  }, [activeIndex, loading, questions.length, submitting]);

  // 현재 문제 답변 입력 변경
  const handleChangeAnswer = (index, value) => {
    setAnswers((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, answerText: value } : item,
      ),
    );
  };

  // 다음 문제 / 제출 버튼 클릭 처리
  const handleNextQuestion = () => {
    if (!questions.length) return;

    const currentAnswer = answers[activeIndex];
    const isAnswerEmpty = !currentAnswer?.answerText?.trim();

    // 아직 시간이 남아 있는데 답변을 하나도 입력하지 않았다면 경고 모달
    if (timeLeft > 0 && isAnswerEmpty) {
      openModal("WARNING", {
        mainMsg: "답변을 입력해주세요.",
      });
      return;
    }

    // 현재 문제를 잠금 처리
    setAnswers((prev) =>
      prev.map((item, index) =>
        index === activeIndex
          ? {
              ...item,
              isLocked: true,
            }
          : item,
      ),
    );

    // 현재 문제 타이머 종료
    clearInterval(timerRef.current);

    // 마지막 문제가 아니면 다음 문제로 이동
    if (!isLastQuestion) {
      setActiveIndex((prev) => prev + 1);
      return;
    }

    // 마지막 문제라면 제출 확인 모달 표시
    openModal("CONFIRM", {
      mainMsg: "면접 답변을 제출하시겠습니까?",
      subMsg: "제출한 답변은 수정이 불가능합니다.",
      onConfirm: async () => {
        try {
          setSubmitting(true);

          for (const item of answers) {
            await createAnswer({
              lectureId: Number(lectureId),
              questionId: Number(item.questionId),
              answer: item.answerText,
            });
          }

          openModal("CHECK", {
            mainMsg: "제출이 완료되었습니다.",
            subMsg: "수고하셨습니다!",
            onConfirm: () => {
              navigate("/student/portfolio/interview");
            },
          });
        } catch (error) {
          console.error("면접 답변 제출 실패:", error);
          openModal("WARNING", {
            mainMsg: "제출에 실패했습니다.",
            subMsg: "잠시 후 다시 시도해주세요.",
          });
        } finally {
          setSubmitting(false);
        }
      },
    });
  };

  // 컴포넌트 종료 시 타이머 정리
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // 로딩 중 화면
  if (loading) {
    return (
      <div className="practice-container">
        {modal}
        <div className="loading">불러오는 중...</div>
      </div>
    );
  }

  // 질문이 없는 경우
  if (!questions.length) {
    return (
      <div className="practice-container">
        {modal}
        <div className="practice-card">등록된 질문이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="practice-container">
      {modal}

      <div className="practice-card">
        <div className="question-container">
          {visibleQuestions.map((question, index) => {
            const isCurrent = index === activeIndex;
            const isLocked = answers[index]?.isLocked ?? false;

            // 현재 진행 중인 문제만 실제 남은 시간 표시
            // 이전 문제는 종료 상태이므로 0:00으로 표시
            const displayTime = isCurrent ? timeLeft : 0;

            // 30초 이하일 때 빨간색 강조용 클래스 부여
            const isWarning = isCurrent && timeLeft <= 30;

            return (
              <div
                className="question-wrapper"
                key={question.questionId ?? index}
              >
                <div className="question-header">
                  <span className="question-text">
                    {index + 1}. {question.question}
                  </span>

                  <span className="timer">
                    <img src={timer} alt="타이머" className="timer-icon" />
                    <div
                      className={`timer-time ${isWarning ? "timer-warning" : ""}`}
                    >
                      {formatTime(displayTime)}
                    </div>
                  </span>
                </div>

                <textarea
                  className="answer-input"
                  placeholder="답변을 입력하세요"
                  value={answers[index]?.answerText || ""}
                  onChange={(e) => handleChangeAnswer(index, e.target.value)}
                  // 현재 문제만 입력 가능
                  // 시간이 끝났거나 다음 문제로 넘어간 문제는 입력 불가
                  // 제출 중에도 입력 불가
                  disabled={!isCurrent || isLocked || submitting}
                />
              </div>
            );
          })}

          <div className="button-area">
            <button
              className="next-action-btn"
              onClick={handleNextQuestion}
              disabled={submitting}
            >
              {isLastQuestion
                ? submitting
                  ? "제출중..."
                  : "제출"
                : "다음 문제"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewPracticePage;
