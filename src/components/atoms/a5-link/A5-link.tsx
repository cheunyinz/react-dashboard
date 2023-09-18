import React from "react";

export type A5LinkProps = {
  text: string;
  link: string;
  id?: string;
};

const A5Link: React.FC<A5LinkProps> = ({ text, link, id }) => {
  return (
    <a href={link} id={id} className={`project-card__link`}>
      {text}
    </a>
  );
};

export default A5Link;
