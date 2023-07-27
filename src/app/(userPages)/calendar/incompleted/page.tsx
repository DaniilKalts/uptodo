'use client';

import React from 'react';

import useTasksStore from '@/store/useTasksStore';

import Container from '@/components/UI/Container';
import IncompletedTask from '@/components/Calendar/IncompleteTask';

const Incompleted = () => {
  const { incompletedTasks, addCompletedTask } = useTasksStore();

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
