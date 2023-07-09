'use client';

import React from 'react';

import Image from 'next/image';

import Navbar from '@/components/Layout/Navbar/Navbar';
import Container from '@/components/UI/Container';

const page = () => (
  <div className="pb-48">
    <Container>
      <div className="flex items-center justify-between max-w-4xl mx-auto mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-[ffffff70] dark:text-white"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
            fill="currentColor"
            fillOpacity="0.87"
          />
          <path
            d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
            fill="currentColor"
            fillOpacity="0.87"
          />
          <path
            d="M14 17.75H10C9.59 17.75 9.25 17.41 9.25 17C9.25 16.59 9.59 16.25 10 16.25H14C14.41 16.25 14.75 16.59 14.75 17C14.75 17.41 14.41 17.75 14 17.75Z"
            fill="currentColor"
            fillOpacity="0.87"
          />
        </svg>
        <h6 className="text-xl min-[475px]:text-2xl text-[#3d3d3d] dark:text-[#ffffffdd]">
          Index
        </h6>
        <Image
          src="/images/home/demo_avatar.svg"
          className="w-11 min-[475px]:w-12"
          width={48}
          height={48}
          alt="Avatar"
        />
      </div>
      <div className="flex flex-col items-center justify-center mt-8 min-[475px]:mt-12 lg:mt-20">
        <Image
          src="/images/home/banner.svg"
          width={250}
          height={250}
          className="min-[475px]:w-80"
          alt="Banner"
        />
        <h6 className="text-[#3d3d3d] dark:text-[#ffffffdd] text-center text-[1.35rem] min-[475px]:text-2xl mb-2">
          What do you want to do today?
        </h6>
        <p className="text-[#3d3d3d] dark:text-[#ffffffdd] text-center text-[1.1rem] min-[475px]:text-xl">
          Tap + to add your tasks
        </p>
      </div>
    </Container>
    <Navbar />
  </div>
);

export default page;
