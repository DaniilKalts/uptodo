/* eslint-disable @next/next/no-img-element */
import React from 'react';

import Logo from '@/components/userPages/Intro/Logo';
import Container from '@/components/UI/Container';

const SupportUs = () => (
  <Container>
    <section className="mx-auto max-w-screen-xl pb-40 pt-10 min-[500px]:pb-48 min-[500px]:pt-14">
      <div className="mb-8 flex flex-col items-center justify-center min-[500px]:mb-12">
        <Logo />
        <h1 className="mb-6 mt-2 text-center text-2xl font-bold text-gray-dark dark:text-white-pale sm:text-3xl">
          Support <span className="text-purple">UpTodo</span> Team
        </h1>
        <hr className="mx-auto h-[2px] w-full max-w-xl rounded border-0 bg-gray-light" />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="pb-8 min-[500px]:pb-12">
          <h2 className="mb-3 flex gap-3 text-base font-medium text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
            🙏 Subscribe to my Profile in Github
          </h2>
          <a
            href="https://github.com/DaniilKalts"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-9 min-[500px]:mb-12"
          >
            <div className="border-2 border-gray-dark">
              <img
                src={'/images/screenshots/followme_dark.jpg'}
                className="w-full max-w-xl cursor-pointer"
                alt="followme_dark"
              />
            </div>
          </a>
        </div>
        <div className="mb-12">
          <h2 className="mb-3 flex gap-3 text-base font-medium text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
            🙏 Give me a Star on this project in Github
          </h2>
          <a
            href="https://github.com/DaniilKalts/uptodo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="border-2 border-gray-dark">
              <img
                src={'/images/screenshots/giveme_star.jpg'}
                className="w-full max-w-xl cursor-pointer"
                alt="followme_dark"
              />
            </div>
          </a>
        </div>
        <hr className="mx-auto h-[2px] w-full max-w-xl rounded border-0 bg-gray-light" />
        <h2 className="mt-8 max-w-lg text-center text-lg font-medium text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
          Tell your friends about <span className="text-purple">UpTodo</span> to
          make our community even bigger!
        </h2>
      </div>
    </section>
  </Container>
);

export default SupportUs;
