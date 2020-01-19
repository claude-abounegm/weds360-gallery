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

  width: 90%;

  /* width: 90%; */
  /* display: flex; */
  /* flex-direction: row; */
  /* max-width: 1100px; */
  flex-direction: column;
  margin-top: 0;

  margin: 30px auto 0;
  font-family: "Lato", sans-serif;

  &:after {
    ${clearFix}
  }
`;

const GalleryGrid = props => {
  const { images, getUrl } = props;

  return (
    <GalleryGridDiv>
      {images.length === 0 ? (
        <span>No images found in this gallery.</span>
      ) : (
        images.map(({ img, title, id }) => (
          <GalleryImage
            key={id}
            id={id}
            src={img}
            getUrl={getUrl}
            title={title}
          />
        ))
      )}
    </GalleryGridDiv>
  );
};

export default GalleryGrid;
