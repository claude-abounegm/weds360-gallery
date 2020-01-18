import React, { useEffect } from "react";
import GalleryImage from "./galleryImage";
import Pagination from "./pagination";
import { parseQueryString, maybeParseInt } from "../utils";
import { connect } from "react-redux";
import { loadImages } from "../features/gallerySlice";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const clearFix = props => `
content: " ";
visibility: hidden;
display: block;
height: 0;
clear: both;
`;

const TestDiv = styled.div`
  * {
    box-sizing: border-box;
  }

  width: 90%;

  /* width: 90%; */
  /* display: flex; */
  /* flex-direction: row; */
  /* max-width: 1100px; */
  flex-direction: column;
  margin-top: 0;

  margin: 30px auto 0;
  font-family: "Lato", sans-serif;

  &:after {
    ${clearFix}
  }
`;

const GalleryImages = props => {
  const {
    error,
    location,
    loadImages,
    gallery: { images, totalPages }
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
    props.history[replace ? "replace" : "push"](buildUrl(page));
    return null;
  }

  useEffect(() => {
    loadImages({ page, limit, categoryId });
  }, [loadImages, page, limit, categoryId]);

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
      <TestDiv>
        {images.length === 0 ? (
          <span>No images found in this gallery.</span>
        ) : (
          images.map(({ img, title, id }) => (
            <GalleryImage
              key={id}
              id={id}
              src={img}
              basePath="/image"
              title={title}
            />
          ))
        )}
      </TestDiv>

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
  loadImages: opts => dispatch(loadImages(opts))
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryImages);
