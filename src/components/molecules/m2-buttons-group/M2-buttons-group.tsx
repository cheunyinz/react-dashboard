import React, { ReactElement } from "react";

export type M2ButtonsGroupProps = {
  children: ReactElement[];
  styling?: string;
};

const M2ButtonsGroup: React.FC<M2ButtonsGroupProps> = ({
  children,
  styling,
}) => {
  return (
    <div className={`project-card__buttons-group ${styling}`}>{children}</div>
  );
};

export default M2ButtonsGroup;
