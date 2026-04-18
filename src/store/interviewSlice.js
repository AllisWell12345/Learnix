import { createSlice } from "@reduxjs/toolkit";

const dummyInterviews = [
  {
    interviewId: 1,
    projectId: 1,
    lectureTitle: "React 마스터 클래스",
    projectTitle: "React 쇼핑몰 프로젝트",
    submitDate: "2026.04.05",
    student: {
      name: "김철수",
      email: "kim@example.com",
    },
    questions: [
      {
        question: "1분 자기소개를 시작해주세요.",
        answer: "안녕하세요 저는 ~~~",
      },
      {
        question: "프로젝트를 진행할 때 데이터를 불러오는 과정에서 불필요한 성능 저하를 방지하기 위해 사용한 방법과 그 이유를 설명해주세요.",
        answer: "저는 데이터를 불러올 때 불필요한 성능 저하를 방지하기 위해 useEffect 라는 훅을 ~~~",
      },
    ],
    comments: [
      {
        commentId: 1,
        author: "김강사",
        role: "teacher",
        date: "2024.03.16 14:30",
        content: "프로젝트 구조가 잘 짜여져 있네요. 다만 에러 핸들링 부분을 좀 더 보완하면 좋을 것 같습니다.",
      },
      {
        commentId: 2,
        author: "김학생",
        role: "student",
        date: "2024.03.16 15:20",
        content: "피드백 감사합니다! 에러 핸들링 부분 보완하겠습니다.",
      },
      {
        commentId: 3,
        author: "홍길동",
        role: "student",
        date: "2024.03.17 10:15",
        content: "코드를 이런식으로 작성할 수도 있군요! 좋은 방법인 것 같습니다.",
      },
    ],
  },
];

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    interviews: dummyInterviews,
  },
  reducers: {
    setInterviews: (state, action) => {
      state.interviews = action.payload;
    },
    addComment: (state, action) => {
      const { interviewId, comment } = action.payload;
      const interview = state.interviews.find((i) => i.interviewId === interviewId);
      if (interview) interview.comments.push(comment);
    },
    deleteComment: (state, action) => {
      const { interviewId, commentId } = action.payload;
      const interview = state.interviews.find((i) => i.interviewId === interviewId);
      if (interview) {
        interview.comments = interview.comments.filter((c) => c.commentId !== commentId);
      }
    },
    updateComment: (state, action) => {
      const { interviewId, commentId, content } = action.payload;
      const interview = state.interviews.find((i) => i.interviewId === interviewId);
      if (interview) {
        const comment = interview.comments.find((c) => c.commentId === commentId);
        if (comment) comment.content = content;
      }
    },
  },
});

export const { setInterviews, addComment, deleteComment, updateComment } = interviewSlice.actions;
export default interviewSlice.reducer;