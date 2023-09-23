import React from 'react';

import { cn } from '@/utils/Cn';

interface FocusTaskInterface {
  IconStyles: string;
  bgIconColor: string;
  title: string;
  text: string;
}

const FocusTask: React.FC<FocusTaskInterface> = ({
  bgIconColor,
  title,
  text,
}) => {
  const getCategoryBgColor = () => {
    switch (bgIconColor) {
      case 'blue-light':
        return 'bg-blue-light';
      case 'mint-light':
        return 'bg-mint-light';
      case 'lemon-light':
        return 'bg-lemon-light';
      case 'lemon-chiffon':
        return 'bg-lemon-chiffon';
      case 'beige-light':
        return 'bg-beige-light';
      case 'cyan-light':
        return 'bg-cyan-light';
      case 'pink-light':
        return 'bg-pink-light';
      default:
        return '';
    }
  };

  return (
    <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-600 bg-gray-light px-5 py-4 dark:border-gray-700 dark:bg-gray-500">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <div
            className={cn('mr-5 flex justify-center p-1', getCategoryBgColor())}
          ></div>
          <div>
            <h6 className="mb-1 text-base text-white-pale min-[500px]:text-xl">
              {title}
            </h6>
            <p className="text-sm text-white-pale min-[500px]:text-lg">
              {text}
            </p>
          </div>
        </div>
        <div className="ml-4 h-full border-l-[2px] border-gray-300 py-3 min-[500px]:ml-6 min-[500px]:border-l-[3px]">
          <svg
            className="ml-4 h-7 w-7 cursor-pointer text-white-pale min-[500px]:h-8 min-[500px]:w-8"
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
    </div>
  );
};

export default FocusTask;
