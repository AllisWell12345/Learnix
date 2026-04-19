import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import searchbarReducer from "./searchbarSlice";
import interviewReducer from "./interviewSlice";
import projectReducer from "./projectSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    searchbar: searchbarReducer,
    interview: interviewReducer,
    project: projectReducer,
  },
});

export default store;
