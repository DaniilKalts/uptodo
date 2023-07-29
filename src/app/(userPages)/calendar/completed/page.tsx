/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import useTasksStore from '@/store/useTasksStore';

import { CompletedTaskInterface } from '@/types';

import CompletedTask from '@/components/userPages/Calendar/CompletedTask';

import Container from '@/components/UI/Container';
import { Select } from '@/components/UI';

const Completed = () => {
  const storeCompletedTasks = useTasksStore((state) => state.completedTasks);
  const addIncompletedTask = useTasksStore((state) => state.addIncompletedTask);

  const [completedTasks, setCompletedTasks] = useState<
    CompletedTaskInterface[]
  >([]);

  const [timeSortValue, setTimeSortValue] =
    useState<string>('By time (earliest)');
  const timeOptions = ['By time (earliest)', 'By time (latest)'];

  const [prioritySortValue, setPrioritySortValue] = useState<string>('Default');
  const priorityOptions = [
    'Default',
    'By priority (increase)',
    'By priority (decrease)',
  ];

  useEffect(() => {
    setCompletedTasks(storeCompletedTasks);
  }, [storeCompletedTasks]);

  const sortByTime = () => {};

  useEffect(() => {
    sortByTime();
  }, [timeSortValue]);

  useEffect(() => {
    setCompletedTasks(storeCompletedTasks);
  }, [storeCompletedTasks]);

  return (
    <Container>
      <div className="mx-auto flex flex-col items-center justify-center">
        <motion.main
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex w-full max-w-[575px] flex-col justify-start"
        >
          <section className="mx-auto mt-7 flex w-full flex-col justify-center gap-6 min-[525px]:w-11/12 min-[575px]:w-10/12">
            {completedTasks.length ? (
              <div className="flex flex-wrap items-center gap-6 min-[575px]:flex-nowrap">
                <div className="w-full min-[575px]:w-1/2">
                  <Select
                    value={timeSortValue}
                    setValue={setTimeSortValue}
                    options={timeOptions}
                    theme="purple"
                  />
                </div>
                <div className="w-full min-[575px]:w-1/2">
                  <Select
                    value={prioritySortValue}
                    setValue={setPrioritySortValue}
                    options={priorityOptions}
                    theme="gray"
                  />
                </div>
              </div>
            ) : (
              ''
            )}
            {completedTasks.length ? (
              completedTasks?.map((task, id) => (
                <CompletedTask
                  onIcomplete={() => addIncompletedTask({ ...task })}
                  key={id}
                  title={task.title}
                  completedAt={task.completedAt}
                />
              ))
            ) : (
              <h3 className="text-center text-lg text-gray-dark dark:text-white-pale">
                Hey! You should work on Incompleted Tasks! &#128513;
              </h3>
            )}
          </section>
        </motion.main>
      </div>
    </Container>
  );
};

export default Completed;
