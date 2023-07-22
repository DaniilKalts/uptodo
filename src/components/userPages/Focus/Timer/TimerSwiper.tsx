import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

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
      speed={200}
      loop={true}
      initialSlide={initialSlide}
      onSlideChange={(swiper) => setTime(swiper.realIndex)}
      pagination={{
        clickable: true,
      }}
      mousewheel={true}
      modules={[Mousewheel]}
      grabCursor
    >
      {Array.from({ length: 60 }, (_, index) => index).map((minute) => (
        <SwiperSlide key={minute}>
          <p className="pointer-events-none absolute top-0 text-2xl text-[#ffffff1a]">
            {minute - 1 >= 0 ? String(minute - 1).padStart(2, '0') : '59'}
          </p>
          <p className="pointer-events-none text-4xl text-[#ffffffdd]">
            {String(minute).padStart(2, '0')}
          </p>
          <p className="pointer-events-none absolute bottom-0 text-2xl text-[#ffffff1a]">
            {minute + 1 === 60 ? '00' : String(minute + 1).padStart(2, '0')}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default TimerSwiper;
