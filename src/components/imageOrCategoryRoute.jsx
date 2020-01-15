import React, { useEffect, useState } from "react";
import _ from "lodash";
import http from "../services/httpService";
import { Redirect } from "react-router-dom";

const ImageOrCategoryRoute = props => {
  console.log("imageorcategor");
  const { id } = props.match.params;

  const [type, setType] = useState(null);

  useEffect(() => {
    (async () => {
      let type;
      try {
        const images = await http.getImages({ categoryId: id });

        if (images.length > 0) {
          type = "category";
        }
      } catch (e) {}

      if (!type) {
        try {
          await http.getImage(id);
          type = "image";
        } catch (e) {}
      }

      setType(type || "category");
    })();
  }, [id]);

  if (!type) {
    return <span>{type}</span>;
  }

  if (type === "category") {
    return <Redirect to={`/category/${id}`} />;
  }

  if (type === "image") {
    return <Redirect to={`/image/${id}`} />;
  }

  return <Redirect to="/" />;
};

export default ImageOrCategoryRoute;
