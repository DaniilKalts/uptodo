import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import useTasksStore from '@/store/useTasksStore';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

type DayType = {
  day: number;
  month: number;
  year: number;
  dayOfWeek: string;
};

const Calendar = () => {
  const router = useRouter();

  const [daysInRange, setDaysInRange] = useState<DayType[]>([]);

  const storeTodayAtDate = useTasksStore((state) => state.todayAtDate);
  const storeSetTodayAtDate = useTasksStore((state) => state.setTodayAt);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const swiperRef = React.useRef(null);

  function getDaysInRange() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const daysArray = [];
    const daysOfWeekAbbreviated = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];

    for (let dayOffset = 0; dayOffset <= 364; dayOffset += 1) {
      const date = new Date(year, month, currentDay + dayOffset);
      const dayOfWeekAbbreviated = daysOfWeekAbbreviated[date.getDay()];

      daysArray.push({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        dayOfWeek: dayOfWeekAbbreviated,
      });
    }

    return daysArray as DayType[];
  }

  const prevSlideHandler = () => {
    const index = (swiperRef.current as any).swiper.realIndex;
    const realIndex = index > 0 ? index - 1 : 0;

    (swiperRef.current as any).swiper.navigation.prevEl.click();

    setCurrentMonth(daysInRange[realIndex].month);
    setCurrentYear(daysInRange[realIndex].year);
  };

  const nextSlideHandler = () => {
    const realIndex = (swiperRef.current as any).swiper.realIndex + 1;

    (swiperRef.current as any).swiper.navigation.nextEl.click();

    setCurrentMonth(daysInRange[realIndex].month);
    setCurrentYear(daysInRange[realIndex].year);
  };

  const getDateBgColor = (date: DayType) => {
    if (
      date.day === new Date(storeTodayAtDate).getDate() &&
      date.month === new Date(storeTodayAtDate).getMonth()
    ) {
      if (date.dayOfWeek === 'Sat' || date.dayOfWeek === 'Sun') {
        return 'bg-red';
      }
      return 'bg-purple';
    }

    return 'bg-gray-800 hover:bg-black-light';
  };

  const getDayOfWeekColor = (day: number, dayOfWeek: string) => {
    if (day === new Date(storeTodayAtDate).getDate()) {
      return 'text-white';
    }
    if (dayOfWeek === 'Sat' || dayOfWeek === 'Sun') {
      return 'text-red';
    }

    return 'text-white';
  };

  useEffect(() => {
    const days = getDaysInRange();

    setDaysInRange(days as []);
  }, []);

  return (
    <section className="mx-auto max-w-xl bg-gray-700 py-3">
      <div className="flex items-center justify-between px-6">
        <svg
          className="h-6 w-6 cursor-pointer text-white-pale hover:text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          onClick={prevSlideHandler}
        >
          <path
            d="M10.06 2.21999C10.1867 2.21999 10.3134 2.26665 10.4134 2.36665C10.6067 2.55999 10.6067 2.87999 10.4134 3.07332L6.06668 7.41999C5.74668 7.73999 5.74668 8.25999 6.06668 8.57999L10.4133 12.9267C10.6067 13.12 10.6067 13.44 10.4133 13.6333C10.22 13.8267 9.90002 13.8267 9.70668 13.6333L5.36002 9.28665C5.02002 8.94665 4.82668 8.48665 4.82668 7.99999C4.82668 7.51332 5.01335 7.05332 5.36002 6.71332L9.70668 2.36665C9.80668 2.27332 9.93335 2.21999 10.06 2.21999Z"
            fill="currentColor"
          />
        </svg>
        <div className="flex flex-col items-center">
          <h4 className="text-base text-gray-dark dark:text-white-pale min-[475px]:text-lg">
            {new Date(2020, currentMonth)
              .toLocaleString('en-US', { month: 'long' })
              .toUpperCase()}
          </h4>
          <p className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-base">
            {currentYear}
          </p>
        </div>
        <svg
          className="h-6 w-6 cursor-pointer text-white-pale hover:text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          onClick={nextSlideHandler}
        >
          <path
            d="M5.93998 13.78C5.81331 13.78 5.68665 13.7333 5.58665 13.6333C5.39332 13.44 5.39332 13.12 5.58665 12.9267L9.93332 8.58001C10.2533 8.26001 10.2533 7.74001 9.93332 7.42001L5.58665 3.07335C5.39332 2.88001 5.39332 2.56001 5.58665 2.36668C5.77998 2.17335 6.09998 2.17335 6.29332 2.36668L10.64 6.71335C10.98 7.05335 11.1733 7.51335 11.1733 8.00001C11.1733 8.48668 10.9866 8.94668 10.64 9.28668L6.29331 13.6333C6.19331 13.7267 6.06665 13.78 5.93998 13.78Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <Swiper
        ref={swiperRef}
        navigation={true}
        modules={[Navigation]}
        slidesPerView={4}
        grabCursor={true}
        initialSlide={0}
        onSlideChange={() => {
          const index = (swiperRef.current as any).swiper.realIndex + 1;
          const realIndex = index > 0 ? index - 1 : 0;

          setCurrentMonth(daysInRange[realIndex].month);
          setCurrentYear(daysInRange[realIndex].year);
        }}
        breakpoints={{
          340: {
            slidesPerView: 5,
          },
          425: {
            slidesPerView: 6,
          },
          525: {
            slidesPerView: 7,
          },
        }}
        className="mySwiper mt-3"
      >
        {daysInRange.map((date, id) => (
          <SwiperSlide
            key={id}
            onClick={() => {
              storeSetTodayAtDate(
                new Date(date.year, date.month, date.day).getTime(),
              );

              router.push(
                `${new Date(date.year, date.month, date.day).getTime()}`,
              );
            }}
            className="px-[10px]"
          >
            <div
              className={`
                flex
                w-full 
                cursor-pointer 
                flex-col 
                items-center 
                justify-center 
                rounded-md 
                ${getDateBgColor(date)}
                px-3 
                py-2
              `}
            >
              <h6
                className={`
                    text-base
                    font-bold
                    uppercase
                    min-[475px]:text-lg
                    ${getDayOfWeekColor(date.day, date.dayOfWeek)}
                  `}
              >
                {date.dayOfWeek}
              </h6>
              <h6 className="text-base font-bold text-white min-[475px]:text-lg">
                {date.day}
              </h6>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Calendar;
