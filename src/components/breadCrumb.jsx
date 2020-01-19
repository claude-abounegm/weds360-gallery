import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  width: 92%;
  max-width: 1100px;
  margin: 120px auto 0;
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
`;

const BreadCrumbH3 = styled.h3`
  line-height: 30px;
  height: 30px;
  margin: 0;
  text-transform: uppercase;
  display: inline-block;
  font-size: 18px;
  font-weight: 900;
  color: #010101;

  & a {
    color: #008174;
    transition: all ease 0.1s;
    font-size: 18px;
  }
`;

const BreadCrumbH2 = styled.h2`
  line-height: 30px;
  height: 30px;
  margin: 0;
  text-transform: uppercase;
  display: inline-block;
  font-size: 18px;
  font-weight: 900;
  color: #010101;
`;

const BreadCrumbLink = styled(Link)`
  text-decoration: none;
`;

const Separator = styled.span`
  line-height: 30px;
  height: 30px;
  margin: 0 7.5px;
`;

const BreadCrumb = () => {
  const items = [
    { href: "/gallery", title: "Gallery" },
    { href: "/gallery/?categoryId=4", title: "Wedding Ideas" },
    { title: "Wedding Details" }
  ];

  const parts = [];

  items.forEach(({ href, title }, index, arr) => {
    if (index > 0) {
      parts.push(
        <Separator key={`separator-${index}`}>
          <FontAwesomeIcon size="2x" icon="angle-right" />
        </Separator>
      );
    }

    if (index === arr.length - 1) {
      return parts.push(<BreadCrumbH2 key={index}>{title}</BreadCrumbH2>);
    }

    parts.push(
      <BreadCrumbH3 key={index}>
        <BreadCrumbLink to={href}>{title}</BreadCrumbLink>
      </BreadCrumbH3>
    );
  });

  return <Wrapper>{parts}</Wrapper>;
};

export default BreadCrumb;

const x = (
  <>
    <div class="wedding--breadcrumb">
      <h3 class="wedding--breadcrumb--link">
        <a href="/en/categories?parent_menu=photos">Gallery</a>
      </h3>
      <i class="fa fa-angle-right "></i>
      <h3 class="wedding--breadcrumb--link">
        <a href="/en/photos?category=4">Wedding Ideas</a>
      </h3>
      <i class="fa fa-angle-right" aria-hidden="true"></i>
      <h2 class="wedding--breadcrumb--link">Wedding details</h2>
    </div>
  </>
);
