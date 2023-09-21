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

import O1Prices, {
  O1PricesProps,
} from "./components/organisms/o1-cards/o1-3-prices/O1-3-prices-card";

import O1Carousel, {
  O1CarouselProps,
} from "./components/organisms/o1-cards/o1-4-carousel/O1-4-carousel-card";

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

  const pricesMeta: O1PricesProps = {
    metaData: {
      headingText: "Prices",
      headingColor: "blue",
      headingSize: "small",
      headingLevel: "h2",
      alignment: "center",
      date: "09-2023",
    },
  };

  // const imageNames = ["hong_kong", "tokyo", "seoul"].map((name) => ({
  //   src: `../src/images/cities/${name}.jpg`,
  //   alt: { name },
  // }));

  const carouselMeta: O1CarouselProps = {
    metaData: {
      headingText: "Carousel",
      headingColor: "blue",
      headingSize: "small",
      headingLevel: "h2",
      alignment: "center",
      date: "09-2023",
    },

    imageData: [
      {
        src: "../src/images/cities/hong_kong.jpg",
        alt: "HKG",
        key: "",
        draggable: false,
      },
      {
        src: "../src/images/cities/tokyo.jpg",
        alt: "JAP",
        key: "",
        draggable: false,
      },
      {
        src: "../src/images/cities/seoul.jpg",
        alt: "KOR",
        key: "",
        draggable: false,
      },
    ],
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
          <O1Prices {...pricesMeta} />
          <O1Carousel {...carouselMeta} />
        </ol>
      </main>
    </>
  );
};

export default App;
