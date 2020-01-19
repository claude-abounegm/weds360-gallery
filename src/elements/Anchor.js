import React from "react";
import styled from "styled-components";

export const A = styled.a`
  color: #337ab7;
  text-decoration: none;
  background-color: transparent;

  &:active,
  &:hover {
    outline: 0;
  }

  &:focus,
  &:hover {
    outline: none;
    text-decoration: none;
    color: #23527c;
  }
`;

const Anchor = props => {
  const { children } = props;

  return (
    <A rel="noopener noreferrer" target="_blank" {...props}>
      {children}
    </A>
  );
};
export default Anchor;
