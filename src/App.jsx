import React from "react";
import GalleryImages from "./components/galleryImages";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./scss/App.scss";

export const App = () => {
  const theme = {
    primary: "blue"
  };

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/:category_id?" component={GalleryImages} />
      </Switch>
    </ThemeProvider>
  );
};
