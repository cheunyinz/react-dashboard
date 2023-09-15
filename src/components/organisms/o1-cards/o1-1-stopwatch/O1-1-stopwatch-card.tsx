import React from 'react';
import M1MetaData, { M1MetaDataProps } from '../../../molecules/m1-meta-data/M1-meta-data';

import StopwatchLogic from './O1-1-stopwatch-script';


export type O1StopwatchProps = {

  metaData: M1MetaDataProps;


};

const O1Stopwatch: React.FC<O1StopwatchProps> = ({ metaData}) => {


  return (
    <li className='project-card'>
      <M1MetaData {...metaData} />
      <StopwatchLogic />

    

    </li>
  );
};

export default O1Stopwatch;