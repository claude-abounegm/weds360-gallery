import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ResponsiveDiv = styled.div`
  padding: 5px;
  float: left;
  width: 33.333333%;

  @media only screen and (max-width: 700px) {
    width: 49.99999%;
  }

  @media only screen and (max-width: 575px) {
    width: 50%;
  }
`;

const PhotoContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 5px;
`;

const BackgroundImage = styled.div`
  background: url(${props => props.src}) no-repeat;
  height: 230px;
  object-fit: contain;
  background-size: cover !important;
  background-position: center !important;

  @media only screen and (max-width: 575px) {
    height: 120px;
  }

  & img {
    display: none;
  }
`;

const PhotoDescription = styled.h3`
  color: #000;
  font-size: 17.3px;
  font-weight: bold;
  margin: 10px 0 15px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 25px;
  height: 50px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`;

const GalleryImage = props => {
  const { basePath = "/", id, src, title, alt } = props;

  const imgSrc = `/images${src}`;

  return (
    <ResponsiveDiv>
      {/* <div className="photo--container">
        <div
          className="bg-img"
          style={{ background: `url("${imgSrc}") no-repeat` }}
        >
          <img style={{ display: "none" }} src={imgSrc} alt="Medium" />
        </div>
        <h3>{title}</h3>
      </div> */}

      <CustomLink target="_blank" to={`${basePath}/${id}`}>
        <PhotoContainer>
          <BackgroundImage src={imgSrc}>
            <img src={`/images${src}`} alt={alt || title}></img>
          </BackgroundImage>
          <PhotoDescription>{title}</PhotoDescription>
        </PhotoContainer>
      </CustomLink>
    </ResponsiveDiv>
  );
};

export default GalleryImage;
