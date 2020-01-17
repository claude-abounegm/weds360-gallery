import _ from "lodash";
import axios from "axios";
import qs from "querystring";

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
  const { categoryId, page = 1, limit, all: expand, force } = opts || {};

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

  query = qs.stringify(query);

  if (!force && imgsCache[query]) {
    return imgsCache[query];
  }

  const { data: images, headers } = await get(`${basePath}/images`, query);
  let totalPages = 1;

  if (page) {
    const lastLink = /<([^>]+)>; rel="last"/.exec(headers["link"])[1];
    const lastPage = +lastLink.match(/_page=([0-9]+)/)[1];
    totalPages = lastPage;
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
