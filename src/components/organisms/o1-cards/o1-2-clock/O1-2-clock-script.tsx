// StopwatchLogic.tsx
import React, { useState, useRef, useEffect } from "react";
import M2ButtonsGroup from "../../../molecules/m2-buttons-group/M2-buttons-group";
import A4Button from "../../../atoms/a4-button/A4-button";

const ClockLogic: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [timezoneName, setTimezoneName] = useState<string>("");
  const clockInterval = useRef<ReturnType<typeof setInterval> | null>(null);
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
      const formattedTime: string = new Date().toLocaleTimeString([], options);
      const timezoneName: string = timeZoneName;
      setFormattedTime(formattedTime);
      setTimezoneName(timezoneName);
    }, 10);
  };

  const changeClockButtonState = (timeZone: string, timeZoneName: string) => {
    setSelectedButton(timeZone);
    runClockTime(timeZone, timeZoneName);
  };

  useEffect(() => {
    setSelectedButton("local");
    runClockTime("local", "LOC");
  }, []);

  useEffect(() => {
    return () => {
      if (clockInterval.current) {
        clearInterval(clockInterval.current);
      }
    };
  }, []);

  return (
    <section className="clock">
      <div className="clock__container">
        <time className="clock__time">{formattedTime}</time>
        <p className="clock__time-name">{timezoneName}</p>
      </div>
      <M2ButtonsGroup>
        <A4Button
          text={"MEX"}
          state={
            selectedButton === "America/Monterrey" ? "selected" : "default"
          }
          onClick={() => changeClockButtonState("America/Monterrey", "MEX")}
        ></A4Button>
        <A4Button
          text={"NED"}
          state={selectedButton === "Europe/Amsterdam" ? "selected" : "default"}
          onClick={() => changeClockButtonState("Europe/Amsterdam", "NED")}
        ></A4Button>
        <A4Button
          text={"LOC"}
          state={selectedButton === "local" ? "selected" : "default"}
          onClick={() => changeClockButtonState("local", "LOC")}
        ></A4Button>
        <A4Button
          text={"HKG"}
          state={selectedButton === "Hongkong" ? "selected" : "default"}
          onClick={() => changeClockButtonState("Hongkong", "HKG")}
        ></A4Button>
        <A4Button
          text={"KOR"}
          state={selectedButton === "ROK" ? "selected" : "default"}
          onClick={() => changeClockButtonState("ROK", "KOR")}
        ></A4Button>
      </M2ButtonsGroup>
    </section>
  );
};

export default ClockLogic;
