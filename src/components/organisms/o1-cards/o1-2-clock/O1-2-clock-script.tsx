// StopwatchLogic.tsx
import React, { useState, useRef, useEffect } from "react";
import M2ButtonsGroup, {
  M2ButtonsGroupProps,
} from "../../../molecules/m2-buttons-group/M2-buttons-group";

const ClockLogic: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [timezoneName, setTimezoneName] = useState<string>("");
  const [countryflag, setCountryflag] = useState<string>("");
  let clockInterval = useRef<number | null>(null);
  const runClockTime = (timeZone: string, timeZoneName: string) => {
    let options: any;

    if (clockInterval.current) {
      clearInterval(clockInterval.current);
    }
    if (timeZone !== "local") {
      options = { timeZone: timeZone, hour12: false };
    } else {
      options = { hour12: false };
    }

    clockInterval.current = setInterval(() => {
      let formattedTime: string = new Date().toLocaleTimeString([], options);
      let timezoneName: string = timeZoneName;
      let countryflag: string = `url('/assets/icons/clock/${timeZoneName}.svg`;
      setFormattedTime(formattedTime);
      setTimezoneName(timezoneName);
      setCountryflag(countryflag);
    }, 10);
  };

  const changeClockButtonState = (
    timeZone: string,
    timeZoneName: string
    // state: string
  ) => {
    setSelectedButton(timeZone);
    runClockTime(timeZone, timeZoneName);
  };

  const buttons: M2ButtonsGroupProps = {
    buttons: [
      {
        text: "MEX",
        state: selectedButton === "America/Monterrey" ? "selected" : "default",
        onClick: () => changeClockButtonState("America/Monterrey", "MEX"),
      },
      {
        text: "NED",
        state: selectedButton === "Europe/Amsterdam" ? "selected" : "default",
        onClick: () => changeClockButtonState("Europe/Amsterdam", "NED"),
      },
      {
        text: "LOC",
        state: selectedButton === "local" ? "selected" : "default",
        onClick: () => changeClockButtonState("local", "LOC"),
      },
      {
        text: "HKG",
        state: selectedButton === "Hongkong" ? "selected" : "default",
        onClick: () => changeClockButtonState("Hongkong", "HKG"),
      },
      {
        text: "KOR",
        state: selectedButton === "ROK" ? "selected" : "default",
        onClick: () => changeClockButtonState("ROK", "KOR"),
      },
    ],
  };

  const clockTimeFlag = {
    "--background-image-url": `url(${countryflag})`,
  };

  useEffect(() => {
    setSelectedButton("local");
    runClockTime("local", "LOC");
  }, []);

  useEffect(() => {
    return () => {
      if (clockInterval.current) {
        clearInterval(clockInterval.current); // Clean up the interval on unmount
      }
    };
  }, []);

  return (
    <section className="clock">
      <div className="clock__container">
        <time className="clock__time">{formattedTime}</time>
        <p className="clock__time-name">{timezoneName}</p>
      </div>
      <M2ButtonsGroup {...buttons} />
    </section>
  );
};

export default ClockLogic;
