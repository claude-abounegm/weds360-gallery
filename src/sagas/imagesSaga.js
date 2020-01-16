import { put, call, takeEvery, select, all } from "redux-saga/effects";

import { setImages, loadImages } from "../features/imagesSlice";
import { setError } from "../features/errorSlice";
import { setLoading } from "../features/loadingSlice";
import http from "../services/httpService";

function putAll(actions) {
  return all(actions.map(action => put(action)));
}

export function* handleImagesLoad() {
  try {
    yield put(setLoading(true));
    const opts = yield select(({ images }) => images.opts);
    const images = yield call(http.getImages, opts);

    yield putAll([setError(null), setImages(images)]);
  } catch (error) {
    yield put(setError(error.toString()));
  } finally {
    yield put(setLoading(false));
  }
}

export default function*() {
  yield takeEvery(loadImages, handleImagesLoad);
}
