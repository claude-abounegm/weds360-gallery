import _ from "lodash";
import { put, call, takeEvery, select, all } from "redux-saga/effects";
import { loadImages, setGalleryData } from "../features/gallerySlice";
import { setLoading } from "../features/loadingSlice";
import { setError } from "../features/errorSlice";
import http from "../services/httpService";

function putAll(actions) {
  return all(actions.map(action => put(action)));
}

export function* handleImagesLoad() {
  const { opts } = yield select(({ gallery }) => gallery);

  function throwInvalidPage() {
    throw new Error("Invalid page");
  }

  try {
    yield put(setLoading(true));
    const { page } = opts;

    if (page < 1) {
      throwInvalidPage();
    }

    const { images, totalPages } = yield call(http.getImages, opts);

    if (totalPages === null) {
      throwInvalidPage();
    }

    yield putAll([setError(null), setGalleryData({ images, totalPages })]);
  } catch (error) {
    const err = { message: error.message };

    if (error.message.includes("Invalid page")) {
      err.to = 1;
    }

    yield put(setError(err));
  } finally {
    yield put(setLoading(false));
  }
}

export default function*() {
  yield takeEvery(loadImages, handleImagesLoad);
}
