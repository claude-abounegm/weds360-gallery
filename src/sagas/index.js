import { all } from "redux-saga/effects";

import gallerySaga from "./gallerySaga";

export default function* rootSaga() {
  yield all([gallerySaga()]);
}
