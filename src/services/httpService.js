import _ from "lodash";
import axios from "axios";
import qs from "querystring";

const { get, post, put, patch, delete: $delete } = axios;
const basePath = "http://localhost:3001";

export function getImages(opts) {
  const { page, limit } = opts;

  if (!_.isNumber(page)) {
    throw new Error("page needs to be a number");
  }

  if (!_.isNumber(limit)) {
    throw new Error("limit needs to be a number");
  }

  const offset = (page - 1) * limit;
  const query = { _limit: limit, _start: offset };

  return get(`${basePath}/images?${qs.stringify(query)}`).then(
    ({ data: images }) => images
  );
}

export default {
  get,
  post,
  put,
  patch,
  delete: $delete,
  getImages
};
