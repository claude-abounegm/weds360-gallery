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
