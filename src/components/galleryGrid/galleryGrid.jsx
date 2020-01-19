import React from "react";
import styled, { css } from "styled-components";

import GalleryImage from "./galleryGridImage";

const clearFix = css`
  content: " ";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
`;

const GalleryGridDiv = styled.div`
  * {
    box-sizing: border-box;
  }

  margin: 0;

  &:after {
    ${clearFix}
  }
`;

const GalleryGrid = props => {
  const { images, getUrl } = props;

  return (
    <GalleryGridDiv>
      {images.map(({ img, title, id }) => (
        <GalleryImage
          key={id}
          id={id}
          src={img}
          getUrl={getUrl}
          title={title}
        />
      ))}
    </GalleryGridDiv>
  );
};

export default GalleryGrid;
