'use client';

import 'swiper/css';

import React from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/components/UI';
import Container from '@/components/UI/Container';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPathName = usePathname();

  return (
    <div className="pb-40">
      <header className="mx-auto mb-4 mt-8 flex items-center justify-center">
        <h4 className="text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
          Calendar
        </h4>
      </header>
      <section className="mx-auto max-w-xl bg-gray-700 py-3">
        <div className="flex items-center justify-between px-6">
          <svg
            className="h-6 w-6 cursor-pointer text-white-pale"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.06 2.21999C10.1867 2.21999 10.3134 2.26665 10.4134 2.36665C10.6067 2.55999 10.6067 2.87999 10.4134 3.07332L6.06668 7.41999C5.74668 7.73999 5.74668 8.25999 6.06668 8.57999L10.4133 12.9267C10.6067 13.12 10.6067 13.44 10.4133 13.6333C10.22 13.8267 9.90002 13.8267 9.70668 13.6333L5.36002 9.28665C5.02002 8.94665 4.82668 8.48665 4.82668 7.99999C4.82668 7.51332 5.01335 7.05332 5.36002 6.71332L9.70668 2.36665C9.80668 2.27332 9.93335 2.21999 10.06 2.21999Z"
              fill="currentColor"
            />
          </svg>
          <div className="flex flex-col items-center">
            <h4 className="text-base text-gray-dark dark:text-white-pale min-[475px]:text-lg">
              FEBRUARY
            </h4>
            <p className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-base">
              2022
            </p>
          </div>
          <svg
            className="h-6 w-6 cursor-pointer text-white-pale"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.93998 13.78C5.81331 13.78 5.68665 13.7333 5.58665 13.6333C5.39332 13.44 5.39332 13.12 5.58665 12.9267L9.93332 8.58001C10.2533 8.26001 10.2533 7.74001 9.93332 7.42001L5.58665 3.07335C5.39332 2.88001 5.39332 2.56001 5.58665 2.36668C5.77998 2.17335 6.09998 2.17335 6.29332 2.36668L10.64 6.71335C10.98 7.05335 11.1733 7.51335 11.1733 8.00001C11.1733 8.48668 10.9866 8.94668 10.64 9.28668L6.29331 13.6333C6.19331 13.7267 6.06665 13.78 5.93998 13.78Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <Swiper
          slidesPerView={4}
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
          {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((slide) => (
            <SwiperSlide key={slide}>
              <div
                className={`
                flex 
                cursor-pointer 
                flex-col 
                items-center 
                justify-center 
                rounded-md 
                ${
                  slide === 9 ? 'bg-purple' : 'bg-gray-800 hover:bg-black-light'
                }
                px-3
                py-2 
              `}
              >
                <h6
                  className={`
                    text-base
                    font-bold
                    min-[475px]:text-lg
                    ${slide === 6 || slide === 12 ? 'text-red' : ''}
                  `}
                >
                  SUN
                </h6>
                <h6 className="text-base font-bold min-[475px]:text-lg">
                  {slide}
                </h6>
                {(slide === 10 || slide === 12) && (
                  <div className="mt-1 h-[6px] w-[6px] rounded-full bg-purple"></div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <Container>
        <section className="mx-auto max-w-[575px]">
          <div className="mx-auto mt-7 flex w-full justify-center gap-4 rounded-md bg-gray-500 p-4 min-[475px]:gap-8 min-[525px]:w-11/12 min-[575px]:w-10/12">
            <Link href={'today'} className="w-full">
              {currentPathName.includes('today') ? (
                <Button label="Today" onClick={() => {}} filled />
              ) : (
                <Button label="Today" onClick={() => {}} outline="gray" />
              )}
            </Link>
            <Link href={'completed'} className="w-full">
              {currentPathName.includes('completed') ? (
                <Button label="Completed" onClick={() => {}} filled />
              ) : (
                <Button label="Completed" onClick={() => {}} outline="gray" />
              )}
            </Link>
          </div>
        </section>
      </Container>
      {children}
    </div>
  );
}
