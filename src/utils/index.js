import _ from "lodash";
import qs from "querystring";

export function maybeParseInt(str) {
  if (str && !isNaN(str)) {
    return +str;
  }
}

/**
 *
 * @param {string} str
 */
export function parseQueryString(str, transform) {
  if (str.startsWith("?")) {
    str = str.slice(1);
  }

  let obj = qs.parse(str);

  if (_.isFunction(transform)) {
    obj = transform(obj);
  }

  return obj;
}

/**
 *
 * @param {{ search: string; pathname: string;}} location
 * @param {{ [key: string]: string; }} query any key with undefined values will be deleted from the search query if it exists
 */
export function buildUrlFromLocation(location, query = {}) {
  const search = new URLSearchParams(location.search.slice(1));
  for (const [key, value] of _.toPairs(query)) {
    if (_.isUndefined(value)) {
      if (search.has(key)) {
        search.delete(key);
      }

      continue;
    }

    search.set(key, value);
  }

  return `${location.pathname}?${search.toString()}`;
}

export default {
  maybeParseInt,
  parseQueryString,
  buildUrlFromLocation
};
