/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { useRouter } from 'next/navigation';

import { TaskType } from '@/types';
import { cn } from '@/utils/Cn';

import * as AllMdIcons from 'react-icons/md';
import * as AllIo5Icons from 'react-icons/io5';

import qs from 'query-string';

import Highlighter from 'react-highlight-words';

interface IncompletedTaskInterface {
  task: TaskType;
  deadlineStatus: 'late' | 'present' | 'future';
  onComplete: () => void;
  highligtTitleConfig: {
    searchWords: string[];
    textToHighlight: string;
  };
}

const IncompletedTask: React.FC<IncompletedTaskInterface> = ({
  task,
  deadlineStatus,
  onComplete,
  highligtTitleConfig,
}) => {
  const router = useRouter();

  const navigateToTask = () => {
    const input = window.location.pathname;
    const previousPage = input.match(/\/([^/]+)/)![1] || '';

    const query = {
      previousPage,
    };

    const url = qs.stringifyUrl(
      {
        url: `${window.location.origin}/tasks/${task.id}`,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  const { todayAt, category, priority } = task;

  const getTimeString = (time: number) => String(time).padStart(2, '0');

  const getTodayAtColor = () => {
    if (deadlineStatus === 'late') {
      return 'text-red';
    }
    if (deadlineStatus === 'present') {
      return 'text-orange-300';
    }

    return 'text-gray-200';
  };

  return (
    <div
      onClick={navigateToTask}
      className={cn(
        'relative flex cursor-pointer flex-wrap items-center gap-4 rounded-md bg-gray-light p-4 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600',
        { 'min-[500px]:pb-7': task.title.length > 20 },
      )}
    >
      <div
        className="group flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-white-pale bg-transparent min-[500px]:h-6 min-[500px]:w-6"
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
      >
        <div className="h-[6px] w-[6px] rounded-full bg-white-pale opacity-0 group-hover:opacity-100 max-[500px]:hidden min-[500px]:h-2 min-[500px]:w-2"></div>
      </div>
      <div>
        <Highlighter
          className="mb-[2px] text-base text-white-pale min-[500px]:mb-[6px] min-[500px]:text-xl"
          searchWords={highligtTitleConfig.searchWords}
          autoEscape={true}
          textToHighlight={highligtTitleConfig.textToHighlight}
        />
        <p className={cn('text-sm min-[500px]:text-base', getTodayAtColor())}>
          Today At:{' '}
          {`${getTimeString(
            new Date(todayAt).getHours() % 12 || 12,
          )}:${getTimeString(new Date(todayAt).getMinutes())} ${
            new Date(todayAt).getHours() >= 12 ? 'pm' : 'am'
          }`}
        </p>
      </div>
      <div className="flex gap-4 min-[500px]:absolute min-[500px]:bottom-1 min-[500px]:right-2">
        <div
          className="flex h-10 items-center gap-3 rounded-md px-3"
          style={{ backgroundColor: category.iconBgColor }}
        >
          {category.icon.includes('Md')
            ? AllMdIcons[category.icon as keyof typeof AllMdIcons]({
                color: category.iconColor,
                className: 'w-6 h-6 min-[500px]:w-8 min-[500px]:h-8',
              })
            : AllIo5Icons[category.icon as keyof typeof AllIo5Icons]({
                color: category.iconColor,
                className: 'w-6 h-6 min-[500px]:w-8 min-[500px]:h-8',
              })}
          <p className="text-sm text-white min-[500px]:text-base">
            {category.label}
          </p>
        </div>
        {
          <div className="flex h-10 items-center justify-center gap-1 rounded-lg border-2 border-purple-light px-3 py-2">
            <svg
              className="h-6 w-6 text-white-pale"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
            >
              <path
                d="M3.00415 13.7708C2.76498 13.7708 2.56665 13.5725 2.56665 13.3333V1.66663C2.56665 1.42746 2.76498 1.22913 3.00415 1.22913C3.24332 1.22913 3.44165 1.42746 3.44165 1.66663V13.3333C3.44165 13.5725 3.24332 13.7708 3.00415 13.7708Z"
                fill="currentColor"
              />
              <path
                d="M9.53749 10.2709H3.00415C2.76498 10.2709 2.56665 10.0725 2.56665 9.83337C2.56665 9.59421 2.76498 9.39587 3.00415 9.39587H9.53749C10.1733 9.39587 10.4708 9.22671 10.5292 9.08087C10.5875 8.93504 10.5 8.60837 10.045 8.15921L9.34499 7.45921C9.05915 7.20837 8.88415 6.82921 8.86665 6.40921C8.84915 5.96587 9.02415 5.52837 9.34499 5.20754L10.045 4.50754C10.4767 4.07587 10.6108 3.72587 10.5467 3.57421C10.4825 3.42254 10.15 3.27087 9.53749 3.27087H3.00415C2.75915 3.27087 2.56665 3.07254 2.56665 2.83337C2.56665 2.59421 2.76498 2.39587 3.00415 2.39587H9.53749C10.815 2.39587 11.2233 2.92671 11.3575 3.24171C11.4858 3.55671 11.5733 4.22171 10.6633 5.13171L9.96332 5.83171C9.81749 5.97754 9.73582 6.18171 9.74165 6.38587C9.74749 6.56087 9.81749 6.71837 9.93999 6.82921L10.6633 7.54671C11.5558 8.43921 11.4683 9.10421 11.34 9.42504C11.2058 9.73421 10.7917 10.2709 9.53749 10.2709Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-sm text-white-pale min-[500px]:text-base">
              {priority}
            </p>
          </div>
        }
      </div>
    </div>
  );
};

export default IncompletedTask;
