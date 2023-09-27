import React from "react";

export type A4ButtonProps = {
  text: string;
  id?: string;
  state: "selected" | "disabled" | "default";
  styling?: string;
  onClick?: () => void;
};

const A4Button: React.FC<A4ButtonProps> = ({ text, id, state, onClick }) => {
  return (
    <button
      id={id}
      className={`project-card__button  project-card__button--${state}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default A4Button;
