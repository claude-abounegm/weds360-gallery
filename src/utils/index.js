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

export default {
  maybeParseInt,
  parseQueryString
};
