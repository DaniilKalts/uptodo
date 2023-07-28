/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useEffect, useState } from 'react';

import useTasksStore from '@/store/useTasksStore';

import { IncompletedTaskInterface } from '@/types';

import IncompletedTask from '@/components/userPages/Calendar/IncompleteTask';
import Container from '@/components/UI/Container';

const Incompleted = () => {
  const storeIncompletedTasks = useTasksStore(
    (state) => state.incompletedTasks,
  );
  const addCompletedTask = useTasksStore((state) => state.addCompletedTask);

  const [incompletedTasks, setIncompletedTasks] = useState<
    IncompletedTaskInterface[]
  >([]);

  useEffect(() => {
    setIncompletedTasks(storeIncompletedTasks);
  }, [storeIncompletedTasks]);

  return (
    <Container>
      <div className="mx-auto flex flex-col items-center justify-center">
        <main className="flex w-full max-w-[575px] flex-col justify-start">
          <section className="mx-auto mt-7 flex w-full flex-col justify-center gap-6 min-[525px]:w-11/12 min-[575px]:w-10/12">
            {incompletedTasks.length ? (
              incompletedTasks?.map((task, id) => (
                <IncompletedTask
                  title={task.title}
                  deadline={task.deadline}
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
        </main>
      </div>
    </Container>
  );
};

export default Incompleted;
