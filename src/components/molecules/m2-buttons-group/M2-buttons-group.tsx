import React from "react";
import A4Button, { A4ButtonProps } from "../../atoms/a4-button/A4-button";

export type M2ButtonsGroupProps = {
  buttons: A4ButtonProps[];
  styling?: string;
};

const M2ButtonsGroup: React.FC<M2ButtonsGroupProps> = ({
  buttons,
  styling,
}) => {
  return (
    <div className={`project-card__buttons-group ${styling}`}>
      {buttons.map((button, index) => (
        <A4Button key={index} {...button} />
      ))}
    </div>
  );
};

export default M2ButtonsGroup;
