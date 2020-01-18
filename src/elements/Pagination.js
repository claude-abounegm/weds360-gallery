import styled from "styled-components";

export const PaginationNav = styled.nav`
  display: block;
  text-align: center;
`;

export const PaginationUL = styled.ul`
  padding-bottom: 40px;
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
`;

export const PaginationLI = styled.li`
  display: inline;
`;

export const PaginationButton = styled.button`
  position: relative;
  float: left;
  padding: 6px 12px;
  line-height: 1.428571429;
  text-decoration: none;
  color: black;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-left: -1px;

  &.active {
    background-color: #024d4c;
    border-color: #024d4c;
    color: white;
  }

  &:disabled:not(.active) {
    cursor: not-allowed;
    color: #777777;
  }

  &:hover:disabled:not(.active) {
    color: #777777;
    background-color: #fff;
  }

  &:hover:not(.active):not(:disabled) {
    cursor: pointer;
    color: #23527c;
    background-color: #eeeeee;
    border-color: #ddd;
  }
`;

export const PaginationPreviousButton = styled(PaginationButton)`
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
`;

export const PaginationNextButton = styled(PaginationButton)`
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
`;
