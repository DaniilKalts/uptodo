import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

interface TimerSwiperInterface {
  minValue: number;
  maxValue: number;
  initialSlide: number;
  setTime: (time: number) => void;
}

const TimerSwiper: React.FC<TimerSwiperInterface> = ({
  minValue,
  maxValue,
  initialSlide,
  setTime,
}) => (
  <div id="swiper">
    <Swiper
      className="mySwiper"
      direction={'vertical'}
      speed={200}
      loop={true}
      initialSlide={initialSlide}
      onSlideChange={(swiper) => {
        setTime(swiper.realIndex + minValue);
      }}
      pagination={{
        clickable: true,
      }}
      mousewheel={true}
      modules={[Mousewheel]}
      grabCursor
    >
      {Array.from(
        { length: minValue === 0 ? maxValue + 1 : maxValue },
        (_, index) => index + minValue,
      ).map((timeValue) => (
        <SwiperSlide key={timeValue}>
          <p className="pointer-events-none absolute top-0 text-2xl text-gray-dark">
            {String(timeValue === minValue ? maxValue : timeValue - 1).padStart(
              2,
              '0',
            )}
          </p>
          <p className="pointer-events-none text-4xl text-white-pale">
            {String(timeValue).padStart(2, '0')}
          </p>
          <p className="pointer-events-none absolute bottom-0 text-2xl text-gray-dark">
            {String(timeValue === maxValue ? minValue : timeValue + 1).padStart(
              2,
              '0',
            )}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default TimerSwiper;
