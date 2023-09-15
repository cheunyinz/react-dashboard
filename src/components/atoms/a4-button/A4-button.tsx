// A4Button.tsx
import React from 'react';

export type A4ButtonProps = {
  text: string;
  id: string;
  state: 'selected' | 'disabled' |'default';
  onClick?: () => void;
};

const A4Button: React.FC<A4ButtonProps> = ({ text, id, state, onClick }) => {

    let btnStateClass = '';

    if (state === 'selected') {
      btnStateClass = 'project-card__button--selected';
    } else if (state === 'disabled') {
      btnStateClass = 'project-card__button--disabled';
    }

return(
    <button  id={id} className={`project-card__button ${btnStateClass}`} onClick={onClick}> {text}</button>
)
};

export default A4Button;