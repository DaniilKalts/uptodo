/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import useTasksStore from '@/store/useTasksStore';
import { TaskType } from '@/types';

import { useDebounce } from '@/hooks/useDebounce';

import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

import IncompletedTask from '@/components/userPages/Calendar/IncompletedTask';
import CompletedTask from '@/components/userPages/Calendar/CompletedTask';

import AvatarModal from '@/components/UI/Modals/AvatarModal';
import { Container } from '@/components/UI';

const Home = () => {
  const [isAvatarModal, setIsAvatarModal] = useState<boolean>(false);
  const showAvatar = () => {
    setIsAvatarModal((prev) => !prev);
  };

  const [mounted, setMounted] = useState(false);

  const [taskTitle, setTaskTitle] = useState<string>('');
  const debouncedValue = useDebounce<string>(taskTitle, 500);

  const storeIncompletedTasks = useTasksStore(
    (state) => state.incompletedTasks,
  );
  const storeCompletedTasks = useTasksStore((state) => state.completedTasks);

  const [incompletedTasks, setIncompletedTasks] = useState<TaskType[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);

  const addIncompletedTask = useTasksStore((state) => state.addIncompletedTask);
  const addCompletedTask = useTasksStore((state) => state.addCompletedTask);

  const deadlineStatus = (task: TaskType) => {
    const myDate = new Date();

    const sortedTasks = [...incompletedTasks].sort(
      (taskA, taskB) => taskA.todayAt - taskB.todayAt,
    );

    if (
      task ===
      sortedTasks.findLast(
        (incompletedTask) => incompletedTask.todayAt < myDate.getTime(),
      )
    ) {
      return 'present';
    }
    if (
      task.todayAt <
      sortedTasks.findLast(
        (incompletedTask) => incompletedTask.todayAt < myDate.getTime(),
      )?.todayAt!
    ) {
      return 'late';
    }

    return 'future';
  };

  useEffect(() => {
    const sortedTasks = storeIncompletedTasks
      .filter((task) => {
        const taskMidnightDate = new Date(task.todayAt);
        taskMidnightDate.setHours(0, 0, 0, 0);

        const todayMidnightDate = new Date();
        todayMidnightDate.setHours(0, 0, 0, 0);

        return taskMidnightDate.getTime() === todayMidnightDate.getTime();
      })
      .sort((taskA, taskB) => taskA.todayAt - taskB.todayAt);

    setIncompletedTasks(sortedTasks);
  }, [storeIncompletedTasks]);

  useEffect(() => {
    const sortedTasks = storeCompletedTasks
      .filter((task) => {
        const taskMidnightDate = new Date(task.todayAt);
        taskMidnightDate.setHours(0, 0, 0, 0);

        const todayMidnightDate = new Date();
        todayMidnightDate.setHours(0, 0, 0, 0);

        return taskMidnightDate.getTime() === todayMidnightDate.getTime();
      })
      .sort((taskA, taskB) => taskA.todayAt - taskB.todayAt);

    setCompletedTasks(sortedTasks);
  }, [storeCompletedTasks]);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1000);
  }, []);

  if (!mounted) {
    return (
      <div className="pb-36 min-[475px]:pb-40">
        <Container>
          {isAvatarModal && (
            <AvatarModal
              isOpen={isAvatarModal}
              onClose={() => setIsAvatarModal((prev) => !prev)}
              imageUrl={'/images/home/kalts_daniil2.jpg'}
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
              src="/images/home/kalts_daniil2.jpg"
              className="h-11 w-11 cursor-pointer rounded-full min-[475px]:h-14 min-[475px]:w-14"
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
  }

  return (
    <div className="pb-36 min-[475px]:pb-40">
      <Container>
        {isAvatarModal && (
          <AvatarModal
            isOpen={isAvatarModal}
            onClose={() => setIsAvatarModal((prev) => !prev)}
            imageUrl={'/images/home/kalts_daniil2.jpg'}
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
            src="/images/home/kalts_daniil2.jpg"
            className="h-11 w-11 cursor-pointer rounded-full min-[475px]:h-14 min-[475px]:w-14"
            width={48}
            height={48}
            alt="Avatar"
            onClick={showAvatar}
          />
        </header>
        {incompletedTasks.length || completedTasks.length ? (
          <main className="mx-auto mt-8 max-w-md min-[475px]:mt-12">
            <div className="relative mb-6">
              <svg
                className="absolute left-7 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 transform"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                  fill="#AFAFAF"
                />
                <path
                  d="M21.9999 22.7499C21.8099 22.7499 21.6199 22.6799 21.4699 22.5299L19.4699 20.5299C19.1799 20.2399 19.1799 19.7599 19.4699 19.4699C19.7599 19.1799 20.2399 19.1799 20.5299 19.4699L22.5299 21.4699C22.8199 21.7599 22.8199 22.2399 22.5299 22.5299C22.3799 22.6799 22.1899 22.7499 21.9999 22.7499Z"
                  fill="#AFAFAF"
                />
              </svg>

              <input
                onChange={(e) =>
                  setTaskTitle(
                    e.target.value.length <= 20 ? e.target.value : taskTitle,
                  )
                }
                value={taskTitle}
                className="text-lgtext-white-pale w-full rounded-lg border bg-black-light bg-transparent px-4 py-[10px] pl-14 text-black-light placeholder-gray-200 shadow-sm dark:text-white-pale min-[475px]:py-3 min-[475px]:text-xl"
                placeholder="Search for your task..."
                type="text"
              />
            </div>
            <hr className="my-4 h-[2px] w-full rounded border-0 bg-gray-dark" />
            <div
              className={
                'z-10 mb-6 mt-2 inline-flex items-center justify-between rounded-lg bg-gray-600 px-4 py-2.5 text-center text-base font-medium text-white-pale min-[475px]:text-lg'
              }
            >
              Incompleted Tasks:
            </div>
            {incompletedTasks.length ? (
              incompletedTasks?.map((task) => (
                <motion.div
                  className="mb-6"
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  key={task.id}
                >
                  <IncompletedTask
                    task={task}
                    deadlineStatus={
                      deadlineStatus(task) as 'late' | 'present' | 'future'
                    }
                    onComplete={() => {
                      addCompletedTask({
                        ...task,
                        completedAt: new Date().getTime(),
                      });
                      toast.success('Added to Completed!');
                    }}
                    highligtTitleConfig={{
                      searchWords: debouncedValue.split(' '),
                      textToHighlight: task.title,
                    }}
                  />
                </motion.div>
              ))
            ) : (
              <h1 className="mb-6 text-base text-gray-dark dark:text-white-pale min-[475px]:text-lg">
                You have no incompleted tasks for this day! &#128517;
              </h1>
            )}
            <div
              className={
                'z-10 mb-6 mt-2 inline-flex items-center justify-between rounded-lg bg-gray-600 px-4 py-2.5 text-center text-base font-medium text-white-pale min-[475px]:text-lg'
              }
            >
              Completed Tasks:
            </div>
            {completedTasks.length ? (
              completedTasks?.map((task) => (
                <motion.div
                  className="mb-6"
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  key={task.id}
                >
                  <CompletedTask
                    task={task}
                    onIncomplete={() => {
                      addIncompletedTask({ ...task, completedAt: 0 });
                      toast.success('Added to Incompleted!');
                    }}
                    highligtTitleConfig={{
                      searchWords: debouncedValue.split(' '),
                      textToHighlight: task.title,
                    }}
                  />
                </motion.div>
              ))
            ) : (
              <h1 className="mb-4 text-base text-gray-dark dark:text-white-pale min-[475px]:text-lg">
                There is no completed tasks yet. &#128517;
              </h1>
            )}
          </main>
        ) : (
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
        )}
      </Container>
    </div>
  );
};

export default Home;
