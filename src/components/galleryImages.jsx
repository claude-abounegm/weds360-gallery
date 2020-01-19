import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { parseQueryString, maybeParseInt } from "../utils";
import { connect } from "react-redux";
import { loadImages } from "../features/gallerySlice";
import { setAppTitle } from "../features/titleSlice";
import { Redirect } from "react-router-dom";
import Filters from "./filters";
import GalleryGrid from "./galleryGrid";

const GalleryImages = props => {
  const {
    error,
    location,
    loadImages,
    history,
    gallery: { images, totalPages },
    setAppTitle
  } = props;

  let { category_id: categoryId } = props.match.params;
  if (categoryId === "all") {
    categoryId = undefined;
  }

  const { page, limit } = (({ page, limit }) => ({
    page: maybeParseInt(page) || 1,
    limit: maybeParseInt(limit) || 9
  }))(parseQueryString(location.search));

  function buildUrl(page) {
    const search = new URLSearchParams(location.search.slice(1));
    search.set("page", page);
    // search.set("limit", limit);
    return `${location.pathname}?${search.toString()}`;
  }

  function handlePageChange(page, replace) {
    history[replace ? "replace" : "push"](buildUrl(page));
    return null;
  }

  function handleSearch(search) {
    loadImages({ page, limit, categoryId, search });
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
      return <Redirect to={buildUrl(to)} />;
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

      <GalleryGrid images={images} basePath="/image" />

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

export default connect(mapStateToProps, mapDispatchToProps)(GalleryImages);
