import React, { CSSProperties } from "react";

export type A6ImageProps = {
  src: string;
  alt: string;
  id?: string;
  key?: string;
  style?: CSSProperties;
  draggable?: boolean;
};
const A6Image: React.FC<A6ImageProps> = ({
  src,
  alt,
  id,
  key,
  style,
  draggable,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`image`}
      id={id}
      key={key}
      style={style}
      draggable={draggable}
    />
  );
};

export default A6Image;
