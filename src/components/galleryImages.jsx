import React, { useEffect, useState } from "react";
import GalleryImage from "./galleryImage";
import Pagination from "./pagination";
import { parseQueryString, maybeParseInt } from "../utils";
import { connect } from "react-redux";
import { loadImages } from "../features/gallerySlice";
import { Redirect } from "react-router-dom";
import styled, { css } from "styled-components";

const clearFix = css`
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

const FilterButton = styled.button`
  vertical-align: middle;
  padding: 0;
  border: solid 1px #000;
  width: 55px;
  height: 21px;
  margin-left: 3px;
  font-size: 12px;
  text-align: center;

  padding-right: 10px;
  padding-left: 10px;
  height: 21px;
  margin: 2px;

  &:disabled {
    cursor: not-allowed;
    color: gray;
  }
`;

const ClearButton = styled(FilterButton)`
  background-color: #fff;
  color: #000;
`;

const ApplyButton = styled(FilterButton)`
  background-color: #000;
  color: #fff;
`;

const SearchInput = styled.input`
  width: 30%;
  border: 1px solid black;
  padding: 5px;
  margin: 20px 2px;
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

  function handleSearch() {
    loadImages({ page, limit, categoryId, search });
  }

  function handleClear() {
    setSearch("");
    loadImages({ page, limit, categoryId, search: "" });
  }

  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title += " | Gallery";
  }, []);

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
      <ClearButton disabled={search === ""} onClick={handleClear}>
        Clear
      </ClearButton>
      <ApplyButton disabled={search === ""} onClick={handleSearch}>
        Apply
      </ApplyButton>
      <br />
      <SearchInput
        type="text"
        value={search}
        placeholder="Search"
        onChange={e => setSearch(e.target.value)}
      ></SearchInput>

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
