import { createSlice } from "@reduxjs/toolkit";

const dummyItems = [
  {
    id: 1,
    lectureId: 101,
    category: "프론트엔드",
    title: "React 기반 할 일 관리 앱",
    subTitle: "체계적인 React 프로젝트 구축",
    recruitEnd: "26.04.27",
    members: 35,
    studyStart: "26.05.05",
    studyEnd: "26.07.05",
    price: 125000,
  },
  {
    id: 2,
    lectureId: 102,
    category: "백엔드",
    title: "Node.js REST API 서버 구축",
    subTitle: "실전 백엔드 개발 완성",
    recruitEnd: "26.05.03",
    members: 50,
    studyStart: "26.05.10",
    studyEnd: "26.08.10",
    price: 155000,
  },
];

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    // items: [],
    items: dummyItems,
    // totalPrice: 0,
    totalPrice: dummyItems.reduce((sum, item) => sum + item.price, 0),
  },

  reducers: {
    addToCart: (state, action) => {
      state.items.push({ ...action.payload });
      state.totalPrice += action.payload.price;
    },

    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload,
      );
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice -= existingItem.price;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
