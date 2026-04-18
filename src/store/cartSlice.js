import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    processing: false,
  },
  reducers: {
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCartProcessing: (state, action) => {
      state.processing = action.payload;
    },
  },
});

export const { setCartLoading, setCartProcessing } = cartSlice.actions;

export default cartSlice.reducer;