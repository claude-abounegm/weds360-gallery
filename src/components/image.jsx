import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import http from "../services/httpService";
import BreadCrumb from "./breadCrumb";
import { setAppTitle } from "../features/titleSlice";
import Anchor from "../elements/Anchor";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const FontAwesomeIconBrand = ({ icon, ...props }) => (
//   <FontAwesomeIcon {...props} icon={["fab", icon]} />
// );

// const FacebookIcon = props => (
//   <FontAwesomeIconBrand {...props} icon="facebook-f" />
// );
// const TwitterIcon = props => <FontAwesomeIconBrand {...props} icon="twitter" />;

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

const Title = styled.h2`
  margin: 0;
  margin-bottom: 35px;
  font-size: 35.1px;
  font-weight: bold;
  color: #000;
  line-height: 1.2;
`;

const Description = styled.h5`
  font-family: inherit;
  font-weight: 500;

  display: block;
  margin: 0;
  margin-bottom: 20px;
  font-size: 23.6px;
  line-height: 1.42;
  color: #000;

  & a {
    font-size: inherit;
  }
`;

// const SocialIcon = styled(FontAwesomeIconBrand)`
//   border-radius: 50%;
//   height: 34px;
//   width: 34px;
//   background-color: #000;
//   font-size: 22px;
//   padding-left: 7px;
//   padding-top: 6px;
//   color: #fff;
//   margin-right: 5px;
// `;

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
    category: { title: categoryTitle },
    description = "Test description with some more text and more and more and more",
    service = { name: "Al Khardawaty", href: "/en/services/151" }
  } = image;

  const breadCrumbItems = [
    { href: "/gallery", title: "Gallery" },
    {
      href: `/gallery/?categoryId=${encodeURIComponent(categoryId)}`,
      title: categoryTitle
    },
    { title }
  ];

  // we use window.location here because we want the full href to be shared
  const sharableLink = encodeURIComponent(window.location.href);

  return (
    <>
      <BreadCrumb items={breadCrumbItems} />

      <ImageWrapper>
        <ImageContainer>
          <ResponsiveImg src={`/images${img}`} alt={title}></ResponsiveImg>
        </ImageContainer>

        <ImageDescription>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Description>
            <Anchor href={service.href}>{service.name}</Anchor>
          </Description>
        </ImageDescription>

        {/* <div class="photo--description--links">
          <div class="photo--description--links--social">
            <Anchor
              href={`http://www.facebook.com/sharer.php?u=${sharableLink}`}
            >
              <SocialIcon icon="facebook-f" />
            </Anchor>

            <Anchor
              target="_blank"
              href={`https://twitter.com/share?url=${sharableLink}`}
            >
              <TwitterIcon />
            </Anchor>
          </div>
        </div> */}
      </ImageWrapper>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setAppTitle: title => dispatch(setAppTitle(title))
});

export default connect(null, mapDispatchToProps)(Image);
