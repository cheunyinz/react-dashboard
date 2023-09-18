import React from "react";

export type A2TextProps = {
  text: string;
  color: "white" | "blue";
  size: "medium" | "small";
  alignment: "center" | "";
};

const A2Text: React.FC<A2TextProps> = ({ text, color, size, alignment }) => {
  const colorClass = color === "white" ? "text--white" : "text--blue";
  const sizeClass = size === "medium" ? "text--medium" : "text--small";
  const alignClass = alignment === "center" ? "text--center" : "";

  return (
    <p className={`text ${colorClass} ${sizeClass} ${alignClass}`}>{text}</p>
  );
};

export default A2Text;
