import { put, call, takeEvery, select, all } from "redux-saga/effects";
import _ from "lodash";

import { loadImages, setGalleryData } from "../features/gallerySlice";
import { setLoading } from "../features/loadingSlice";
import { setError } from "../features/errorSlice";
import http from "../services/httpService";
import { InvalidPageError } from "../errors";

function putAll(actions) {
  return all(actions.map((action) => put(action)));
}

export function* handleImagesLoad() {
  const { opts, category } = yield select(({ gallery }) => gallery);

  try {
    const { categoryId } = opts;
    const galleryData = {};

    if (!_.isNumber(categoryId)) {
      galleryData.category = null;
    } else if (!category || categoryId !== category.id) {
      galleryData.category = yield call(http.getCategory, categoryId);
    }

    const { images, totalPages } = yield call(http.getImages, opts);

    _.assign(galleryData, { images, totalPages });

    yield putAll([setError(null), setGalleryData(galleryData)]);
  } catch (error) {
    const err = { message: error.message };

    if (error instanceof InvalidPageError) {
      err.to = 1;
    }

    yield put(setError(err));
  }
}

export default function* () {
  yield takeEvery(loadImages, handleImagesLoad);
}
