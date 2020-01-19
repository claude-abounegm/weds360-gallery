import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Anchor from "../elements/Anchor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GoToTopAnchor = styled(Anchor)`
  opacity: 1;
  transition: opacity 0.5s linear;

  text-decoration: none;

  position: fixed;
  right: 20px;
  bottom: 20px;
  height: 50px;
  width: 50px;
  background-color: white;
  box-shadow: 0 0 2px 0;
  z-index: 99999;
  border-radius: 50%;

  &.hidden {
    opacity: 0;
  }

  &:hover {
    color: #23527c;
  }
`;

const ToTopIcon = styled(FontAwesomeIcon)`
  vertical-align: center;
  margin: auto;
  text-align: 0;
  padding: 18px;
  position: absolute;
  text-align: center;
  color: #024d4c;
`;

const GoToTop = props => {
  const { scrollStepInPx = 50, delayInMs = 15 } = props;

  const [hidden, setHidden] = useState(true);

  function handleScroll() {
    const offset = window.pageYOffset;
    setHidden(offset <= 104);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    const interval = setInterval(() => {
      if (window.pageYOffset === 0) {
        clearInterval(interval);
        return;
      }

      window.scroll(0, window.pageYOffset - scrollStepInPx);
    }, delayInMs);
  }

  function handleClick(e) {
    e.preventDefault();
    scrollToTop();
  }

  return (
    <GoToTopAnchor
      className={hidden ? "hidden" : ""}
      onClick={handleClick}
      href="#"
    >
      <ToTopIcon icon="chevron-up" />
    </GoToTopAnchor>
  );
};

export default GoToTop;