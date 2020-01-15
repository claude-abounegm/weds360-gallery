import React, { useEffect, useState } from "react";
import http from "../services/httpService";

const Image = props => {
  const { photo_id: imageId } = props.match.params;

  const [image, setImage] = useState(null);

  useEffect(() => {
    http.getImage(imageId).then(setImage);
  }, [imageId]);

  if (!image) {
    return null;
  }

  const { img, title } = image;

  return (
    <div className="thumnail">
      <div className="bg-img">
        <img src={`/images${img}`} alt={title}></img>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default Image;
