import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";

const Pagination = props => {
  const { itemsCount, pageSize, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);

  return (
    <nav>
      <span>{pagesCount}</span>
      {_.range(1, Math.min(pagesCount, 10)).map(page => {
        return (
          <button key={page} onClick={() => onPageChange(page)}>
            {page}
          </button>
        );
      })}
    </nav>
  );
};

export default Pagination;
