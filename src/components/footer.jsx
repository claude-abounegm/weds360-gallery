import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Anchor from "./../elements/Anchor";

const FontAwesomeIconBrand = ({ icon }) => (
  <FontAwesomeIcon icon={["fab", icon]} />
);

const FacebookIcon = () => <FontAwesomeIconBrand icon="facebook-f" />;
const InstagramIcon = () => <FontAwesomeIconBrand icon="instagram" />;

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer--background">
        <div className="text--left">
          <h1 className="company--logo">Weds360</h1>
          <div className="social--media--links">
            <span>
              <Anchor href="https://www.facebook.com/Weds360/">
                <FacebookIcon />
              </Anchor>
            </span>

            <span>
              <Anchor href="https://www.instagram.com/weds360/">
                <InstagramIcon />
              </Anchor>
            </span>
          </div>
        </div>
        <div className="text--center">
          © Copyright
          <Anchor href="http://plus360.xyz/">
            <strong>Plus360</strong>.
          </Anchor>
          All Rights Reserved
        </div>
        <div className="text--right">
          <ul>
            <li>
              <Anchor href="/pAnchorges/terms-conditions?locale=en">
                Terms &amp; Conditions
              </Anchor>
            </li>
            <li>
              <Anchor href="/pages/privacy-policy?locale=en">
                Privacy Policy
              </Anchor>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
