"use client";
import React, { useState, useEffect, useRef } from "react";

interface CountdownAppProps {}

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const INITIAL_COUNT = 25 * 60;

export const CountDownTimer: React.FC<CountdownAppProps> = () => {
  const [secondsRemaining, setSecondsRemaining] =
    useState<number>(INITIAL_COUNT);
  const [status, setStatus] = useState<string>(STATUS.STOPPED);

  const [timerDone, setTimerDone] = useState<boolean>(false);
  const secondsToDisplay: number = secondsRemaining % 60;
  const minutesRemaining: number = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay: number = minutesRemaining % 60;
  const hoursToDisplay: number = (minutesRemaining - minutesToDisplay) / 60;

  const handleStart = (): void => {
    setStatus(STATUS.STARTED);
  };
  const handleStop = (): void => {
    setStatus(STATUS.STOPPED);
  };
  const handleReset = (): void => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(INITIAL_COUNT);
  };
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
        setTimerDone(true);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );
  return (
    <>
      {timerDone ? (
        <div className="w-full h-lvh bg-blue-200 flex justify-start items-center flex-col pt-40 animate-pulse">
          <h1 className="text-3xl mb-4">Time is UP</h1>
          <button
            className="bg-blue-400 px-4 py-2 text-md mr-2 rounded-lg transition duration-150 ease-out"
            onClick={() => setTimerDone(false)}
            type="button"
          >
            OK
          </button>
        </div>
      ) : (
        <div className="w-full h-lvh bg-blue-100 flex justify-start items-center flex-col pt-40">
          <h1 className="font-semibold text-3xl mb-12">Countdown Timer</h1>
          <div>
            <button
              className="bg-blue-300 hover:bg-blue-400 px-4 py-2 text-md mr-2 rounded-lg transition duration-150 ease-out"
              onClick={handleStart}
              type="button"
            >
              Start
            </button>
            <button
              className="bg-blue-300 hover:bg-blue-400 px-4 py-2 text-md mr-2 rounded-lg transition duration-150 ease-out"
              onClick={handleStop}
              type="button"
            >
              Stop
            </button>
            <button
              className="bg-blue-300 hover:bg-blue-400 px-4 py-2 text-md mr-2 rounded-lg transition duration-150 ease-out"
              onClick={handleReset}
              type="button"
            >
              Reset
            </button>
          </div>
          <div className="p-5 text-md">
            <p>
              {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
              {twoDigits(secondsToDisplay)}
            </p>
          </div>
          <p className="text-md">Status: {status}</p>
        </div>
      )}
    </>
  );
};

function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const twoDigits = (num: number): string => String(num).padStart(2, "0");
