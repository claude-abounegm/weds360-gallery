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
    str = str.substring(1, str.length);
  }

  let obj = qs.parse(str);

  if (_.isFunction(transform)) {
    obj = transform(obj);
  }

  return obj;
}

export default {
  maybeParseInt,
  parseQueryString
};
