import React, { useState, useEffect } from 'react';

import TimerSwiper from '@/components/userPages/Focus/Timer/TimerSwiper';

import Modal from './Modal';
import Button from '../Button';

interface TimerModalInterface {
  isOpen: boolean;
  timerSeconds: number;
  onCancel: () => void;
  onSave: (seconds: number) => void;
}

const TimerModal: React.FC<TimerModalInterface> = ({
  isOpen,
  timerSeconds,
  onCancel,
  onSave,
}) => {
  const [modalSeconds, setModalSeconds] = useState<number>(0);

  const [minutesSwiper, setMinutesSwiper] = useState<null | React.JSX.Element>(
    <TimerSwiper
      initialSlide={Math.floor(timerSeconds / 60)}
      setTime={(seconds: number) =>
        setModalSeconds((prev) => seconds * 60 + (prev % 60))
      }
    />,
  );

  const [secondsSwiper, setSecondsSwiper] = useState<null | React.JSX.Element>(
    <TimerSwiper
      initialSlide={timerSeconds % 60}
      setTime={(seconds: number) =>
        setModalSeconds((prev) => Math.floor(prev / 60) * 60 + seconds)
      }
    />,
  );

  useEffect(() => {
    setModalSeconds(timerSeconds);

    if (!isOpen) {
      setMinutesSwiper(null);
      setSecondsSwiper(null);
    } else {
      setMinutesSwiper(
        <TimerSwiper
          initialSlide={Math.floor(timerSeconds / 60)}
          setTime={(seconds: number) =>
            setModalSeconds((prev) => seconds * 60 + (prev % 60))
          }
        />,
      );

      setSecondsSwiper(
        <TimerSwiper
          initialSlide={timerSeconds % 60}
          setTime={(seconds: number) =>
            setModalSeconds((prev) => Math.floor(prev / 60) * 60 + seconds)
          }
        />,
      );
    }
  }, [isOpen, timerSeconds]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Choose time to focus"
      body={
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="relative flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center bg-gray-800 font-bold min-[475px]:h-24 min-[475px]:w-24">
            <p className="absolute -top-6 text-white-pale min-[475px]:-top-7 min-[475px]:text-lg">
              Minutes
            </p>
            {minutesSwiper}
          </div>
          <p className="text-3xl text-gray-dark dark:text-white-pale">:</p>
          <div className="relative flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center bg-gray-800 font-bold min-[475px]:h-24 min-[475px]:w-24">
            <p className="absolute -top-6 text-base text-white-pale min-[475px]:-top-7 min-[475px]:text-lg">
              Seconds
            </p>
            {secondsSwiper}
          </div>
        </div>
      }
      footer={
        <div className="flex items-center gap-6">
          <Button label="Cancel" onClick={() => onCancel()} />
          <Button
            label="Save"
            onClick={() => onSave(modalSeconds)}
            disabled={modalSeconds === 0}
            filled
          />
        </div>
      }
      bgType="dark"
    />
  );
};

export default TimerModal;
