/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useEffect, useState } from 'react';

import useTasksStore from '@/store/useTasksStore';
import { CompletedTaskInterface } from '@/types';

import CompletedTask from '@/components/userPages/Calendar/CompletedTask';
import Container from '@/components/UI/Container';

const Completed = () => {
  const storeCompletedTasks = useTasksStore((state) => state.completedTasks);
  const addIncompletedTask = useTasksStore((state) => state.addIncompletedTask);

  const [completedTasks, setCompletedTasks] = useState<
    CompletedTaskInterface[]
  >([]);

  useEffect(() => {
    setCompletedTasks(storeCompletedTasks);
  }, [storeCompletedTasks]);

  return (
    <Container>
      <div className="mx-auto flex flex-col items-center justify-center">
        <main className="flex w-full max-w-[575px] flex-col justify-start">
          <section className="mx-auto mt-7 flex w-full flex-col justify-center gap-6 min-[525px]:w-11/12 min-[575px]:w-10/12">
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
                Hey, you should set new tasks! <br /> And complete them!
                &#128394;
              </h3>
            )}
          </section>
        </main>
      </div>
    </Container>
  );
};

export default Completed;
