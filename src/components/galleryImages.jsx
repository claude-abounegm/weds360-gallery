import React, { useState, useEffect } from "react";
import GalleryImage from "./galleryImage";
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

  useEffect(() => {
    http.getImages({ page, limit }).then(setImages);
  }, [page, limit]);

  return (
    <React.Fragment>
      {images.map(({ img, title, id }) => (
        <GalleryImage key={id} id={id} src={`/images${img}`} title={title} />
      ))}
    </React.Fragment>
  );
};

export default GalleryImages;
