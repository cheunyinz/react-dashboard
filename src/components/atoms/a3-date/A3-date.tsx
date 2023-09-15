import React from 'react';

type A3DateProps = {
  text: string;
};

const A3Date: React.FC<A3DateProps> = ({ text }) => {

return(
    <time className='project-card__date' dateTime={text}>{text}</time>
)
};

export default A3Date