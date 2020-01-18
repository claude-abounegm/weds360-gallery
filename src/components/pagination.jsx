import _ from "lodash";
import React from "react";
import {
  PaginationNav,
  PaginationUL,
  PaginationLI,
  PaginationButton,
  PaginationPreviousButton,
  PaginationNextButton
} from "./../elements/Pagination";

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
      <PaginationLI key={key || page}>
        <DefaultButton
          className={currentPage === page ? "active" : ""}
          disabled={disabled}
          onClick={() => onPageChange(page)}
        >
          {text || page}
        </DefaultButton>
      </PaginationLI>
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
      <PaginationUL>{pagination}</PaginationUL>
    </PaginationNav>
  );
};

export default Pagination;
