import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Pagination from "./pagination";
import {
  parseQueryString,
  maybeParseInt,
  buildUrlFromLocation
} from "../utils";
import { loadImages } from "../features/gallerySlice";
import { setAppTitle } from "../features/titleSlice";
import { Redirect } from "react-router-dom";
import Filters from "./filters";
import GalleryGrid from "./galleryGrid";

const Gallery = props => {
  const {
    error,
    location,
    loadImages,
    history,
    gallery: { images, totalPages },
    setAppTitle
  } = props;

  const query = (({ page, limit, categoryId }) => ({
    page: maybeParseInt(page) || 1,
    limit: maybeParseInt(limit) || 9,
    categoryId: maybeParseInt(categoryId)
  }))(parseQueryString(location.search));

  const { limit, categoryId } = query;

  const [page, setPage] = useState(query.page || 1);

  function handlePageChange(page, replace) {
    history[replace ? "replace" : "push"](
      buildUrlFromLocation(location, { page })
    );

    setPage(page);
    return null;
  }

  function handleSearch(search) {
    loadImages({ page, limit, categoryId, search });
    setPage(1);
  }

  useEffect(() => {
    setAppTitle("Gallery");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadImages({ page, limit, categoryId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, categoryId]);

  if (error) {
    const { to, message } = error;

    if (to) {
      return <Redirect to={buildUrlFromLocation(location, { page: to })} />;
    } else if (message) {
      return <span>Error: {message}</span>;
    }
  }

  if (!images) {
    return null;
  }

  return (
    <>
      <Filters onSearch={handleSearch} />

      <GalleryGrid
        getUrl={id => `/image/${id}`}
        images={images}
        basePath="/image"
      />

      <Pagination
        pagesCount={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </>
  );
};

const mapStateToProps = ({ gallery, isLoading, error }) => ({
  gallery,
  isLoading,
  error
});

const mapDispatchToProps = dispatch => ({
  loadImages: opts => dispatch(loadImages(opts)),
  setAppTitle: title => dispatch(setAppTitle(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
