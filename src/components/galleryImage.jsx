/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const GalleryImage = props => {
  const { src, title, alt } = props;

  return (
    <div className="thumnail">
      <div className="bg-img">
        <img src={src} alt={alt || title}></img>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default GalleryImage;
