import { all } from "redux-saga/effects";

// import gallerySaga from "./gallerySaga";
import titleSaga from "./titleSaga";

export default function* rootSaga() {
  yield all([titleSaga()]);
}
