import _ from "lodash";
import React from "react";

import styled from "styled-components";

const PaginationNav = styled.nav`
  display: block;
  text-align: center;
`;

const PaginationButton = styled.button`
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

const PaginationPreviousButton = styled(PaginationButton)`
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
`;

const PaginationNextButton = styled(PaginationButton)`
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
`;

const PaginationList = styled.ul`
  padding-bottom: 40px;
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
`;

const PaginationItem = styled.li`
  display: inline;
`;

const Pagination = props => {
  const {
    pagesCount = 1,
    currentPage = 1,
    pagesCountLeft = 9,
    pagesCountRight = 2,
    onPageChange
  } = props;

  if (pagesCount === 0) {
    return null;
  }

  function paginationButton(page, opts) {
    const {
      text,
      disabled,
      onPageChange,
      key,
      DefaultButton = PaginationButton
    } = opts || {};

    return (
      <PaginationItem key={key || page}>
        <DefaultButton
          className={currentPage === page ? "active" : ""}
          disabled={disabled}
          onClick={() => onPageChange(page)}
        >
          {text || page}
        </DefaultButton>
      </PaginationItem>
    );
  }

  let pagination = [
    paginationButton(null, {
      key: "previous",
      disabled: currentPage === 1,
      text: "← Previous",
      onPageChange: () => onPageChange(currentPage - 1),
      DefaultButton: PaginationPreviousButton
    }),
    ..._.range(1, Math.min(pagesCount + 1, pagesCountLeft + 1)).map(page =>
      paginationButton(page, {
        disabled: currentPage === page,
        onPageChange
      })
    )
  ];

  if (pagesCount > 10) {
    const end = pagesCount + 1;
    const start = end - pagesCountRight;

    pagination.push(
      <PaginationButton disabled key="seperator">
        ...
      </PaginationButton>,
      ..._.range(start, end).map(page =>
        paginationButton(page, {
          disabled: currentPage === page,
          onPageChange
        })
      )
    );
  }

  pagination.push(
    paginationButton(null, {
      key: "next",
      disabled: currentPage === pagesCount,
      text: "Next →",
      onPageChange: () => onPageChange(currentPage + 1),
      DefaultButton: PaginationNextButton
    })
  );

  return (
    <PaginationNav>
      <PaginationList>{pagination}</PaginationList>
    </PaginationNav>
  );
};

export default Pagination;
