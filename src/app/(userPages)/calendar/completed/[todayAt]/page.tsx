/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useState, useEffect, CSSProperties } from 'react';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentSelect, setCurrentSelect] = useState<'time' | 'priority'>(
    'time',
  );

  const storeCompletedTasks = useTasksStore((state) => state.completedTasks);
  const addIncompletedTask = useTasksStore((state) => state.addIncompletedTask);

  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);

  const [timeSortValue, setTimeSortValue] =
    useState<string>('By time (earliest)');
  const timeOptions = ['By time (earliest)', 'By time (latest)'];

  const [prioritySortValue, setPrioritySortValue] = useState<string>(
    'By priority (increase)',
  );
  const priorityOptions = ['By priority (increase)', 'By priority (decrease)'];

  const storeTodayAtDate = useTasksStore((state) => state.todayAtDate);

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
    } else {
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

  useEffect(() => {
    if (timeOptions.includes(searchParams.get('sortType') as string)) {
      setCurrentSelect('time');
      setTimeSortValue(searchParams.get('sortType') as string);
    }

    if (priorityOptions.includes(searchParams.get('sortType') as string)) {
      setCurrentSelect('priority');
      setPrioritySortValue(searchParams.get('sortType') as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function isMatchingDate(inputDate: Date) {
    const today = new Date(storeTodayAtDate);

    return (
      inputDate.getDate() === today.getDate() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getFullYear() === today.getFullYear()
    );
  }

  useEffect(() => {
    const sortedTasks = storeCompletedTasks.filter((incompletedTask) =>
      isMatchingDate(new Date(incompletedTask.todayAt)),
    );
    setCompletedTasks(sortedTasks);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeCompletedTasks]);

  useEffect(() => {
    setCurrentSelect('priority');
    sortByPriority();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prioritySortValue]);

  useEffect(() => {
    setCurrentSelect('time');
    sortByTime();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSortValue]);

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
                Hey! You should work on Incompleted Tasks! &#128513;
              </h3>
            )}
          </motion.main>
        )}
      </div>
    </Container>
  );
};

export default Completed;
