import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import http from "../services/httpService";
import GalleryGrid from "./galleryGrid";
import { setAppTitle } from "../features/titleSlice";

const Categories = props => {
  const { setAppTitle } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setAppTitle("Categories");
    http.getCategories().then(setCategories, _.noop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GalleryGrid images={categories} basePath="/category" />
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setAppTitle: title => dispatch(setAppTitle(title))
});

export default connect(null, mapDispatchToProps)(Categories);
