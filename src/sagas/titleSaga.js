import { takeEvery, select } from "redux-saga/effects";
import { setAppTitle } from "../features/titleSlice";

export function* handleTitleChange() {
  const { title } = yield select();

  document.title = title;
}

export default function*() {
  yield takeEvery(setAppTitle, handleTitleChange);
}
