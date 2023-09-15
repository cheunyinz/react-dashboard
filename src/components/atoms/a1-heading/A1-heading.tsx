import React from 'react';

export type A1HeadingProps = {
  text: string;
  color: 'white' | 'blue';
  size: 'large' | 'small';
  level: 'h1' | 'h2';
  alignment: 'center' | 'left';
};

const A1Heading: React.FC<A1HeadingProps> = ({ text, color, size, level, alignment }) => {
  const colorClass = color === 'white' ? 'heading--white' : 'heading--blue';
  const sizeClass = size === 'large' ? 'heading--large' : 'heading--small';
  const alignClass = alignment === 'center' ? 'heading--center' : '';

  if (level === 'h1') {
    return <h1 className={`heading ${colorClass} ${sizeClass} ${alignClass}`}>{text}</h1>;
  } else {
    return <h2 className={`heading ${colorClass} ${sizeClass}  ${alignClass}`}>{text}</h2>;
  }
};

export default A1Heading;