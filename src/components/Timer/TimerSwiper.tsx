import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface TimerSwiperInterface {
  initialSlide: number;
  setTime: (seconds: number) => void;
}

const TimerSwiper: React.FC<TimerSwiperInterface> = ({
  initialSlide,
  setTime,
}) => (
  <div id="swiper">
    <Swiper
      className="mySwiper"
      direction={'vertical'}
      pagination={{
        clickable: true,
      }}
      speed={200}
      loop={true}
      mousewheel={true}
      modules={[Mousewheel]}
      grabCursor
      initialSlide={initialSlide}
      onSlideChange={(swiper) => setTime(swiper.realIndex)}
    >
      {Array.from({ length: 60 }, (_, index) => index).map((minute) => (
        <SwiperSlide key={minute}>
          {minute - 1 >= 0 && (
            <p className="pointer-events-none absolute top-0 text-2xl text-[#ffffff1a]">
              {String(minute - 1).padStart(2, '0')}
            </p>
          )}
          <p className="pointer-events-none text-4xl text-[#3d3d3d] dark:text-[#ffffffdd]">
            {String(minute).padStart(2, '0')}
          </p>
          <p className="pointer-events-none absolute bottom-0 text-2xl text-[#ffffff1a]">
            {minute + 1 >= 60 ? '00' : String(minute + 1).padStart(2, '0')}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default TimerSwiper;
