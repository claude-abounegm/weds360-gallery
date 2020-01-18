import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./store";
import GalleryImages from "./components/galleryImages";
import Image from "./components/image";
import Categories from "./components/categories";
import ImageOrCategoryRoute from "./components/imageOrCategoryRoute";
import Loader from "./components/loader";
import Footer from "./components/footer";

export const App = props => {
  const theme = {
    primary: "blue"
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Loader />
        <Switch>
          <Route path="/:id([0-9]+)" component={ImageOrCategoryRoute} />
          <Route path="/categories" component={Categories} exact />
          <Route
            path="/category/:category_id([0-9]+|all)"
            component={GalleryImages}
            exact
          />
          <Route path="/image/:photo_id([0-9]*)" component={Image} />
          <Redirect to="/category/all" />
        </Switch>
        <Footer />
      </ThemeProvider>
    </Provider>
  );
};
