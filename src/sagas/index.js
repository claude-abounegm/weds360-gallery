import { put, takeEvery } from "redux-saga/effects";

function* rootSaga() {
  yield takeEvery("HELLO", workerSaga);
}

function* workerSaga() {
  console.log("hello world");
}

export default rootSaga;
