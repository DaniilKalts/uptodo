'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import Container from '@/components/UI/Container';
import AvatarModal from '@/components/UI/Modals/AvatarModal';

const Home = () => {
  const [isAvatarModal, setIsAvatarModal] = useState<boolean>(false);

  const showAvatar = () => {
    setIsAvatarModal((prev) => !prev);
  };

  return (
    <div className="pb-48">
      <Container>
        {isAvatarModal && (
          <AvatarModal
            isOpen={isAvatarModal}
            onClose={() => setIsAvatarModal((prev) => !prev)}
            imageUrl={'/images/home/demo_avatar.svg'}
          />
        )}
        <header className="mx-auto mt-6 flex max-w-4xl items-center justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-dark dark:text-white-pale"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill="currentColor"
              d="M21 7.75H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75ZM18 12.75H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75ZM14 17.75h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75Z"
            />
          </svg>
          <h4 className="text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
            Index
          </h4>
          <Image
            src="/images/home/demo_avatar.svg"
            className="w-11 cursor-pointer min-[475px]:w-12"
            width={48}
            height={48}
            alt="Avatar"
            onClick={showAvatar}
          />
        </header>
        <main className="mt-8 flex flex-col items-center justify-center min-[475px]:mt-12 lg:mt-20">
          <Image
            src="/images/home/banner.svg"
            width={250}
            height={250}
            className="min-[475px]:w-80"
            alt="Banner"
          />
          <h6 className="mb-2 text-center text-[1.35rem] text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
            What do you want to do today?
          </h6>
          <p className="text-center text-[1.1rem] text-gray-dark dark:text-white-pale min-[475px]:text-xl">
            Tap + to add your tasks
          </p>
        </main>
      </Container>
    </div>
  );
};

export default Home;
