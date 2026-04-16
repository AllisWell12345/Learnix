import { createSlice } from "@reduxjs/toolkit";

// // 강의 상세
// // 프로젝트 (total)
// // 인터뷰 (total/detail)

const dummyLectures = [
  {
    userid: 2,
    lectureId: 1,
    title: "강의 제목",
    subTitle: "강의 한줄 설명",
    teacherName: "홍길동",
    season: 1,
    category: "프론트엔드",
    price: 10000,
    members: 50,
    recruitStart: "2026-04-11",
    recruitEnd: "2026-04-25",
    studyStart: "2026-04-26",
    studyEnd: "2026-07-26",
    status: "finished",
  },
  {
    userid: 2,
    lectureId: 2,
    title: "강의 제목",
    subTitle: "강의 한줄 설명",
    teacherName: "홍길동",
    season: 3,
    category: "프론트엔드",
    price: 10000,
    members: 50,
    recruitStart: "2026-04-11",
    recruitEnd: "2026-04-25",
    studyStart: "2026-04-26",
    studyEnd: "2026-07-26",
    status: "finished",
  },
];

const lectureSlice = createSlice({
  name: "lecture",
  initialState: {
    lectures: dummyLectures,
  },
  reducers: {
    setLectures: (state, action) => {
        state.lectures = action.payload;
    },
  },
});

export const { setLectures } = lectureSlice.actions;
export default lectureSlice.reducer;
