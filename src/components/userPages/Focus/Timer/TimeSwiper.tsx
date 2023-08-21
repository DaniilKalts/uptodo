import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

interface TimerSwiperInterface {
  initialSlide: number;
  setTime: (timeOption: string) => void;
}

const TimeSwiper: React.FC<TimerSwiperInterface> = ({
  initialSlide,
  setTime,
}) => (
  <div id="swiper">
    <Swiper
      className="mySwiper"
      direction={'vertical'}
      speed={200}
      initialSlide={initialSlide}
      onSlideChange={(swiper) => setTime(['AM', 'PM'][swiper.realIndex])}
      pagination={{
        clickable: true,
      }}
      mousewheel={true}
      modules={[Mousewheel]}
      grabCursor
    >
      {['AM', 'PM'].map((timeValue) => (
        <SwiperSlide key={timeValue}>
          <p className="pointer-events-none absolute top-0 text-2xl text-gray-dark">
            {timeValue === 'PM' && 'AM'}
          </p>
          <p className="pointer-events-none text-4xl text-white-pale">
            {timeValue}
          </p>
          <p className="pointer-events-none absolute bottom-0 text-2xl text-gray-dark">
            {timeValue === 'AM' && 'PM'}
          </p>
          {/* <p className="pointer-events-none absolute top-0 text-2xl text-gray-dark">
            {timeValue - 1 >= 0
              ? String(timeValue - 1).padStart(2, '0')
              : maxValue}
          </p>
          <p className="pointer-events-none text-4xl text-white-pale">
            {String(timeValue).padStart(2, '0')}
          </p>
          <p className="pointer-events-none absolute bottom-0 text-2xl text-gray-dark">
            {timeValue === maxValue
              ? '00'
              : String(timeValue + 1).padStart(2, '0')}
          </p> */}
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default TimeSwiper;
