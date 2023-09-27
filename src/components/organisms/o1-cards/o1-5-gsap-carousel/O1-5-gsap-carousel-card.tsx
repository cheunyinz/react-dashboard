import React from "react";
import M1MetaData, {
  M1MetaDataProps,
} from "../../../molecules/m1-meta-data/M1-meta-data";

import { A6ImageProps } from "../../../atoms/a6-image/A6-image";
import GsapCarousel from "./O1-5-gsap-carousel-script";

export type O1GsapCarouselProps = {
  metaData: M1MetaDataProps;
  imageData: A6ImageProps[];
};
export const O1GsapCarousel: React.FC<O1GsapCarouselProps> = ({
  metaData,
  imageData,
}) => {
  return (
    <li className="project-card">
      <M1MetaData {...metaData} />
      <GsapCarousel imageData={imageData} />
    </li>
  );
};

export default O1GsapCarousel;
