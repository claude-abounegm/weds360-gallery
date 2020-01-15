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
  const { categoryId, page, limit, all: expand, force } = opts || {};

  let query = {};
  if (_.isNumber(page) && _.isNumber(limit)) {
    const offset = (page - 1) * limit;
    _.assign(query, { _limit: limit, _start: offset });
  }

  if (expand) {
    query._expand = "category";
  }

  if (categoryId) {
    query.categoryId = categoryId;
  }

  query = qs.stringify(query);

  if (!force && imgsCache[query]) {
    return imgsCache[query];
  }

  return get(`${basePath}/images`, query).then(({ data: images }) => {
    imgsCache[query] = images;
    return images;
  });
}

export async function getCategories() {
  return get(`${basePath}/categories`).then(
    ({ data: categories }) => categories
  );
}

export async function getImage(imageId) {
  return get(`${basePath}/images`, qs.stringify({ id: imageId })).then(
    ({ data: images }) => images[0]
  );
}

export default {
  get,
  post,
  put,
  patch,
  delete: $delete,
  getImages,
  getImage,
  getCategories
};
