// StopwatchLogic.tsx
import React, { useEffect, useState, useRef } from 'react';
import M2ButtonsGroup, { M2ButtonsGroupProps } from '../../../molecules/m2-buttons-group/M2-buttons-group';

const StopwatchLogic: React.FC = () => {
  const [milSeconds, setMilSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const stopwatchInterval = useRef<number | null>(null);

  const startTimer = () => {
    if (!stopwatchRunning) {
      stopwatchInterval.current = window.setInterval(() => {
        updateMiliseconds();
      }, 10);
    }
    setStopwatchRunning(true);
  };

  const stopTimer = () => {
    if (stopwatchInterval.current) {
      clearInterval(stopwatchInterval.current);
      stopwatchInterval.current = null;
    }
    setStopwatchRunning(false);
  };

  const resetTimer = () => {
    if (stopwatchInterval.current) {
      clearInterval(stopwatchInterval.current);
      stopwatchInterval.current = null;
    }
    setMilSeconds(0);
    setSeconds(0);
    setMinutes(0);
    setStopwatchRunning(false);
  };

  const updateMiliseconds = () => {
    setMilSeconds((prevMilSeconds) => {
      let updatedMilSeconds = prevMilSeconds + 1;
      if (updatedMilSeconds > 99) {
        updatedMilSeconds = 0;
        updateSeconds();
      }
      return updatedMilSeconds;
    });
  };

  const updateSeconds = () => {
    setSeconds((prevSeconds) => {
      let updatedSeconds = prevSeconds + 1;
      if (updatedSeconds > 59) {
        updatedSeconds = 0;
        updateMinutes();
      }
      return updatedSeconds;
    });
  };

  const updateMinutes = () => {
    setMinutes((prevMinutes) => prevMinutes + 1);
  };

  useEffect(() => {
    return () => {
      if (stopwatchInterval.current) {
        clearInterval(stopwatchInterval.current);
      }
    };
  }, []);

  const formatTimeValue = (value: number) => {
    return value < 10 ? '0' + value : value;
  };

//   const buttonState = stopwatchRunning
//   ? 'disabled'
//   : milSeconds === 0
//   ? 'default'
//   : 'default';

  // Define the buttons with their handlers, states and IDs
  const buttons: M2ButtonsGroupProps = {
    buttons: [
      { text: 'Start', id: 'sw-start-btn', state: stopwatchRunning ? 'disabled' : 'default', onClick: startTimer },
      { text: 'Stop', id: 'sw-stop-btn', state: stopwatchRunning ? 'default' : 'disabled', onClick: stopTimer },
      { text: 'Reset', id: 'sw-reset-btn', state: stopwatchRunning || milSeconds === 0 ? 'disabled' : 'default', onClick: resetTimer },
    ],
  };

  return (
    <section className='stopwatch'>
      <p className='stopwatch__time'>
          <span id="sw-min">{formatTimeValue(minutes)}</span>:
          <span id="sw-sec">{formatTimeValue(seconds)}</span>:
          <span id="sw-milsec">{formatTimeValue(milSeconds)}</span>
      </p>
      <M2ButtonsGroup {...buttons} />
    </section>
  );
};

export default StopwatchLogic;