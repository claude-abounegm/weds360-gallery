import React from "react";
import GalleryImages from "./components/galleryImages";
import { Route, Switch } from "react-router-dom";
import "./scss/App.scss";

export const App = () => {
  return (
    <Switch>
      <Route path="/" component={GalleryImages} />
    </Switch>
  );
};

// /**
//  *
//  * @param {string} str
//  */
// function parseQueryString(str, transform) {
//   if (str.startsWith("?")) {
//     str = str.substring(1, str.length);
//   }

//   let obj = qs.parse(str);

//   if (_.isFunction(transform)) {
//     obj = transform(obj);
//   }

//   return obj;
// }

// function maybeParseInt(str) {
//   if (str && !isNaN(str)) {
//     return +str;
//   }
// }

// parseQueryString(props.location.search, data => {
//   const { page, limit } = data;

//   if (page) {
//     data.page = maybeParseInt(page);
//   }

//   if (limit) {
//     data.limit = maybeParseInt(limit);
//   }

//   return data;
// });
