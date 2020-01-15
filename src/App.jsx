import React, { useState, useEffect } from "react";
import "./scss/App.scss";
import Image from "./components/image";

import http from "./services/httpService";

export const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    http
      .get("http://localhost:3001/images?_limit=9")
      .then(({ data: images }) => setImages(images));
  }, []);

  return (
    <div>
      {images.map(({ img, title }) => (
        <Image src={`/images${img}`} title={title} />
      ))}
    </div>
  );
};
