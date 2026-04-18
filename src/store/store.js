import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import searchbarReducer from "./searchbarSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    searchbar: searchbarReducer,
  },
});

export default store;
