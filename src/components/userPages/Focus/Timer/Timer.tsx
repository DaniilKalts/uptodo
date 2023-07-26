'use client';

import React, { useState, useEffect } from 'react';

import Button from '../../../UI/Button';

import expiredSound from '../../../../../public/sounds/expiredSound.mp3';

interface TimerInterface {
  timerSeconds: number;
  onEdit: () => void;
}

const Timer: React.FC<TimerInterface> = ({ timerSeconds, onEdit }) => {
  const [timerLabel, setTimerLabel] = useState<string>('Start');

  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const [accumulativeSecond, setAccumulativeSecond] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(timerSeconds);

  const [timerSound, setTimerSound] = useState<any>(null);

  const initialCircularIndicator: number = 755;
  const [circluarIndicator, setCircluarIndicator] = useState<number>(
    initialCircularIndicator,
  );

  const secondsString: string = String(seconds % 60).padStart(2, '0');
  const minutesString = String(Math.floor(seconds / 60)).padStart(2, '0');

  const isDanger: boolean = seconds > 0 && seconds <= 5;

  const onTimerChange = () => {
    setTimerLabel(!isTimerRunning ? 'Stop' : 'Resume');
    setIsTimerRunning((prev) => !prev);
  };

  const onTimerReset = () => {
    timerSound?.pause();
    timerSound.currentTime = 0;

    setTimerLabel('Start');

    setIsTimerRunning(false);

    setSeconds(timerSeconds);
    setAccumulativeSecond(0);

    setCircluarIndicator(initialCircularIndicator);
  };

  useEffect(() => {
    setTimerSound(new Audio(expiredSound));
  }, []);

  useEffect(() => {
    setSeconds(timerSeconds);
  }, [timerSeconds]);

  useEffect(() => {
    if (isTimerRunning) {
      const circluarIndicatorInterval = setInterval(() => {
        setAccumulativeSecond((prev) => prev + 0.01);

        setCircluarIndicator((prev) =>
          Math.max(prev - 691 / timerSeconds / 100, 64),
        );
      }, 10);

      return () => {
        clearInterval(circluarIndicatorInterval);
      };
    }
  }, [isTimerRunning, timerSeconds]);

  useEffect(() => {
    if (
      parseFloat(accumulativeSecond.toFixed(3)) % 1 === 0 &&
      accumulativeSecond !== 0
    ) {
      setSeconds(
        Math.max(timerSeconds - parseFloat(accumulativeSecond.toFixed(3)), 0),
      );
    }
  }, [accumulativeSecond, timerSeconds]);

  useEffect(() => {
    if (seconds === 0 && isTimerRunning) {
      timerSound.play();

      setTimerLabel('Start');
      setIsTimerRunning(false);
    }
  }, [isTimerRunning, seconds, timerSound]);

  return (
    <div className="mb-14 flex flex-col items-center">
      <div className="flex items-center justify-center">
        <svg className="h-[250px] w-[250px] -rotate-90 transform">
          <circle
            cx="125"
            cy="125"
            r="110"
            stroke="currentColor"
            strokeWidth="13"
            fill="transparent"
            className="text-gray-light"
          ></circle>
          <circle
            cx="125"
            cy="125"
            r="110"
            stroke="currentColor"
            strokeWidth="13"
            fill="transparent"
            className="text-purple"
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
            ${
              isTimerRunning && !isDanger
                ? 'text-gray-dark dark:text-white-pale'
                : ''
            }
            ${
              (!isTimerRunning && !isDanger) ||
              circluarIndicator === initialCircularIndicator
                ? 'text-gray-dark dark:text-white-pale'
                : ''
            }
            ${
              isDanger && circluarIndicator !== initialCircularIndicator
                ? 'text-red'
                : ''
            }
            ${!seconds && timerSeconds > 0 ? 'blink-hard' : ''}
            absolute
          `}
        >
          {minutesString}:{secondsString}
        </p>
      </div>
      <p className="mb-6 mt-4 max-w-sm text-center text-base text-gray-dark dark:text-white min-[475px]:text-lg">
        {"While your focus mode is on, make sure, you don't leave the app"}
      </p>
      <div className="flex w-full max-w-sm items-center justify-between gap-5">
        <div className="w-1/4">
          <Button
            label="Edit"
            onClick={() => onEdit()}
            disabled={accumulativeSecond > 0}
            outline="purple"
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
            disabled={isTimerRunning || accumulativeSecond === 0}
            outline="purple"
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;
