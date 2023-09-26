import React from "react";
import M1MetaData, {
  M1MetaDataProps,
} from "../../../molecules/m1-meta-data/M1-meta-data";

import { A6ImageProps } from "../../../atoms/a6-image/A6-image";
import Carousel from "./O1-4-carousel-script";

export type O1CarouselProps = {
  metaData: M1MetaDataProps;
  imageData: A6ImageProps[];
};
export const O1Carousel: React.FC<O1CarouselProps> = ({
  metaData,
  imageData,
}) => {
  return (
    <li className="project-card project-card--current-dev">
      <M1MetaData {...metaData} />
      <Carousel imageData={imageData} />
    </li>
  );
};

export default O1Carousel;
