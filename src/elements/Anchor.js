import React from "react";
import styled from "styled-components";

export const A = styled.a``;

const Anchor = props => {
  const { children } = props;

  return (
    <A rel="noopener noreferrer" target="_blank" {...props}>
      {children}
    </A>
  );
};
export default Anchor;
