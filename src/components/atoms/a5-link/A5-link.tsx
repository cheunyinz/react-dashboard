import React from "react";

export type A5LinkProps = {
  text: string;
  link: string;
  id?: string;
  target?: "_blank" | "";
};

const A5Link: React.FC<A5LinkProps> = ({ text, link, id, target }) => {
  return (
    <a href={link} id={id} target={target} className={`project-card__link`}>
      {text}
    </a>
  );
};

export default A5Link;
