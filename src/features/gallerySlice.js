import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    opts: { page: 1, limit: 9 },
    totalPages: null,
    images: null
  },
  reducers: {
    loadImages: (state, { payload }) => {
      state.opts = payload;
    },
    setGalleryData: (state, { payload }) => {
      _.assign(state, payload);
    }
  }
});

export const { loadImages, setGalleryData } = gallerySlice.actions;
export default gallerySlice.reducer;
