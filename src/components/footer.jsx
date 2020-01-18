import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return null;

  return (
    <footer id="footer">
      <div class="footer--background">
        <div class="text--left">
          <h1 class="company--logo">Weds360</h1>
          <div class="social--media--links">
            <span>
              <Link target="_blank" href="https://www.facebook.com/Weds360/">
                <i class="fab fa-facebook-f"></i>
              </Link>
            </span>

            <span>
              <Link target="_blank" href="https://www.instagram.com/weds360/">
                <i class="fab fa-instagram"></i>
              </Link>
            </span>
          </div>
        </div>
        <div class="text--center">
          © Copyright
          <Link target="_blank" href="http://plus360.xyz/">
            <strong>Plus360</strong>.
          </Link>
          All Rights Reserved
        </div>
        <div class="text--right">
          <ul>
            <li>
              <a href="/pages/terms-conditions?locale=en">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="/pages/privacy-policy?locale=en">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
