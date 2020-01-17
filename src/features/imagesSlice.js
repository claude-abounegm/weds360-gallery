import { createSlice } from "@reduxjs/toolkit";

const imagesSlice = createSlice({
  name: "images",
  initialState: {
    opts: { page: 1, limit: 9 },
    pagination: { current: 1, total: 1 },
    data: null
  },
  reducers: {
    loadImages: (state, { payload }) => {
      state.opts = payload;
    },
    setImages: (state, { payload: { images, totalPages } }) => {
      state.data = images;
      state.pagination.total = totalPages;
    }
  }
});

export const { loadImages, setImages } = imagesSlice.actions;
export default imagesSlice.reducer;
