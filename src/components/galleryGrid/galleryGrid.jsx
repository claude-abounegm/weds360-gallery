import React from "react";
import styled from "styled-components";

import GalleryImage from "./galleryGridImage";

const GalleryGridDiv = styled.div`
  margin: 0;

  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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
