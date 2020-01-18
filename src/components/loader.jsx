import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const LoaderDiv = styled.div`
  content: "";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 999;

  & img {
    max-width: 26%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    vertical-align: middle;
    border: 0;
  }
`;

const Loader = props => {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <LoaderDiv>
        <img alt="Weds360 Logo" className="loader-logo" src="/logo.png" />
      </LoaderDiv>
    );
  }

  return null;
};

const mapStateToProps = ({ isLoading }) => ({ isLoading });

export default connect(mapStateToProps)(Loader);