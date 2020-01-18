import _ from "lodash";
import axios from "axios";
import qs from "querystring";

import { InvalidPageError } from "../errors";

const { post, put, patch, delete: $delete } = axios;
const basePath = "http://localhost:3001";

const imgsCache = {};

function get(url, query = "") {
  if (_.isPlainObject(query)) {
    query = qs.stringify(query);
  }

  if (!url.endsWith("/")) {
    url = `${url}/`;
  }

  if (query) {
    query = `?${query}`;
  }

  return axios.get(`${url}${query}`);
}

export async function getImages(opts) {
  const { categoryId, page = 1, limit = 10, all: expand, force, search } =
    opts || {};

  if (page < 1) {
    throw new InvalidPageError();
  }

  let query = {};
  if (categoryId) {
    query.categoryId = categoryId;
  }

  if (_.isNumber(page)) {
    query._page = page;
  }

  if (_.isNumber(limit)) {
    query._limit = limit;
  }

  if (expand) {
    query._expand = "category";
  }

  if (search) {
    query.title_like = search;
  }

  query = qs.stringify(query);

  if (!force && imgsCache[query]) {
    return imgsCache[query];
  }

  const { data: images, headers } = await get(`${basePath}/images`, query);

  let totalPages = null;

  try {
    const link = headers["link"];
    const lastLink = /<([^>]+)>; rel="last"/.exec(link)[1];
    totalPages = +lastLink.match(/_page=([0-9]+)/)[1];
  } catch (e) {}

  if (totalPages === null) {
    const totalCount = headers["x-total-count"];
    totalPages = Math.ceil(totalCount / limit);
  }

  if (totalPages > 0 && page > totalPages) {
    throw new InvalidPageError();
  }

  const obj = {
    currentPage: 1,
    totalPages,
    images
  };

  return (imgsCache[query] = obj);
}

export async function getCategories() {
  return get(`${basePath}/categories`).then(
    ({ data: categories }) => categories
  );
}

export async function getCategory(categoryId) {
  return get(`${basePath}/categories/${categoryId}`).then(
    ({ data: categories }) => categories
  );
}

export async function getImage(imageId) {
  return get(`${basePath}/images/${imageId}`).then(
    ({ data: images }) => images
  );
}

export async function isValidCategory(categoryId) {
  try {
    await getCategory(categoryId);
    return true;
  } catch (e) {
    return false;
  }
}

export async function isValidImage(imageId) {
  try {
    await getImage(imageId);
    return true;
  } catch (e) {
    return false;
  }
}

export default {
  get,
  post,
  put,
  patch,
  delete: $delete,
  getImages,
  getCategories,
  getImage,
  getCategory,
  isValidCategory,
  isValidImage
};
