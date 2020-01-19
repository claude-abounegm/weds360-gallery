import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import http from "../services/httpService";
import BreadCrumb from "./breadCrumb";
import { setAppTitle } from "../features/titleSlice";

const Image = props => {
  const { setAppTitle } = props;
  const { photo_id: imageId } = props.match.params;

  const [image, setImage] = useState(null);

  useEffect(() => {
    http.getImage(imageId).then(setImage);
  }, [imageId]);

  useEffect(() => {
    if (image) {
      setAppTitle(image.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  if (!image) {
    return null;
  }

  const { img, title } = image;

  const breadCrumbItems = [
    { href: "/gallery", title: "Gallery" },
    { href: "/gallery", title: "Wedding Ideas" },
    { title }
  ];

  return (
    <>
      <BreadCrumb items={breadCrumbItems} />

      <div className="thumnail">
        <div className="bg-img">
          <img src={`/images${img}`} alt={title}></img>
        </div>
        <h3>{title}</h3>
      </div>
    </>
  );
};

const mapStateToProps = ({ gallery }) => ({
  gallery
});

const mapDispatchToProps = dispatch => ({
  setAppTitle: title => dispatch(setAppTitle(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(Image);
