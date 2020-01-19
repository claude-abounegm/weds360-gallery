import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import Anchor from "./../elements/Anchor";

const FontAwesomeIconBrand = ({ icon, ...props }) => (
  <FontAwesomeIcon {...props} icon={["fab", icon]} />
);

const FacebookIcon = props => (
  <FontAwesomeIconBrand {...props} icon="facebook-f" />
);
const InstagramIcon = props => (
  <FontAwesomeIconBrand {...props} icon="instagram" />
);

const FooterElement = styled.footer`
  font-family: "Lato", sans-serif;
  display: block;
  background-color: #000000;
  width: 100%;
  direction: ltr !important;
  color: white;
`;

const TextLeft = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 33%;
  font-size: 8px;
  margin-left: 1%;
`;

const TextCenter = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 33%;
  font-size: 10px;
  font-weight: 100;
  color: #ffffff;
  position: relative;
  margin: auto;
  text-align: center;

  & a {
    font-size: 10px;
  }
`;

const TextRight = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 31%;
  color: #ffffff;
  font-size: 10px;
  text-decoration: none;
  padding-right: 60px;

  & ul {
    text-align: right;
    list-style-type: none;

    & li {
      padding-bottom: 4px;
    }

    & a {
      font-size: 10px;
    }
  }
`;

const StaticAnchor = styled(Anchor)`
  color: white;

  &:hover,
  &:focus {
    color: white;
  }
`;

const SocialMediaLinks = styled.div`
  font-size: 15px;

  & ${StaticAnchor} {
    margin-right: 5px;
  }
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const Footer = () => {
  return (
    <FooterElement>
      <TextLeft>
        <h1 className="company--logo">Weds360</h1>
        <SocialMediaLinks>
          <span>
            <StaticAnchor href="https://www.facebook.com/Weds360/">
              <FacebookIcon size="lg" />
            </StaticAnchor>
          </span>

          <span>
            <StaticAnchor href="https://www.instagram.com/weds360/">
              <InstagramIcon size="lg" />
            </StaticAnchor>
          </span>
        </SocialMediaLinks>
      </TextLeft>

      <TextCenter>
        © Copyright{" "}
        <Anchor href="http://plus360.xyz/">
          <Strong>Plus360</Strong>.{" "}
        </Anchor>
        All Rights Reserved
      </TextCenter>

      <TextRight>
        <ul>
          <li>
            <StaticAnchor href="/pages/terms-conditions?locale=en">
              Terms &amp; Conditions
            </StaticAnchor>
          </li>

          <li>
            <StaticAnchor href="/pages/privacy-policy?locale=en">
              Privacy Policy
            </StaticAnchor>
          </li>
        </ul>
      </TextRight>
    </FooterElement>
  );
};

export default Footer;
