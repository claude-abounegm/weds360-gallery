import React, { useState, useEffect } from "react";
import GalleryImage from "./GalleryImage";
import Pagination from "./Pagination";
import http from "../services/httpService";
import { parseQueryString, maybeParseInt } from "../utils";

const GalleryImages = props => {
  const { page, limit } = parseQueryString(props.location.search, data => {
    const { page, limit } = data;

    return {
      ...data,
      page: maybeParseInt(page) || 1,
      limit: maybeParseInt(limit) || 9
    };
  });

  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    console.log("refresh images");
    http.getImages({ page, limit }).then(setImages);
  }, [page, limit]);

  useEffect(() => {
    console.log("refresh all images");
    http.getImages().then(setAllImages);
  }, []);

  function handlePageChange(page) {
    props.history.push(`/?page=${page}`);
  }

  return (
    <React.Fragment>
      <Pagination
        onPageChange={handlePageChange}
        itemsCount={allImages.length}
        pageSize={limit}
        currentPage={page}
      />

      {images.map(({ img, title, id }) => (
        <GalleryImage key={id} id={id} src={`/images${img}`} title={title} />
      ))}
    </React.Fragment>
  );
};

export default GalleryImages;
