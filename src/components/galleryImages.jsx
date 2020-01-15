import React, { useState, useEffect } from "react";
import qs from "querystring";
import GalleryImage from "./GalleryImage";
import Pagination from "./Pagination";
import http from "../services/httpService";
import { parseQueryString, maybeParseInt } from "../utils";
import { Redirect } from "react-router-dom";

const GalleryImages = props => {
  const parsedQueryString = parseQueryString(props.location.search);

  const { page, limit } = (data => {
    const { page, limit } = data;

    return {
      ...data,
      page: maybeParseInt(page) || 1,
      limit: maybeParseInt(limit) || 9
    };
  })(parsedQueryString);

  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [isValidPage, setIsValidPage] = useState(true);

  function buildQueryString(page, limit) {
    let query = { page };
    if (limit) {
      query.limit = limit;
    }
    query = qs.stringify(query);
    return query;
  }

  function handlePageChange(page, replace) {
    const query = buildQueryString(page, parsedQueryString.limit);
    props.history[replace ? "replace" : "push"](`/?${query}`);
  }

  useEffect(() => {
    http.getImages().then(allImages => {
      const totalPages = Math.ceil(allImages.length / limit);
      const isValid = page >= 1 && page <= totalPages;

      setIsValidPage(isValid);
      if (isValid) {
        setAllImages(allImages);
      }
    });
  }, [page, limit]);

  useEffect(() => {
    if (isValidPage) {
      http.getImages({ page, limit }).then(setImages);
    }
  }, [page, limit, isValidPage]);

  if (!isValidPage) {
    return <Redirect to="/?page=1" />;
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
