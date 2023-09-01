/* eslint-disable react/no-unescaped-entities */

'use client';

import React from 'react';
import Image from 'next/image';

import { Container } from '@/components/UI';

import step1 from '../../../../../public/images/intro/step1.svg';
import step2 from '../../../../../public/images/intro/step2.svg';
import step3 from '../../../../../public/images/intro/step3.svg';

const About = () => (
  <Container>
    <div className="mx-auto mt-10 max-w-3xl pb-40 min-[475px]:mt-14 min-[475px]:pb-44">
      <h1 className="mb-6 bg-gradient-to-r from-purple-200 to-purple-700 bg-clip-text text-center text-4xl font-bold text-transparent">
        UpTodo Service
      </h1>
      <div className="grid-col mb-8 grid grid-cols-1 items-baseline gap-14 min-[575px]:grid-cols-2 min-[850px]:grid-cols-3 min-[850px]:gap-8">
        <div className="flex flex-col gap-6 max-[575px]:items-center">
          <Image
            src={step1}
            width={226}
            height={226}
            alt="Management"
            className="mt-2 min-[475px]:mt-6 min-[475px]:w-56 md:w-48"
            priority
          />
          <h5 className="text-2xl font-bold text-purple-light">
            Manage your tasks
          </h5>
        </div>
        <div className="flex flex-col gap-6 max-[850px]:items-center max-[575px]:hidden">
          <Image
            src={step2}
            width={226}
            height={226}
            alt="Management"
            className="mt-6 min-[475px]:w-56 md:w-52"
            priority
          />
          <h5 className="text-2xl font-bold text-purple-light">
            Create daily routine
          </h5>
        </div>
        <div className="flex flex-col gap-6 max-[850px]:hidden">
          <Image
            src={step3}
            width={226}
            height={226}
            alt="Management"
            className="mt-6 min-[475px]:w-56 md:w-52"
            priority
          />
          <h5 className="text-2xl font-bold text-purple-light">
            Orgonaize your tasks
          </h5>
        </div>
      </div>
      <div className="mb-6 grid border-t border-gray-200 pt-8">
        <h2 className="mb-6 text-xl font-bold text-gray-dark dark:text-white min-[475px]:text-3xl">
          Our Vision:
        </h2>
        <p className="mb-4 text-sm font-medium text-gray-500 dark:text-white-pale min-[475px]:text-lg">
          At UpTodo, people typically join to effortlessly manage tasks. Our
          platform offers simplified task organization, setting deadlines, and
          tracking progress. Just like sharing a slice of pizza, we start by
          introducing you to the basics.
        </p>
        <p className="mb-4 text-sm font-medium text-gray-500 dark:text-white-pale min-[475px]:text-lg">
          However, UpTodo means more than task management. It's a venture that
          fuels our passion, motivating us to wake up each day with excitement
          to keep pushing forward.
        </p>
        <p className="mb-2 text-sm font-medium text-gray-500 dark:text-white-pale min-[475px]:text-lg">
          What's our drive? Let us reveal that to you.
        </p>
      </div>
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-dark dark:text-white min-[475px]:text-3xl">
          Unleash Your Potential with UpTodo!
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl bg-gray-500 p-5 dark:bg-black-light min-[475px]:p-7">
            <h3 className="mb-1 text-lg font-bold text-purple min-[475px]:text-2xl">
              Empower Task Mastery
            </h3>
            <p className="text-sm font-medium text-white-pale min-[475px]:text-lg">
              UpTodo empowers you with an intuitive platform to seamlessly
              manage tasks, amplifying your control over goals and fostering
              achievement.
            </p>
          </div>
          <div className="rounded-2xl bg-gray-500 p-5 dark:bg-black-light min-[475px]:p-7">
            <h3 className="mb-1 text-lg font-bold text-purple min-[475px]:text-2xl">
              Boost Your Efficiency
            </h3>
            <p className="text-sm font-medium text-white-pale min-[475px]:text-lg">
              Elevate productivity through UpTodo's streamlined features.
              Prioritize tasks, set reminders, and track progress effortlessly,
              igniting a drive for success.
            </p>
          </div>
          <div className="rounded-2xl bg-gray-500 p-5 dark:bg-black-light min-[475px]:p-7">
            <h3 className="mb-1 text-lg font-bold text-purple min-[475px]:text-2xl">
              Fuel Creative Spark
            </h3>
            <p className="text-sm font-medium text-white-pale min-[475px]:text-lg">
              Beyond task management, UpTodo nurtures creativity. It transforms
              routine tasks into inspiring projects, fostering innovative
              thinking and originality.
            </p>
          </div>
          <div className="rounded-2xl bg-gray-500 p-5 dark:bg-black-light min-[475px]:p-7">
            <h3 className="mb-1 text-lg font-bold text-purple min-[475px]:text-2xl">
              Partner in Success
            </h3>
            <p className="text-sm font-medium text-white-pale min-[475px]:text-lg">
              With UpTodo's insights and personalized support, navigate tasks
              and milestones confidently, forging a path to success with a
              dedicated ally.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default About;
