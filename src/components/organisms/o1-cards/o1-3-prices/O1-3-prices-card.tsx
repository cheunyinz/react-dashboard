import React from "react";
import M1MetaData, {
  M1MetaDataProps,
} from "../../../molecules/m1-meta-data/M1-meta-data";
import PriceLogic from "./O1-3-prices-script";

export type O1PricesProps = {
  metaData: M1MetaDataProps;
};
export const O1Price: React.FC<O1PricesProps> = ({ metaData }) => {
  return (
    <li className="project-card">
      <M1MetaData {...metaData} />
      <PriceLogic />
    </li>
  );
};

export default O1Price;

