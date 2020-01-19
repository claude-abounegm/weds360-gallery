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
import Search from "./search";
import GalleryGrid from "./galleryGrid";
import BreadCrumb from "./breadCrumb";

import styled from "styled-components";

const PhotosWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  max-width: 1100px;
  margin: 30px auto 0;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  position: relative;
  box-sizing: border-box;
  margin-right: 25px;
`;

const PhotosContainer = styled.div`
  width: 70%;
`;

const Gallery = props => {
  const {
    error,
    location,
    loadImages,
    history,
    gallery: { images, totalPages, category },
    setAppTitle
  } = props;

  const query = (({ page, limit, categoryId }) => ({
    page: maybeParseInt(page) || 1,
    limit: maybeParseInt(limit) || 9,
    categoryId: maybeParseInt(categoryId)
  }))(parseQueryString(location.search));

  const { limit, categoryId } = query;

  const [page, setPage] = useState(query.page);
  const [search, setSearch] = useState("");

  function handlePageChange(page, replace) {
    history[replace ? "replace" : "push"](
      buildUrlFromLocation(location, { page })
    );

    setPage(page);
    return null;
  }

  function handleSearch(search) {
    handlePageChange(1);
    setSearch(search);
  }

  useEffect(() => {
    setAppTitle("Gallery");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadImages({ page, limit, categoryId, search });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, categoryId, search]);

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

  const breadCrumbItems = [{ href: "/gallery", title: "Gallery" }];

  if (category) {
    breadCrumbItems.push({ title: category.title });
  }

  return (
    <>
      <BreadCrumb items={breadCrumbItems} />

      <PhotosWrapper>
        <FiltersContainer>
          <Search onSearch={handleSearch} />
        </FiltersContainer>

        <PhotosContainer>
          {images.length === 0 && (
            <>
              <br />
              <span>
                No images found.{" "}
                {search &&
                  "Please try to widen your search query and try again."}
              </span>
            </>
          )}

          <GalleryGrid
            getUrl={id => `/image/${id}`}
            images={images}
            basePath="/image"
          />
        </PhotosContainer>
      </PhotosWrapper>

      <Pagination
        pagesCount={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </>
  );
};

const mapStateToProps = ({ gallery, error }) => ({
  gallery,
  error
});

const mapDispatchToProps = dispatch => ({
  loadImages: opts => dispatch(loadImages(opts)),
  setAppTitle: title => dispatch(setAppTitle(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
