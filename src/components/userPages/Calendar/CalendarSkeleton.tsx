import React from 'react';

const CalendarSkeleton = () => (
  <div className="mx-auto mt-3 flex max-w-[575px] animate-pulse flex-col items-center gap-6">
    <div className="mt-7 flex w-full flex-col items-center justify-center">
      <div className="rounded-40 mx-auto mb-4 h-6 w-24 bg-gray-200 dark:bg-gray-800"></div>
      <div className="rounded-40 mx-auto h-[168px] w-full overflow-hidden bg-gray-200 py-4 dark:bg-gray-800">
        <div className="flex items-center justify-between px-6">
          <div className="rounded-40 h-5 w-5 bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex flex-col items-center">
            <div className="rounded-40 mb-2 h-5 w-32 bg-gray-200 dark:bg-gray-700"></div>
            <div className="rounded-40 h-5 w-20 bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="rounded-40 h-5 w-5 bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-5 px-3 min-[360px]:grid-cols-5 min-[475px]:grid-cols-6 min-[575px]:grid-cols-7">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <div
              key={n}
              className="flex h-[70px] w-full flex-col items-center justify-center gap-3 rounded-md bg-gray-200 px-3 py-2 dark:bg-gray-700"
            >
              <div className="rounded-40 h-5 w-full bg-gray-200 dark:bg-gray-800"></div>
              <div className="rounded-40 h-3 w-3/5 bg-gray-200 dark:bg-gray-800"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full items-center justify-center px-8">
        <div className="mt-7 flex w-full flex-col justify-center gap-6 min-[525px]:w-11/12">
          <div className="mb-1 flex h-[84px] w-full items-center gap-8 rounded-md p-4 dark:bg-gray-800">
            <div className="flex h-14 w-full items-center justify-center rounded-lg bg-gray-200 px-4 dark:bg-gray-700 min-[600px]:w-1/2">
              <div className="rounded-40 h-6 w-3/5 bg-gray-200 dark:bg-gray-800"></div>
            </div>
            <div className="flex h-14 w-full items-center justify-center rounded-lg bg-gray-200 px-4 dark:bg-gray-700 min-[600px]:w-1/2">
              <div className="rounded-40 h-6 w-1/2 bg-gray-200 dark:bg-gray-800"></div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5 min-[500px]:flex-nowrap">
            <div className="flex h-12 w-full items-center justify-between rounded-lg bg-gray-200 px-4 dark:bg-gray-700 min-[600px]:w-1/2">
              <div className="rounded-40 h-6 w-32 bg-gray-200 dark:bg-gray-800"></div>
              <div className="rounded-40 h-4 w-4 bg-gray-200 dark:bg-gray-800"></div>
            </div>
            <div className="flex h-12 w-full items-center justify-between rounded-lg bg-gray-200 px-4 dark:bg-gray-700 min-[600px]:w-1/2">
              <div className="rounded-40 h-6 w-32 bg-gray-200 dark:bg-gray-800"></div>
              <div className="rounded-40 h-4 w-4 bg-gray-200 dark:bg-gray-800"></div>
            </div>
          </div>
          <div className="h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="relative flex flex-wrap items-center justify-between gap-4 rounded-md border border-gray-200 p-4 shadow dark:border-gray-700 min-[475px]:h-[84px]">
            <div className="flex items-center gap-4">
              <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <div className="mb-3 h-5 w-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="rounded-40 h-3 w-40 bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="flex gap-4 min-[475px]:absolute min-[475px]:bottom-1 min-[475px]:right-2">
              <div className="h-8 w-24 rounded-md bg-gray-200 dark:bg-gray-700"></div>
              <div className="rounded-40 h-8 w-14 rounded-md bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
          <div className="relative flex flex-wrap items-center justify-between gap-4 rounded-md border border-gray-200 p-4 shadow dark:border-gray-700 min-[475px]:h-[84px]">
            <div className="flex items-center gap-4">
              <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <div className="mb-3 h-5 w-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="rounded-40 h-3 w-40 bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="flex gap-4 min-[475px]:absolute min-[475px]:bottom-1 min-[475px]:right-2">
              <div className="h-8 w-24 rounded-md bg-gray-200 dark:bg-gray-700"></div>
              <div className="rounded-40 h-8 w-14 rounded-md bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CalendarSkeleton;
