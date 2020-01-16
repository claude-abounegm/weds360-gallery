import { all } from "redux-saga/effects";

import imagesSaga from "./imagesSaga";
import pageSaga from "./pageSaga";

export default function* rootSaga() {
  yield all([imagesSaga(), pageSaga()]);
}
