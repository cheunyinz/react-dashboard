import React from 'react';
import A1Heading from '../../atoms/a1-heading/A1-heading';
import A3Date from '../../atoms/a3-date/A3-date';

export type M1MetaDataProps = {
  headingText: string;
  headingColor: 'white' | 'blue';
  headingSize: 'large' | 'small';
  headingLevel: 'h1' | 'h2';
  alignment: 'center' | 'left';
  date: string;
};

const M2MetaData: React.FC<M1MetaDataProps> = ({ headingText, headingColor, headingSize, headingLevel, alignment, date }) => {

  return (
    <section className='project-card__meta-data'>
      <A1Heading text={headingText} color={headingColor} size={headingSize} level={headingLevel} alignment={alignment} />
      <A3Date text={date} />
    </section>
  );
};

export default M2MetaData;