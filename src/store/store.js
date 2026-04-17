import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import lectureReducer from "./lectureSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    lecture: lectureReducer,
    user: userReducer,
  },
});

export default store;
