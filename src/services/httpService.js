import _ from "lodash";
import axios from "axios";
import qs from "querystring";

const { get, post, put, patch, delete: $delete } = axios;
const basePath = "http://localhost:3001";

export function getImages(opts) {
  const { page, limit, all: expand } = opts || {};

  let query = {};
  if (_.isNumber(page) && _.isNumber(limit)) {
    const offset = (page - 1) * limit;
    _.assign(query, { _limit: limit, _start: offset });
  }

  if (expand) {
    query._expand = "category";
  }

  query = qs.stringify(query);
  if (query) {
    query = `?${query}`;
  }

  return get(`${basePath}/images/${query}`).then(({ data: images }) => images);
}

export default {
  get,
  post,
  put,
  patch,
  delete: $delete,
  getImages
};
