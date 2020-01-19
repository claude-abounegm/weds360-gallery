import _ from "lodash";
import axios from "axios";
import qs from "querystring";

import { InvalidPageError } from "../errors";

const { post, put, patch, delete: $delete } = axios;
const basePath = "http://localhost:3001";

const imgsCache = {};
// json-server default when page is specified
const defaultLimit = 10;

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

function mapValuesToQuery(opts = {}, keyMap, defaults) {
  if (!_.isPlainObject(keyMap)) {
    throw new Error("keyMap needs to be an object");
  }

  const obj = {};
  for (let [key, value] of _.toPairs(opts)) {
    const newKey = keyMap[key] || key;

    if (newKey === false) {
      continue;
    }
    // const defaultValue = defaults[key];

    if (_.isFunction(newKey)) {
      const newVal = newKey(value);
      const pairs = _.toPairs(newVal);

      if (pairs.length !== 1) {
        throw new Error(
          `expected one property got ${pairs.length} (${JSON.stringify(
            newVal
          )})`
        );
      }

      [key, value] = pairs[0];
    }

    if (value) {
      obj[newKey] = value;
    }
  }

  return { ...defaults, ...obj };
}

export async function getImages(opts) {
  let { page, limit, force } = opts || {};

  if (page && !_.isNumber(page)) {
    throw new Error("page needs to be a postive number if defined");
  } else if (page < 1) {
    throw new InvalidPageError();
  }

  if (page && !limit) {
    limit = defaultLimit;
  }

  const query = qs.stringify(
    mapValuesToQuery(opts, {
      page: "_page",
      // page: value => ({ _page: value }),
      limit: "_limit",
      all: () => ({ _expand: "category" }),
      search: "title_like"
      // categoryId: false
    })
  );

  if (!force && imgsCache[query]) {
    return imgsCache[query];
  }

  const { data: images, headers } = await get(`${basePath}/images`, query);

  let totalPages = null;

  try {
    const link = headers["link"];
    if (link) {
      const lastLink = /<([^>]+)>; rel="last"/.exec(link)[1];
      totalPages = +lastLink.match(/_page=([0-9]+)/)[1];
    }
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
  return get(`${basePath}/images/${imageId}`, { _expand: "category" }).then(
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
