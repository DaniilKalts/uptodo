import React from 'react';

import { TaskType } from '@/types';
import { useRouter } from 'next/navigation';

interface CompletedTaskInterface {
  task: TaskType;
  onIncomplete: () => void;
}

const CompletedTask: React.FC<CompletedTaskInterface> = ({
  task,
  onIncomplete,
}) => {
  const router = useRouter();

  const navigateToTask = () => {
    router.push(`/tasks/${task.id}`);
  };

  const getTimeString = (time: number) => String(time).padStart(2, '0');

  return (
    <div
      onClick={navigateToTask}
      className="relative flex cursor-pointer items-center justify-between gap-4 rounded-md bg-gray-700 p-4 hover:bg-gray-600"
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-white-pale bg-transparent min-[475px]:h-6 min-[475px]:w-6"
          onClick={(e) => {
            e.stopPropagation();
            onIncomplete();
          }}
        >
          <div className="h-[6px] w-[6px] rounded-full bg-white-pale min-[475px]:h-2 min-[475px]:w-2"></div>
        </div>
        <div>
          <h6 className="mb-[2px] text-base text-white-pale min-[475px]:mb-[6px] min-[475px]:text-xl">
            {task.title}
          </h6>
          <p className="text-sm text-gray-200 min-[475px]:text-base">
            Completed At:{' '}
            {`${getTimeString(
              new Date(task.completedAt).getHours() % 12 || 0,
            )}:${getTimeString(new Date(task.completedAt).getMinutes())} ${
              new Date(task.completedAt).getHours() >= 12 ? 'pm' : 'am'
            }`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletedTask;
