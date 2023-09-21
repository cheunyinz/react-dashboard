import M1MetaData, {
  M1MetaDataProps,
} from "../../../molecules/m1-meta-data/M1-meta-data";
import ClockLogic from "./O1-2-clock-script";

export type O1ClockProps = {
  metaData: M1MetaDataProps;
};
export const O1Clock = ({ metaData }: O1ClockProps) => {
  return (
    <li className="project-card">
      <M1MetaData {...metaData} />
      <ClockLogic />
    </li>
  );
};

export default O1Clock;
