import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import lectureReducer from "./lectureSlice";
import userReducer from "./userSlice";
import searchbarReducer from "./searchbarSlice";
import interviewReducer from "./interviewSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    lecture: lectureReducer,
    user: userReducer,
    searchbar: searchbarReducer,
    interview: interviewReducer,
  },
});

export default store;
