import _ from "lodash";
import axios from "axios";

//  function getImages(opts) {
//    const { page, limit } = opts;

//  }

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put
};
