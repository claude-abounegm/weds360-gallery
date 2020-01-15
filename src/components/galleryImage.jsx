/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const GalleryImage = props => {
  const { basePath = "/", id, src, title, alt } = props;

  return (
    <div className="thumnail">
      <div className="bg-img">
        <Link target="_blank" to={`${basePath}/${id}`}>
          <img src={`/images${src}`} alt={alt || title}></img>
        </Link>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default GalleryImage;
