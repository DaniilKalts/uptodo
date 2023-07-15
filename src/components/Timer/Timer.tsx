'use client';

import React, { useEffect, useState } from 'react';

import Button from '../UI/Button';

interface TimerInterface {
  timerSeconds: number;
  onEdit: () => void;
}

const Timer: React.FC<TimerInterface> = ({ timerSeconds, onEdit }) => {
  const [timerLabel, setTimerLabel] = useState<string>('Start');

  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const [seconds, setSeconds] = useState<number>(timerSeconds);

  const [accumulativeSecond, setAccumulativeSecond] = useState<number>(0);

  const initialCircularIndicator: number = 755;
  const [circluarIndicator, setCircluarIndicator] = useState<number>(
    initialCircularIndicator,
  );

  const secondsString = String(seconds % 60).padStart(2, '0');
  const minutesString = String(Math.floor(seconds / 60)).padStart(2, '0');

  const isDanger: boolean = seconds > 0 && seconds <= 5;

  const onTimerChange = () => {
    setTimerLabel(!isTimerRunning ? 'Stop' : 'Resume');
    setIsTimerRunning((prev) => !prev);
  };

  const onTimerReset = () => {
    setCircluarIndicator(initialCircularIndicator);
    setSeconds(timerSeconds);
    setAccumulativeSecond(0);
    setTimerLabel('Start');
    setIsTimerRunning(false);
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isTimerRunning) {
      const circluarIndicatorInterval = setInterval(() => {
        setAccumulativeSecond((prev) => prev + 0.01);

        setCircluarIndicator(
          (prev) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            Math.max(prev - 691 / timerSeconds / 100, 64),
          // eslint-disable-next-line function-paren-newline
        );
      }, 10);

      return () => {
        clearInterval(circluarIndicatorInterval);
      };
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (
      // eslint-disable-next-line operator-linebreak
      parseFloat(accumulativeSecond.toFixed(3)) % 1 === 0 &&
      accumulativeSecond !== 0
    ) {
      setSeconds(
        Math.max(timerSeconds - parseFloat(accumulativeSecond.toFixed(3)), 0),
      );
    }
  }, [accumulativeSecond]);

  useEffect(() => {
    if (seconds === 0) {
      setTimerLabel('Start');
      setIsTimerRunning(false);
    }
  }, [seconds]);

  useEffect(() => {
    setSeconds(timerSeconds);
  }, [timerSeconds]);

  return (
    <div className="flex flex-col items-center mb-12">
      <div className="flex items-center justify-center">
        <svg className="transform -rotate-90 w-[250px] h-[250px]">
          <circle
            cx="125"
            cy="125"
            r="110"
            stroke="currentColor"
            strokeWidth="13"
            fill="transparent"
            className="text-[#555]"
          ></circle>
          <circle
            cx="125"
            cy="125"
            r="110"
            stroke="currentColor"
            strokeWidth="13"
            fill="transparent"
            className="text-[#8875FF]"
            strokeDasharray="755"
            strokeDashoffset={
              circluarIndicator === initialCircularIndicator
                ? 755
                : circluarIndicator
            }
          ></circle>
        </svg>
        <p
          className={`
            text-5xl 
            font-medium
            ${isTimerRunning && !isDanger && 'text-[#3d3d3d] dark:text-white'}
            ${
              // eslint-disable-next-line operator-linebreak
              (!isTimerRunning && !isDanger) ||
              circluarIndicator === initialCircularIndicator
                ? 'text-[#3d3d3d] dark:text-[#ffffffdd]'
                : ''
            }
            ${
              isDanger && circluarIndicator !== initialCircularIndicator
                ? 'text-red-500'
                : ''
            }
            ${!seconds && timerSeconds > 0 && 'blink-hard'}
            absolute
          `}
        >
          {minutesString}:{secondsString}
        </p>
      </div>
      <p className="text-base text-center text-[#3d3d3d] dark:text-white mt-4 mb-6 max-w-md min-[475px]:text-lg">
        While your focus mode is on, all of your notifications should be off
      </p>
      <div className="flex items-center justify-between w-full max-w-sm gap-5">
        <div className="w-1/4">
          <Button
            label="Edit"
            onClick={() => onEdit()}
            disabled={accumulativeSecond > 0}
            outline
          />
        </div>
        <div className="w-2/4">
          <Button
            label={timerLabel}
            onClick={onTimerChange}
            disabled={seconds === 0}
            filled
          />
        </div>
        <div className="w-1/4">
          <Button
            label="Reset"
            onClick={onTimerReset}
            disabled={seconds === timerSeconds || isTimerRunning}
            outline
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;
