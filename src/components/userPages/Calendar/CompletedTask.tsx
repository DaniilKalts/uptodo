import React from 'react';

import { TaskType } from '@/types';

interface CompletedTaskInterface {
  task: TaskType;
  onIcomplete: () => void;
}

const CompletedTask: React.FC<CompletedTaskInterface> = ({
  task,
  onIcomplete,
}) => {
  const getTimeString = (time: number) => String(time).padStart(2, '0');

  return (
    <div className="relative flex cursor-pointer items-center justify-between gap-4 rounded-md bg-gray-700 p-4 hover:bg-gray-600">
      <div className="flex items-center gap-4">
        <div
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-white-pale bg-transparent min-[475px]:h-6 min-[475px]:w-6"
          onClick={() => onIcomplete()}
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
      <div className="ml-4 h-full border-l-[2px] border-gray-300 py-3 min-[475px]:ml-6 min-[475px]:border-l-[3px]">
        <svg
          className="ml-4 h-7 w-7 cursor-pointer text-white-pale min-[475px]:h-8 min-[475px]:w-8"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
            fill="currentColor"
          />
          <path
            d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75Z"
            fill="currentColor"
          />
          <path
            d="M12 16.9999C11.87 16.9999 11.74 16.9699 11.62 16.9199C11.5 16.8699 11.39 16.7999 11.29 16.7099C11.2 16.6099 11.13 16.5099 11.08 16.3799C11.03 16.2599 11 16.1299 11 15.9999C11 15.8699 11.03 15.7399 11.08 15.6199C11.13 15.4999 11.2 15.3899 11.29 15.2899C11.39 15.1999 11.5 15.1299 11.62 15.0799C11.86 14.9799 12.14 14.9799 12.38 15.0799C12.5 15.1299 12.61 15.1999 12.71 15.2899C12.8 15.3899 12.87 15.4999 12.92 15.6199C12.97 15.7399 13 15.8699 13 15.9999C13 16.1299 12.97 16.2599 12.92 16.3799C12.87 16.5099 12.8 16.6099 12.71 16.7099C12.61 16.7999 12.5 16.8699 12.38 16.9199C12.26 16.9699 12.13 16.9999 12 16.9999Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default CompletedTask;
