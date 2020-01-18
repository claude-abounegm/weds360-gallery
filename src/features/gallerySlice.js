import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    opts: null,
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
