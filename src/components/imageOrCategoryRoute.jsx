import React, { useEffect, useState } from "react";
import http from "../services/httpService";
import { Redirect } from "react-router-dom";

const ImageOrCategoryRoute = props => {
  const { id } = props.match.params;

  const [type, setType] = useState(null);

  useEffect(() => {
    (async () => {
      let type = "notFound";

      if (await http.isValidCategory(id)) {
        type = "category";
      } else if (await http.isValidImage(id)) {
        type = "image";
      }

      setType(type);
    })();
  }, [id]);

  if (!type) {
    return null;
  }

  let redirectTo;

  switch (type) {
    case "category":
      redirectTo = `/category/${id}`;
      break;

    case "image":
      redirectTo = `/image/${id}`;
      break;

    default:
      redirectTo = "/";
      break;
  }

  return <Redirect to={redirectTo} />;
};

export default ImageOrCategoryRoute;
