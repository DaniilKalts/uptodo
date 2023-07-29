/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import useTasksStore from '@/store/useTasksStore';

import { IncompletedTaskInterface } from '@/types';

import IncompletedTask from '@/components/userPages/Calendar/IncompleteTask';

import Container from '@/components/UI/Container';
import { Select } from '@/components/UI';

const Incompleted = () => {
  const storeIncompletedTasks = useTasksStore(
    (state) => state.incompletedTasks,
  );
  const addCompletedTask = useTasksStore((state) => state.addCompletedTask);

  const [incompletedTasks, setIncompletedTasks] = useState<
    IncompletedTaskInterface[]
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
    setIncompletedTasks(storeIncompletedTasks);
  }, [storeIncompletedTasks]);

  const sortByTime = () => {};

  useEffect(() => {
    sortByTime();
  }, [timeSortValue]);

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
            {incompletedTasks.length ? (
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
            {incompletedTasks.length ? (
              incompletedTasks?.map((task, id) => (
                <IncompletedTask
                  title={task.title}
                  todayAt={task.todayAt}
                  category={task.category}
                  priority={task.priority}
                  onComplete={() =>
                    addCompletedTask({
                      ...task,
                      completedAt: new Date().getTime(),
                    })
                  }
                  key={id}
                />
              ))
            ) : (
              <h3 className="text-center text-lg text-gray-dark dark:text-white-pale">
                Good job, bro! <br /> You did all tasks for today! &#128293;
              </h3>
            )}
          </section>
        </motion.main>
      </div>
    </Container>
  );
};

export default Incompleted;
