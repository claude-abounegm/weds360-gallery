import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: { current: 1 },
  reducers: {
    incrementPage: state => {
      ++state.current;
    },
    goTo: (state, { payload: page }) => {
      page.current = page;
    }
  }
});

export const { incrementPage } = pageSlice.actions;

export default pageSlice.reducer;
