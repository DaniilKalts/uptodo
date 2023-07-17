import React, { useEffect, useState } from 'react';

import TimerSwiper from '@/components/Timer/TimeSwiper';

import Modal from '../Modal';
import Button from '../Button';

interface TimerModalInterface {
  timerSeconds: number;
  isModal: boolean;
  onCancel: () => void;
  onSave: (seconds: number) => void;
}

const TimerModal: React.FC<TimerModalInterface> = ({
  timerSeconds,
  isModal,
  onCancel,
  onSave,
}) => {
  const [modalSeconds, setModalSeconds] = useState<number>(0);

  const [minutesSwiper, setMinutesSwiper] = useState<null | React.JSX.Element>(
    <TimerSwiper
      initialSlide={Math.floor(timerSeconds / 60)}
      setTime={(seconds: number) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        setModalSeconds((prev) => seconds * 60 + (prev % 60))
      }
    />,
  );

  const [secondsSwiper, setSecondsSwiper] = useState<null | React.JSX.Element>(
    <TimerSwiper
      initialSlide={timerSeconds % 60}
      setTime={(seconds: number) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        setModalSeconds((prev) => Math.floor(prev / 60) * 60 + seconds)
      }
    />,
  );

  useEffect(() => {
    setModalSeconds(timerSeconds);

    if (!isModal) {
      setMinutesSwiper(null);
      setSecondsSwiper(null);
    } else {
      setMinutesSwiper(
        <TimerSwiper
          initialSlide={Math.floor(timerSeconds / 60)}
          setTime={(seconds: number) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            setModalSeconds((prev) => seconds * 60 + (prev % 60))
          }
        />,
      );

      setSecondsSwiper(
        <TimerSwiper
          initialSlide={timerSeconds % 60}
          setTime={(seconds: number) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            setModalSeconds((prev) => Math.floor(prev / 60) * 60 + seconds)
          }
        />,
      );
    }
  }, [isModal]);

  return (
    <Modal
      isOpen={isModal}
      title="Choose time to focus"
      body={
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-[5.5rem] h-[5.5rem] relative font-bold bg-[#272727] flex flex-col justify-center items-center min-[475px]:w-24 min-[475px]:h-24">
            <p className="text-[#3d3d3d] dark:text-[#ffffffdd] absolute -top-6 min-[475px]:-top-7 min-[475px]:text-lg">
              Minutes
            </p>
            {minutesSwiper}
          </div>
          <p className="text-3xl text-[#3d3d3d] dark:text-[#ffffffdd]">:</p>
          <div className="w-[5.5rem] h-[5.5rem] relative font-bold bg-[#272727] flex flex-col justify-center items-center min-[475px]:w-24 min-[475px]:h-24">
            <p className="text-base text-[#3d3d3d] dark:text-[#ffffffdd] absolute -top-6 min-[475px]:-top-7 min-[475px]:text-lg">
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
    />
  );
};

export default TimerModal;
