/* eslint-disable react/no-unescaped-entities */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import Accordion from '@/components/UI/Accordion';
import { Container } from '@/components/UI';

import step3 from '../../../../../public/images/intro/step3.svg';

const Faq = () => {
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const FAQ = [
    {
      question: 'How do I create a task in UpTodo?',
      answer:
        'To create a task in UpTodo, simply click or tap the "Add Task" button, enter the task details such as title, description, due date, and any relevant tags, then save it. The task will be added to your task list.',
    },
    {
      question: 'How do I organize my tasks in UpTodo?',
      answer:
        'UpTodo offers various organization features such as project folders, tags, and priority levels. You can assign tasks to specific folders, categorize them with tags, and set priority levels to ensure efficient organization.',
    },
    {
      question: 'Is it possible to share tasks with others in UpTodo?',
      answer:
        'Currently, UpTodo does not support direct task sharing with others. However, you can export task lists or share screenshots to collaborate on tasks with external parties.',
    },
    {
      question: 'Can I access UpTodo on different devices?',
      answer:
        'Yes, UpTodo is designed to be accessible across web browsers. Therefore, you can access wherever you want to.',
    },
    {
      question: 'How can I mark a task as complete in UpTodo?',
      answer:
        'To mark a task as complete in UpTodo, simply locate the task in your task list and check the checkbox or use the designated completion button. The task will be visually indicated as completed.',
    },
    {
      question: 'Is there a way to set recurring tasks in UpTodo?',
      answer:
        'As of now, UpTodo does not have a built-in feature for setting recurring tasks. However, you can manually duplicate or recreate recurring tasks by setting new due dates when the previous instance is completed.',
    },
    {
      question: 'How do I get in touch with UpTodo support for assistance?',
      answer:
        'If you need assistance or have questions about UpTodo, you can usually find a "Feedback" or "Help" section within the app or on the website. There, you\'ll find contact details, email support option to reach out for help.',
    },
    {
      question: 'How do I change my password in UpTodo?',
      answer:
        "To change your password in UpTodo, go to the account settings or profile section. There, you'll find an option to change your password. Follow the prompts to update your password securely.",
    },
    {
      question: 'What happens if I forget my UpTodo account password?',
      answer:
        'If you forget your UpTodo password, you can check the message, that must have come to your gmail before. Or just contact us in "Help & Feedback" section.',
    },
    {
      question: 'Can I export my tasks from UpTodo to other apps?',
      answer:
        'Yes, UpTodo allows you to export your task lists. You can export tasks in one format, EXCEL, which can be used to other task management goals.',
    },
    {
      question:
        'Is there a limit to the number of tasks I can create in UpTodo?',
      answer:
        "UpTodo does not impose a strict limit on the number of tasks you can create. However, the performance may be affected if you have an excessively large number of tasks. It's recommended to maintain an organized task list.",
    },
  ];

  return (
    <Container>
      <section className="mx-auto max-w-screen-xl pb-40 pt-10 min-[500px]:pb-44 min-[500px]:pt-14">
        <h2 className="mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent max-[500px]:hidden">
          Frequently asked questions
        </h2>
        <div className="mb-8 flex flex-col items-center justify-center gap-6 min-[500px]:hidden">
          <Image
            src={step3}
            width={226}
            height={226}
            alt="Management"
            priority
          />
          <h5 className="text-center text-[22px] font-bold text-purple-light">
            Frequently asked questions
          </h5>
        </div>
        <div className="grid gap-6 border-t border-gray-200 pt-8 text-left dark:border-gray-700 md:grid-cols-2 md:gap-12">
          <div itemType="https://schema.org/FAQPage">
            <ul className="grid gap-6" data-list="faq">
              {FAQ.slice(0, Math.ceil(FAQ.length / 2)).map(
                ({ question, answer }, id) => (
                  <Accordion
                    key={id}
                    id={id + 1}
                    isOpen={currentQuestion === question}
                    question={question}
                    answer={answer}
                    onClick={() => {
                      setCurrentQuestion(question);
                    }}
                  />
                ),
              )}
            </ul>
          </div>
          <div itemType="https://schema.org/FAQPage">
            <ul className="grid gap-6" data-list="faq">
              {FAQ.slice(Math.ceil(FAQ.length / 2), FAQ.length).map(
                ({ question, answer }, id) => (
                  <Accordion
                    key={id}
                    id={id + Math.ceil(FAQ.length / 2) + 1}
                    isOpen={currentQuestion === question}
                    question={question}
                    answer={answer}
                    onClick={() => {
                      setCurrentQuestion(question);
                    }}
                  />
                ),
              )}
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Faq;
