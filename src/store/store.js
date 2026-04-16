import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import lectureReducer from "./lectureSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    lecture: lectureReducer,
  },
});

export default store;
