import { createSlice } from "@reduxjs/toolkit";

const dummyItems = [
  {
    userid: 1,
    lectureId: 1,
    title: "강의 제목",
    subTitle: "강의 한줄 설명",
    season: 1,
    category: "프론트엔드",
    price: 10000,
    members: 50,
    recruitEnd: "2026-04-25",
    studyStart: "2026-04-26",
    studyEnd: "2026-07-26",
  },
  {
    userid: 1,
    lectureId: 2,
    title: "강의 제목",
    subTitle: "강의 한줄 설명",
    season: 3,
    category: "프론트엔드",
    price: 10000,
    members: 50,
    recruitEnd: "2026-04-25",
    studyStart: "2026-04-26",
    studyEnd: "2026-07-26",
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
        (item) => item.lectureId === action.payload,
      );
      state.items = state.items.filter((item) => item.lectureId !== action.payload);
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
