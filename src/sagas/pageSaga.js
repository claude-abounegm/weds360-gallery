import { put, takeEvery } from "redux-saga/effects";

import { incrementPage } from "../features/pageSlice";

export function* handleIncrementPage() {
  // yield put(loadImages());
}

export default function*() {
  yield takeEvery(incrementPage, handleIncrementPage);
}
