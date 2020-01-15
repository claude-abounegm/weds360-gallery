import React, { useEffect, useState } from "react";
import _ from "lodash";
import http from "../services/httpService";
import GalleryImage from "./galleryImage";

const Categories = props => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    http.getCategories().then(setCategories, _.noop);
  }, []);

  return (
    <React.Fragment>
      {categories.map(({ img, id, ...rest }) => (
        <GalleryImage
          key={id}
          id={id}
          src={img}
          basePath="/category"
          {...rest}
        />
      ))}
    </React.Fragment>
  );
};

export default Categories;