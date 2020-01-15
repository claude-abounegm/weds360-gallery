import _ from "lodash";
import React from "react";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount <= 1) {
    return null;
  }

  function paginationButton(page, opts) {
    const { text, disabled, onPageChange, key } = opts || {};

    return (
      <button
        disabled={disabled}
        key={key || page}
        onClick={() => onPageChange(page)}
      >
        {text || page}
      </button>
    );
  }

  let pagination = [
    paginationButton(null, {
      key: "previous",
      disabled: currentPage === 1,
      text: "← Previous",
      onPageChange: () => onPageChange(currentPage - 1)
    }),
    ..._.range(1, Math.min(pagesCount + 1, 10)).map(page =>
      paginationButton(page, { disabled: currentPage === page, onPageChange })
    )
  ];

  if (pagesCount > 10) {
    pagination.push(
      <span key="seperator">...</span>,
      ..._.range(pagesCount - 1, pagesCount + 1).map(page =>
        paginationButton(page, { disabled: currentPage === page, onPageChange })
      )
    );
  }

  pagination.push(
    paginationButton(null, {
      key: "next",
      disabled: currentPage === pagesCount,
      text: "Next →",
      onPageChange: () => onPageChange(currentPage + 1)
    })
  );

  return <nav>{pagination}</nav>;
};

export default Pagination;
