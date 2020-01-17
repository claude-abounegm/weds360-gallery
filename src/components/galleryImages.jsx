import React, { useEffect } from "react";
import GalleryImage from "./galleryImage";
import Pagination from "./pagination";
import { parseQueryString, maybeParseInt } from "../utils";
import { connect } from "react-redux";
import { loadImages } from "../features/imagesSlice";

const GalleryImages = props => {
  const parsedQueryString = parseQueryString(props.location.search);

  const {
    location,
    loadImages,
    images: {
      data: images,
      pagination: { total: totalPages }
    }
  } = props;

  let { category_id: categoryId } = props.match.params;
  if (categoryId === "all") {
    categoryId = undefined;
  }

  const { page, limit } = (({ page, limit }) => ({
    page: maybeParseInt(page) || 1,
    limit: maybeParseInt(limit) || 9
  }))(parsedQueryString);

  function buildQueryString(page) {
    const search = new URLSearchParams(location.search.slice(1));
    search.set("page", page);
    // search.set("limit", limit);
    return search.toString();
  }

  function handlePageChange(page, replace) {
    const query = buildQueryString(page);
    props.history[replace ? "replace" : "push"](`?${query}`);
    return null;
  }

  useEffect(() => {
    loadImages({ page, limit, categoryId });
  }, [loadImages, page, limit, categoryId]);

  if (page < 1) {
    return handlePageChange(1);
  } else if (page > totalPages) {
    return handlePageChange(totalPages);
  }

  return (
    <>
      <Pagination
        pagesCount={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />

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
    </>
  );
};

const mapStateToProps = ({ images, error }) => ({ images, error });

const mapDispatchToProps = dispatch => ({
  loadImages: opts => dispatch(loadImages(opts))
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryImages);
