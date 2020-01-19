import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import store from "./store";
import GalleryImages from "./components/galleryImages";
import Image from "./components/image";
import Categories from "./components/categories";
import ImageOrCategoryRoute from "./components/imageOrCategoryRoute";
import Loader from "./components/loader";
import Footer from "./components/footer";
import ScrollToTop from "./components/scrollToTop";

import "./scss/App.scss";

library.add(fab, fas);

const Wrapper = styled.div`
  * {
    font-family: Lato, sans-serif;
    /* font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; */
    /* font-size: 14px; */
    /* line-height: 1.428571429; */
  }
`;

export const App = props => {
  const theme = {
    primary: "blue"
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Loader />
          <ScrollToTop />
          <Switch>
            <Route path="/:id([0-9]+)" component={ImageOrCategoryRoute} />
            <Route path="/categories" component={Categories} exact />
            <Route
              path="/category/:category_id([0-9]+|all)"
              component={GalleryImages}
              exact
            />
            <Route path="/image/:photo_id([0-9]*)" component={Image} />
            <Redirect to="/categories" />
          </Switch>
        </Wrapper>
        <Footer />
      </ThemeProvider>
    </Provider>
  );
};
