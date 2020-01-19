import { createSlice } from "@reduxjs/toolkit";

const titlePrefix = "Weds360";

const titleSlice = createSlice({
  name: "title",
  initialState: titlePrefix,
  reducers: {
    setAppTitle: (state, { payload: title }) => `${titlePrefix} | ${title}`
  }
});

export const { setAppTitle } = titleSlice.actions;
export default titleSlice.reducer;
