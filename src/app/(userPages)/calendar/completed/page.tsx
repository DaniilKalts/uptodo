/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useState, useEffect, CSSProperties } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import qs from 'query-string';

import { TaskType } from '@/types';
import useTasksStore from '@/store/useTasksStore';

import { AnimatePresence, motion } from 'framer-motion';

import { PuffLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';

import CompletedTask from '@/components/userPages/Calendar/CompletedTask';

import Container from '@/components/UI/Container';
import { Select } from '@/components/UI';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
  marginTop: '28px',
};

const Completed = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  const [currentSelect, setCurrentSelect] = useState<'time' | 'priority'>(
    'time',
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

  const storeCompletedTasks = useTasksStore((state) => state.completedTasks);
  const addIncompletedTask = useTasksStore((state) => state.addIncompletedTask);

  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);

  const loadingIndicator = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const sortByTime = () => {
    loadingIndicator();

    if (timeSortValue === timeOptions[0]) {
      setCompletedTasks((prev) =>
        [...prev].sort(
          (taskA, taskB) => taskA.completedAt! - taskB.completedAt!,
        ),
      );
    } else if (timeSortValue === timeOptions[1]) {
      setCompletedTasks((prev) =>
        [...prev].sort(
          (taskA, taskB) => taskB.completedAt! - taskA.completedAt!,
        ),
      );
    }
  };

  const sortByPriority = () => {
    loadingIndicator();

    if (prioritySortValue === priorityOptions[0]) {
      setCompletedTasks((prev) =>
        [...prev].sort((taskA, taskB) => taskA.priority - taskB.priority),
      );
    } else if (prioritySortValue === priorityOptions[1]) {
      setCompletedTasks((prev) =>
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
    const sortedTasks = storeCompletedTasks.filter((completedTask) =>
      isMatchingDate(new Date(completedTask.todayAt)),
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
        sortedTasks.sort(
          (taskA, taskB) => taskA.completedAt - taskB.completedAt,
        );
      } else if (timeSortValue === timeOptions[1]) {
        sortedTasks.sort(
          (taskA, taskB) => taskB.completedAt - taskA.completedAt,
        );
      }
    }

    setCompletedTasks(sortedTasks);
  }, [storeCompletedTasks, searchParams]);

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
        {isLoading ? (
          <PuffLoader
            color={'#8875FF'}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <motion.main
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-7 flex w-full max-w-[575px] flex-col items-center"
          >
            {completedTasks.length ? (
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
                    {completedTasks?.map((task) => (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        key={task.id}
                      >
                        <CompletedTask
                          task={task}
                          onIcomplete={() => {
                            addIncompletedTask({ ...task });
                            toast.success('Added to Incompleted!');
                          }}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </section>
              </>
            ) : (
              <h3 className="text-center text-lg text-gray-dark dark:text-white-pale">
                There is no completed tasks yet. &#128528;
              </h3>
            )}
          </motion.main>
        )}
      </div>
    </Container>
  );
};

export default Completed;
