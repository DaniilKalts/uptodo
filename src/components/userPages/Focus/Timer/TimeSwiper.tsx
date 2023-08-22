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
          <p className="pointer-events-none absolute top-0 text-xl text-gray-dark min-[475px]:text-2xl">
            {timeValue === 'PM' && 'AM'}
          </p>
          <p className="pointer-events-none text-3xl text-white-pale min-[475px]:text-4xl">
            {timeValue}
          </p>
          <p className="pointer-events-none absolute bottom-0 text-xl text-gray-dark min-[475px]:text-2xl">
            {timeValue === 'AM' && 'PM'}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default TimeSwiper;
