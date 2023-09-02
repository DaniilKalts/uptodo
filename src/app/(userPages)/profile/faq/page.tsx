/* eslint-disable react/no-unescaped-entities */

'use client';

import React from 'react';
import Image from 'next/image';

import { Container } from '@/components/UI';

import step3 from '../../../../../public/images/intro/step3.svg';

const Faq = () => (
  <Container>
    <section className="mx-auto max-w-screen-xl pb-28 pt-10 min-[475px]:pb-44 min-[475px]:pt-14">
      <h2 className="mb-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent min-[475px]:mb-8">
        Frequently asked questions
      </h2>
      <div className="mb-8 flex justify-center min-[475px]:hidden">
        <Image
          src={step3}
          width={226}
          height={226}
          alt="Management"
          className="mt-6"
          priority
        />
      </div>
      <div className="grid border-t border-gray-200 pt-8 text-left dark:border-gray-700 md:grid-cols-2 md:gap-16">
        <div>
          <div className="mb-10">
            <h3 className="mb-4 flex items-center text-lg font-bold text-gray-dark dark:text-white min-[475px]:text-2xl">
              <svg
                className="mr-2 h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              How do I create a task in UpTodo?
            </h3>
            <p className="text-sm text-gray-500 dark:text-white-pale min-[475px]:text-base">
              To create a task in UpTodo, simply click or tap the "Add Task"
              button, enter the task details such as title, description, due
              date, and any relevant tags, then save it. The task will be added
              to your task list.
            </p>
          </div>
          <div className="mb-10">
            <h3 className="mb-4 flex items-center text-lg font-bold text-gray-dark dark:text-white min-[475px]:text-2xl">
              <svg
                className="mr-2 h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              How do I organize my tasks in UpTodo?
            </h3>
            <p className="text-sm text-gray-500 dark:text-white-pale min-[475px]:text-base">
              UpTodo offers various organization features such as project
              folders, tags, and priority levels. You can assign tasks to
              specific folders, categorize them with tags, and set priority
              levels to ensure efficient organization.
            </p>
          </div>
          <div className="mb-10">
            <h3 className="mb-4 flex items-center text-lg font-bold text-gray-dark dark:text-white min-[475px]:text-2xl">
              <svg
                className="mr-2 h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Is it possible to share tasks with others in UpTodo?
            </h3>
            <p className="text-sm text-gray-500 dark:text-white-pale min-[475px]:text-base">
              Currently, UpTodo does not support direct task sharing with
              others. However, you can export task lists or share screenshots to
              collaborate on tasks with external parties.
            </p>
          </div>
          <div>
            <h3 className="mb-4 flex items-center text-lg font-bold text-gray-dark dark:text-white min-[475px]:text-2xl">
              <svg
                className="mr-2 h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Can I access UpTodo on different devices?
            </h3>
            <p className="text-sm text-gray-500 dark:text-white-pale min-[475px]:text-base">
              Yes, UpTodo is designed to be accessible across web browsers.
              Therefore, you can access wherever you want to.
            </p>
          </div>
        </div>
        <div>
          <div className="mb-10">
            <h3 className="mb-4 flex items-center text-lg font-bold text-gray-dark dark:text-white min-[475px]:text-2xl">
              <svg
                className="mr-2 h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              How can I mark a task as complete in UpTodo?
            </h3>
            <p className="text-sm text-gray-500 dark:text-white-pale min-[475px]:text-base">
              To mark a task as complete in UpTodo, simply locate the task in
              your task list and check the checkbox or use the designated
              completion button. The task will be visually indicated as
              completed.
            </p>
          </div>
          <div className="mb-10">
            <h3 className="mb-4 flex items-center text-lg font-bold text-gray-dark dark:text-white min-[475px]:text-2xl">
              <svg
                className="mr-2 h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Is there a way to set recurring tasks in UpTodo?
            </h3>
            <p className="text-sm text-gray-500 dark:text-white-pale min-[475px]:text-base">
              As of now, UpTodo does not have a built-in feature for setting
              recurring tasks. However, you can manually duplicate or recreate
              recurring tasks by setting new due dates when the previous
              instance is completed.
            </p>
          </div>
          <div className="mb-10">
            <h3 className="mb-4 flex items-center text-lg font-bold text-gray-dark dark:text-white min-[475px]:text-2xl">
              <svg
                className="mr-2 h-6 w-6 flex-shrink-0 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              How do I get in touch with UpTodo support for assistance?
            </h3>
            <p className="text-sm text-gray-500 dark:text-white-pale min-[475px]:text-base">
              If you need assistance or have questions about UpTodo, you can
              usually find a "Feedback" or "Help" section within the app or on
              the website. There, you'll find contact details, email support
              option to reach out for help.
            </p>
          </div>
        </div>
      </div>
    </section>
  </Container>
);

export default Faq;
