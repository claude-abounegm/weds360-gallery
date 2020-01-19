import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import http from "../services/httpService";
import GalleryGrid from "./galleryGrid";
import { setAppTitle } from "../features/titleSlice";
import { setLoading } from "../features/loadingSlice";

const Categories = props => {
  const { setAppTitle, setLoading } = props;
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    setAppTitle("Categories");
    setLoading(true);
    http.getCategories().then(setCategories, _.noop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categories) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  if (!categories) {
    return null;
  }

  return (
    <>
      <GalleryGrid
        getUrl={id => `/gallery/?categoryId=${encodeURIComponent(id)}`}
        images={categories}
        basePath="/category"
      />
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setAppTitle: title => dispatch(setAppTitle(title)),
  setLoading: loading => dispatch(setLoading(loading))
});

export default connect(null, mapDispatchToProps)(Categories);
