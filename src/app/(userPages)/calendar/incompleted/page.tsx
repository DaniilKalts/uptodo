/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import qs from 'query-string';

import { TaskType } from '@/types';
import useTasksStore from '@/store/useTasksStore';

import { AnimatePresence, motion } from 'framer-motion';

import { toast } from 'react-hot-toast';

import IncompletedTask from '@/components/userPages/Calendar/IncompletedTask';

import { Container, Select } from '@/components/UI';

const Incompleted = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const [currentSelect, setCurrentSelect] = useState<'time' | 'priority'>(
    searchParams.get('sortType') as 'time' | 'priority',
  );

  const timeOptions = ['By time (earliest)', 'By time (latest)'];
  const [timeSortValue, setTimeSortValue] = useState<string>(
    timeOptions.includes(searchParams.get('sortValue') as string)
      ? (searchParams.get('sortValue') as string)
      : timeOptions[0],
  );

  const priorityOptions = ['By priority (increase)', 'By priority (decrease)'];
  const [prioritySortValue, setPrioritySortValue] = useState<string>(
    priorityOptions.includes(searchParams.get('sortValue') as string)
      ? (searchParams.get('sortValue') as string)
      : priorityOptions[0],
  );

  const storeIncompletedTasks = useTasksStore(
    (state) => state.incompletedTasks,
  );
  const addCompletedTask = useTasksStore((state) => state.addCompletedTask);

  const [incompletedTasks, setIncompletedTasks] = useState<TaskType[]>([]);

  function isYesterdayOrBefore(date: Date) {
    const currentDate = new Date();

    if (
      !(
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
      )
    ) {
      return currentDate > date;
    }
  }

  const deadlineStatus = (task: TaskType) => {
    const myDate = new Date();

    if (isYesterdayOrBefore(new Date(task.todayAt))) {
      return 'late';
    }

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

  const loadingIndicator = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const sortByTime = () => {
    loadingIndicator();

    if (timeSortValue === timeOptions[0]) {
      setIncompletedTasks((prev) =>
        [...prev].sort((taskA, taskB) => taskA.todayAt - taskB.todayAt),
      );
    } else if (timeSortValue === timeOptions[1]) {
      setIncompletedTasks((prev) =>
        [...prev].sort((taskA, taskB) => taskB.todayAt - taskA.todayAt),
      );
    }
  };

  const sortByPriority = () => {
    loadingIndicator();

    if (prioritySortValue === priorityOptions[0]) {
      setIncompletedTasks((prev) =>
        [...prev].sort((taskA, taskB) => taskA.priority - taskB.priority),
      );
    } else if (prioritySortValue === priorityOptions[1]) {
      setIncompletedTasks((prev) =>
        [...prev].sort((taskA, taskB) => taskB.priority - taskA.priority),
      );
    }
  };

  function isMatchingDate(inputDate: Date) {
    const today = new Date(
      Number(searchParams.get('dateTime')) || new Date().getTime(),
    );

    return (
      inputDate.getDate() === today.getDate() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getFullYear() === today.getFullYear()
    );
  }

  const queryTimeParamsHandler = () => {
    if (currentSelect === 'time' && mounted) {
      const query = { sortType: 'time', sortValue: timeSortValue };
      const newRoute = window.location.href;

      const url = qs.stringifyUrl(
        {
          url: newRoute,
          query,
        },
        { skipNull: true },
      );

      router.push(url);
    }
  };

  const queryPriorityParamsHandler = () => {
    if (currentSelect === 'priority' && mounted) {
      const query = { sortType: 'priority', sortValue: prioritySortValue };
      const newRoute = window.location.href;

      const url = qs.stringifyUrl(
        {
          url: newRoute,
          query,
        },
        { skipNull: true },
      );

      router.push(url);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1500);
  }, []);

  useEffect(() => {
    const sortedTasks = storeIncompletedTasks.filter((incompletedTask) =>
      isMatchingDate(new Date(incompletedTask.todayAt)),
    );

    if (currentSelect === 'priority') {
      if (prioritySortValue === priorityOptions[0]) {
        sortedTasks.sort((taskA, taskB) => taskA.priority - taskB.priority);
      } else if (prioritySortValue === priorityOptions[1]) {
        sortedTasks.sort((taskA, taskB) => taskB.priority - taskA.priority);
      }
    }

    if (currentSelect === 'time') {
      if (timeSortValue === timeOptions[0]) {
        sortedTasks.sort((taskA, taskB) => taskA.todayAt - taskB.todayAt);
      } else if (timeSortValue === timeOptions[1]) {
        sortedTasks.sort((taskA, taskB) => taskB.todayAt - taskA.todayAt);
      }
    }

    setIncompletedTasks(sortedTasks);
  }, [storeIncompletedTasks, searchParams]);

  useEffect(() => {
    if (searchParams.get('sortType') === 'time' && !mounted) {
      return;
    }

    setCurrentSelect('priority');
    sortByPriority();

    queryPriorityParamsHandler();
  }, [prioritySortValue]);

  useEffect(() => {
    if (searchParams.get('sortType') === 'priority' && !mounted) {
      return;
    }

    setCurrentSelect('time');
    sortByTime();

    queryTimeParamsHandler();
  }, [timeSortValue]);

  useEffect(() => {
    if (currentSelect === 'priority') {
      queryPriorityParamsHandler();
    } else {
      queryTimeParamsHandler();
    }
  }, [currentSelect]);

  return (
    <Container>
      <div className="mx-auto flex flex-col items-center justify-center">
        {isLoading ? null : (
          <motion.main
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-7 flex w-full max-w-[575px] flex-col items-center"
          >
            {incompletedTasks.length && !isLoading ? (
              <>
                <section className="w-full min-[525px]:w-11/12 min-[575px]:w-10/12">
                  <div className="flex flex-wrap items-center gap-6 min-[600px]:flex-nowrap">
                    <div className="w-full min-[600px]:w-1/2">
                      <Select
                        value={timeSortValue}
                        setValue={setTimeSortValue}
                        options={timeOptions}
                        theme={currentSelect === 'time' ? 'purple' : 'gray'}
                      />
                    </div>
                    <div className="w-full min-[600px]:w-1/2">
                      <Select
                        value={prioritySortValue}
                        setValue={setPrioritySortValue}
                        options={priorityOptions}
                        theme={currentSelect === 'priority' ? 'purple' : 'gray'}
                      />
                    </div>
                  </div>
                </section>
                <span className="mt-7 h-[3px] w-full bg-white-pale min-[525px]:w-11/12 min-[575px]:w-10/12"></span>
                <section className="mt-7 flex w-full flex-col justify-center gap-6 min-[525px]:w-11/12 min-[575px]:w-10/12">
                  <AnimatePresence>
                    {incompletedTasks?.map((task) => (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        key={task.id}
                      >
                        <IncompletedTask
                          task={task}
                          deadlineStatus={
                            deadlineStatus(task) as
                              | 'late'
                              | 'present'
                              | 'future'
                          }
                          onComplete={() => {
                            addCompletedTask({
                              ...task,
                              completedAt: new Date().getTime(),
                            });
                            toast.success('Added to Completed!');
                          }}
                          highligtTitleConfig={{
                            searchWords: [],
                            textToHighlight: task.title,
                          }}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </section>
              </>
            ) : (
              <h3 className="text-center text-lg font-medium text-gray-dark dark:text-white-pale">
                You have no incompleted tasks for this day! &#128517;
              </h3>
            )}
          </motion.main>
        )}
      </div>
    </Container>
  );
};

export default Incompleted;
