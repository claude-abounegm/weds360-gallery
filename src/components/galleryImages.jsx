import React, { useState, useEffect } from "react";
import _ from "lodash";
import qs from "querystring";
import GalleryImage from "./galleryImage";
import Pagination from "./pagination";
import http from "../services/httpService";
import { parseQueryString, maybeParseInt } from "../utils";
import { Redirect } from "react-router-dom";

const GalleryImages = props => {
  const { category_id: categoryId } = props.match.params;
  const parsedQueryString = parseQueryString(props.location.search);

  const { page, limit } = (data => {
    const { page, limit } = data;

    return {
      ...data,
      page: maybeParseInt(page) || 1,
      limit: maybeParseInt(limit) || 9
    };
  })(parsedQueryString);

  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [error, setError] = useState(null);

  function buildQueryString(page, limit) {
    let query = { page };
    if (limit) {
      query.limit = limit;
    }
    query = qs.stringify(query);
    return query;
  }

  function handlePageChange(page, replace) {
    const query = buildQueryString(page, parsedQueryString.limit);

    props.history[replace ? "replace" : "push"](`?${query}`);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const allImages = await http.getImages({ categoryId });

        const totalPages = Math.ceil(allImages.length / limit);
        const valid = page >= 1 && page <= totalPages;

        if (!valid) {
          let to;
          if (page < 1) {
            to = 1;
          } else {
            to = totalPages;
          }

          setError({ to });
        } else {
          setError(null);
          setAllImages(allImages);
        }
      } catch (e) {
        setError({ message: e.message });
      }
    }

    fetchData();
  }, [page, limit, categoryId, allImages]);

  useEffect(() => {
    if (!error) {
      http.getImages({ page, limit, categoryId }).then(setImages, _.noop);
    }
  }, [page, limit, error, categoryId]);

  if (error) {
    const { to } = error;

    let path = "/";
    if (to) {
      path = `/?page=${error.to}`;
    }

    return <Redirect to={path} />;
  }

  return (
    <React.Fragment>
      <Pagination
        onPageChange={handlePageChange}
        itemsCount={allImages.length}
        pageSize={limit}
        currentPage={page}
      />

      {images.map(({ img, title, id }) => (
        <GalleryImage key={id} id={id} src={`/images${img}`} title={title} />
      ))}
    </React.Fragment>
  );
};

export default GalleryImages;
