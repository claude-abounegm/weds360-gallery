import { createSlice } from "@reduxjs/toolkit";

const imagesSlice = createSlice({
  name: "images",
  initialState: { opts: { page: 1, limit: 9 }, data: [] },
  reducers: {
    loadImages: (state, { payload }) => {
      state.opts = payload;
    },
    setImages: (state, { payload: images }) => {
      state.data = images;
    }
  }
});

export const { loadImages, setImages } = imagesSlice.actions;
export default imagesSlice.reducer;
