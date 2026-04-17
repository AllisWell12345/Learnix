import { createSlice } from "@reduxjs/toolkit";

const searchbarSlice = createSlice({
  name: "searchbar",
  initialState: {
    search: "",
    keyword: "",
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { setSearch, setKeyword } = searchbarSlice.actions;
export default searchbarSlice.reducer;