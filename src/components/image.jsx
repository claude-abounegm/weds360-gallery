import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import http from "../services/httpService";
import BreadCrumb from "./breadCrumb";
import { setAppTitle } from "../features/titleSlice";

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 92.5%;
  max-width: 1100px;
  margin: 15px auto 50px;
`;

const ImageContainer = styled.div`
  width: 63%;
`;

const ImageDescription = styled.div`
  width: 37%;
  padding: 15px 20px;
`;

const ResponsiveImg = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  width: 100%;
`;

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

  const {
    img,
    title,
    categoryId,
    category: { title: categoryTitle }
  } = image;

  const breadCrumbItems = [
    { href: "/gallery", title: "Gallery" },
    {
      href: `/gallery/?categoryId=${encodeURIComponent(categoryId)}`,
      title: categoryTitle
    },
    { title }
  ];

  return (
    <>
      <BreadCrumb items={breadCrumbItems} />

      <ImageWrapper>
        <ImageContainer>
          <ResponsiveImg src={`/images${img}`} alt={title}></ResponsiveImg>
        </ImageContainer>

        <ImageDescription>
          <h3>{title}</h3>
        </ImageDescription>
      </ImageWrapper>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setAppTitle: title => dispatch(setAppTitle(title))
});

export default connect(null, mapDispatchToProps)(Image);
