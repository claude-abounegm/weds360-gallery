import _ from "lodash";
import React, { useState, useEffect } from "react";
import GalleryImage from "./galleryImage";
import http from "../services/httpService";
import qs from "querystring";

const GalleryImages = props => {
  let { page = 1, limit = 9 } = props;
  if (!_.isNumber(limit)) {
    throw new Error("limit needs to be a number");
  }

  if (!_.isNumber(page)) {
    throw new Error("page needs to be a number");
  }

  const [images, setImages] = useState([]);

  useEffect(() => {
    const offset = (page - 1) * limit;

    let query = { _limit: limit, _start: offset };

    query = qs.stringify(query);
    http
      .get(`http://localhost:3001/images?${query}`)
      .then(({ data: images }) => setImages(images));
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
