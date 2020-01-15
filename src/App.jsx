import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GalleryImages from "./components/galleryImages";
import Image from "./components/image";
import Categories from "./components/categories";
import "./scss/App.scss";
import ImageOrCategoryRoute from "./components/imageOrCategoryRoute";

export const App = () => {
  const theme = {
    primary: "blue"
  };

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/:id([0-9]+)" component={ImageOrCategoryRoute} />
        <Route path="/categories" component={Categories} exact />
        <Route
          path="/category/:category_id([0-9]*)"
          component={GalleryImages}
        />
        <Route path="/image/:photo_id([0-9]*)" component={Image} />
        <Redirect to="/category" />
      </Switch>
    </ThemeProvider>
  );
};
