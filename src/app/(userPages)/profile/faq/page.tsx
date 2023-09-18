/* eslint-disable react/no-unescaped-entities */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Container } from '@/components/UI';

import step3 from '../../../../../public/images/intro/step3.svg';

const Faq = () => (
  <Container>
    <section className="mx-auto max-w-screen-xl pb-40 pt-10 min-[500px]:pb-44 min-[500px]:pt-14">
      <div className="mb-8 flex flex-col items-center justify-center max-[500px]:hidden">
        <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-purple-light">
          Frequently Asked Questions
        </h2>
        <Link href="/profile/feedback" className="font-medium hover:underline">
          Contact Us to ask your personal Questions!
        </Link>
      </div>
      <div className="mb-8 flex flex-col items-center justify-center min-[500px]:hidden">
        <Image src={step3} width={226} height={226} alt="Management" priority />
        <h5 className="mb-3 mt-6 text-center text-[22px] font-bold text-purple-light">
          Frequently Asked Questions
        </h5>
        <Link
          href="/profile/feedback"
          className="text-center text-base font-medium underline"
        >
          Contact Us to ask your personal Questions!
        </Link>
      </div>
      <div className="grid border-t border-gray-light pt-8 text-left dark:border-gray-600 md:grid-cols-2 md:gap-12">
        <div itemType="https://schema.org/FAQPage">
          <ul className="grid gap-6" data-list="faq">
            <li className="group" itemType="https://schema.org/Question">
              <input
                className="peer/option-1 hidden"
                type="checkbox"
                id="checkbox-option-1"
                name="checkbox-options"
              />
              <label
                className="relative block cursor-pointer rounded border border-gray-light p-4 pr-14 font-bold transition-all duration-150 ease-in-out peer-checked/option-1:bg-purple-dark peer-checked/option-1:text-white max-[500px]:text-sm peer-checked/option-1:[&>svg]:rotate-45"
                htmlFor="checkbox-option-1"
              >
                1.How do I create a task in UpTodo?
                <svg
                  className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.5L21 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 1.5L11 21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <div
                className="grid grid-rows-[0fr] transition-all duration-150 ease-in-out peer-checked/option-1:grid-rows-[1fr]"
                itemType="https://schema.org/Answer"
              >
                <div className="min-h-[0px] overflow-hidden">
                  <div className="mt-2 rounded border border-gray-light p-4 max-[500px]:text-sm">
                    To create a task in UpTodo, simply click or tap the "Add
                    Task" button, enter the task details such as title,
                    description, due date, and any relevant tags, then save it.
                    The task will be added to your task list.
                  </div>
                </div>
              </div>
            </li>
            <li className="group" itemType="https://schema.org/Question">
              <input
                className="peer/option-2 hidden"
                type="checkbox"
                id="checkbox-option-2"
                name="checkbox-options"
              />
              <label
                className="relative block cursor-pointer rounded border border-gray-light p-4 pr-14 font-bold transition-all duration-150 ease-in-out peer-checked/option-2:bg-purple-dark peer-checked/option-2:text-white max-[500px]:text-sm peer-checked/option-2:[&>svg]:rotate-45"
                htmlFor="checkbox-option-2"
              >
                2.How do I organize my tasks in UpTodo?
                <svg
                  className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.5L21 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 1.5L11 21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <div
                className="grid grid-rows-[0fr] transition-all duration-150 ease-in-out peer-checked/option-2:grid-rows-[1fr]"
                itemType="https://schema.org/Answer"
              >
                <div className="min-h-[0px] overflow-hidden">
                  <div className="mt-2 rounded border border-gray-light p-4 max-[500px]:text-sm">
                    UpTodo offers various organization features such as project
                    folders, tags, and priority levels. You can assign tasks to
                    specific folders, categorize them with tags, and set
                    priority levels to ensure efficient organization.
                  </div>
                </div>
              </div>
            </li>
            <li className="group" itemType="https://schema.org/Question">
              <input
                className="peer/option-3 hidden"
                type="checkbox"
                id="checkbox-option-3"
                name="checkbox-options"
              />
              <label
                className="relative block cursor-pointer rounded border border-gray-light p-4 pr-14 font-bold transition-all duration-150 ease-in-out peer-checked/option-3:bg-purple-dark peer-checked/option-3:text-white max-[500px]:text-sm peer-checked/option-3:[&>svg]:rotate-45"
                htmlFor="checkbox-option-3"
              >
                3.Is it possible to share tasks with others in UpTodo?
                <svg
                  className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.5L21 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 1.5L11 21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <div
                className="grid grid-rows-[0fr] transition-all duration-150 ease-in-out peer-checked/option-3:grid-rows-[1fr]"
                itemType="https://schema.org/Answer"
              >
                <div className="min-h-[0px] overflow-hidden">
                  <div className="mt-2 rounded border border-gray-light p-4 max-[500px]:text-sm">
                    Currently, UpTodo does not support direct task sharing with
                    others. However, you can export task lists or share
                    screenshots to collaborate on tasks with external parties.
                  </div>
                </div>
              </div>
            </li>
            <li className="group" itemType="https://schema.org/Question">
              <input
                className="peer/option-4 hidden"
                type="checkbox"
                id="checkbox-option-4"
                name="checkbox-options"
              />
              <label
                className="relative block cursor-pointer rounded border border-gray-light p-4 pr-14 font-bold transition-all duration-150 ease-in-out peer-checked/option-4:bg-purple-dark peer-checked/option-4:text-white max-[500px]:text-sm peer-checked/option-4:[&>svg]:rotate-45"
                htmlFor="checkbox-option-4"
              >
                4.Can I access UpTodo on different devices?
                <svg
                  className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.5L21 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 1.5L11 21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <div
                className="grid grid-rows-[0fr] transition-all duration-150 ease-in-out peer-checked/option-4:grid-rows-[1fr]"
                itemType="https://schema.org/Answer"
              >
                <div className="min-h-[0px] overflow-hidden">
                  <div className="mt-2 rounded border border-gray-light p-4 max-[500px]:text-sm">
                    Yes, UpTodo is designed to be accessible across web
                    browsers. Therefore, you are able to access it wherever you
                    want to.
                  </div>
                </div>
              </div>
            </li>
            <li className="group" itemType="https://schema.org/Question">
              <input
                className="peer/option-5 hidden"
                type="checkbox"
                id="checkbox-option-5"
                name="checkbox-options"
              />
              <label
                className="relative block cursor-pointer rounded border border-gray-light p-4 pr-14 font-bold transition-all duration-150 ease-in-out peer-checked/option-5:bg-purple-dark peer-checked/option-5:text-white max-[500px]:text-sm peer-checked/option-5:[&>svg]:rotate-45"
                htmlFor="checkbox-option-5"
              >
                5.How can I mark a task as complete in UpTodo?
                <svg
                  className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.5L21 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 1.5L11 21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <div
                className="grid grid-rows-[0fr] transition-all duration-150 ease-in-out peer-checked/option-5:grid-rows-[1fr]"
                itemType="https://schema.org/Answer"
              >
                <div className="min-h-[0px] overflow-hidden">
                  <div className="mt-2 rounded border border-gray-light p-4 max-[500px]:text-sm">
                    To mark a task as complete in UpTodo, simply locate the task
                    in your task list and check the checkbox or use the
                    designated completion button. The task will be visually
                    indicated as completed.
                  </div>
                </div>
              </div>
            </li>
            <li className="group" itemType="https://schema.org/Question">
              <input
                className="peer/option-6 hidden"
                type="checkbox"
                id="checkbox-option-6"
                name="checkbox-options"
              />
              <label
                className="relative block cursor-pointer rounded border border-gray-light p-4 pr-14 font-bold transition-all duration-150 ease-in-out peer-checked/option-6:bg-purple-dark peer-checked/option-6:text-white max-[500px]:text-sm peer-checked/option-6:[&>svg]:rotate-45"
                htmlFor="checkbox-option-6"
              >
                6.Is there a way to set recurring tasks in UpTodo?
                <svg
                  className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.5L21 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 1.5L11 21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <div
                className="grid grid-rows-[0fr] transition-all duration-150 ease-in-out peer-checked/option-6:grid-rows-[1fr]"
                itemType="https://schema.org/Answer"
              >
                <div className="min-h-[0px] overflow-hidden">
                  <div className="mt-2 rounded border border-gray-light p-4 max-[500px]:text-sm">
                    As of now, UpTodo does not have a built-in feature for
                    setting recurring tasks. However, you can manually duplicate
                    or recreate recurring tasks by setting new due dates when
                    the previous instance is completed.
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div itemType="https://schema.org/FAQPage">
          <ul className="grid gap-6" data-list="faq">
            <li className="group" itemType="https://schema.org/Question">
              <input
                className="peer/option-7 hidden"
                type="checkbox"
                id="checkbox-option-7"
                name="checkbox-options"
              />
              <label
                className="relative block cursor-pointer rounded border border-gray-light p-4 pr-14 font-bold transition-all duration-150 ease-in-out peer-checked/option-7:bg-purple-dark peer-checked/option-7:text-white max-[500px]:text-sm peer-checked/option-7:[&>svg]:rotate-45"
                htmlFor="checkbox-option-7"
              >
                7.How do I get in touch with UpTodo support for assistance?
                <svg
                  className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.5L21 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 1.5L11 21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <div
                className="grid grid-rows-[0fr] transition-all duration-150 ease-in-out peer-checked/option-7:grid-rows-[1fr]"
                itemType="https://schema.org/Answer"
              >
                <div className="min-h-[0px] overflow-hidden">
                  <div className="mt-2 rounded border border-gray-light p-4 max-[500px]:text-sm">
                    If you need assistance or have questions about UpTodo, you
                    can usually find a "Feedback" or "Help" section within the
                    app or on the website. There, you'll find contact details,
                    email support option to reach out for help.
                  </div>
                </div>
              </div>
            </li>
            <li className="group" itemType="https://schema.org/Question">
              <input
                className="peer/option-8 hidden"
                type="checkbox"
                id="checkbox-option-8"
                name="checkbox-options"
              />
              <label
                className="relative block cursor-pointer rounded border border-gray-light p-4 pr-14 font-bold transition-all duration-150 ease-in-out peer-checked/option-8:bg-purple-dark peer-checked/option-8:text-white max-[500px]:text-sm peer-checked/option-8:[&>svg]:rotate-45"
                htmlFor="checkbox-option-8"
              >
                8.How do I change my password in UpTodo?
                <svg
                  className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.5L21 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 1.5L11 21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <div
                className="grid grid-rows-[0fr] transition-all duration-150 ease-in-out peer-checked/option-8:grid-rows-[1fr]"
                itemType="https://schema.org/Answer"
              >
                <div className="min-h-[0px] overflow-hidden">
                  <div className="mt-2 rounded border border-gray-light p-4 max-[500px]:text-sm">
                    To change your password in UpTodo, go to the account
                    settings or profile section. There, you'll find an option to
                    change your password. Follow the prompts to update your
                    password securely.
                  </div>
                </div>
              </div>
            </li>
            <li className="group" itemType="https://schema.org/Question">
              <input
                className="peer/option-9 hidden"
                type="checkbox"
                id="checkbox-option-9"
                name="checkbox-options"
              />
              <label
                className="relative block cursor-pointer rounded border border-gray-light p-4 pr-14 font-bold transition-all duration-150 ease-in-out peer-checked/option-9:bg-purple-dark peer-checked/option-9:text-white max-[500px]:text-sm peer-checked/option-9:[&>svg]:rotate-45"
                htmlFor="checkbox-option-9"
              >
                9.What happens if I forget my UpTodo account password?
                <svg
                  className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.5L21 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 1.5L11 21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <div
                className="grid grid-rows-[0fr] transition-all duration-150 ease-in-out peer-checked/option-9:grid-rows-[1fr]"
                itemType="https://schema.org/Answer"
              >
                <div className="min-h-[0px] overflow-hidden">
                  <div className="mt-2 rounded border border-gray-light p-4 max-[500px]:text-sm">
                    If you forget your UpTodo password, you can check the
                    message, that must have come to your gmail before. Or just
                    contact us in "Help & Feedback" section.
                  </div>
                </div>
              </div>
            </li>
            <li className="group" itemType="https://schema.org/Question">
              <input
                className="peer/option-10 hidden"
                type="checkbox"
                id="checkbox-option-10"
                name="checkbox-options"
              />
              <label
                className="relative block cursor-pointer rounded border border-gray-light p-4 pr-14 font-bold transition-all duration-150 ease-in-out peer-checked/option-10:bg-purple-dark peer-checked/option-10:text-white max-[500px]:text-sm peer-checked/option-10:[&>svg]:rotate-45"
                htmlFor="checkbox-option-10"
              >
                10.Can I export my tasks from UpTodo to other apps?
                <svg
                  className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.5L21 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 1.5L11 21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <div
                className="grid grid-rows-[0fr] transition-all duration-150 ease-in-out peer-checked/option-10:grid-rows-[1fr]"
                itemType="https://schema.org/Answer"
              >
                <div className="min-h-[0px] overflow-hidden">
                  <div className="mt-2 rounded border border-gray-light p-4 max-[500px]:text-sm">
                    Yes, UpTodo allows you to export your task lists. You can
                    export tasks in one format, EXCEL, which can be used to
                    other task management goals.
                  </div>
                </div>
              </div>
            </li>
            <li className="group" itemType="https://schema.org/Question">
              <input
                className="peer/option-11 hidden"
                type="checkbox"
                id="checkbox-option-11"
                name="checkbox-options"
              />
              <label
                className="relative block cursor-pointer rounded border border-gray-light p-4 pr-14 font-bold transition-all duration-150 ease-in-out peer-checked/option-11:bg-purple-dark peer-checked/option-11:text-white max-[500px]:text-sm peer-checked/option-11:[&>svg]:rotate-45"
                htmlFor="checkbox-option-11"
              >
                11.Is there a limit to the number of tasks I can create in
                UpTodo?
                <svg
                  className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11.5L21 11.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 1.5L11 21.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </label>
              <div
                className="grid grid-rows-[0fr] transition-all duration-150 ease-in-out peer-checked/option-11:grid-rows-[1fr]"
                itemType="https://schema.org/Answer"
              >
                <div className="min-h-[0px] overflow-hidden">
                  <div className="mt-2 rounded border border-gray-light p-4 max-[500px]:text-sm">
                    UpTodo does not impose a strict limit on the number of tasks
                    you can create. However, the performance may be affected if
                    you have an excessively large number of tasks. It's
                    recommended to maintain an organized task list.
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </Container>
);

export default Faq;
