import React from "react";
import A1Heading, {
  A1HeadingProps,
} from "./components/atoms/a1-heading/A1-heading";
import O1Stopwatch, {
  O1StopwatchProps,
} from "./components/organisms/o1-cards/o1-1-stopwatch/O1-1-stopwatch-card";

import O1Clock, {
  O1ClockProps,
} from "./components/organisms/o1-cards/o1-2-clock/O1-2-clock-card";

const App: React.FC = () => {
  const headingMeta: A1HeadingProps = {
    text: "CYZ React Dashboard",
    color: "white",
    size: "large",
    level: "h1",
    alignment: "left",
  };

  const stopwatchMeta: O1StopwatchProps = {
    metaData: {
      headingText: "Stopwatch",
      headingColor: "blue",
      headingSize: "small",
      headingLevel: "h2",
      alignment: "center",
      date: "07-2023",
    },
  };

  const clockMeta: O1ClockProps = {
    metaData: {
      headingText: "Clock",
      headingColor: "blue",
      headingSize: "small",
      headingLevel: "h2",
      alignment: "center",
      date: "07-2023",
    },
  };

  return (
    <>
      <header>
        <A1Heading {...headingMeta} />
      </header>
      <main>
        <ol className="projects">
          <O1Stopwatch {...stopwatchMeta} />
          <O1Clock {...clockMeta} />
        </ol>
      </main>
    </>
  );
};

export default App;
