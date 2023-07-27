import React from 'react';

interface CompletedTaskInterface {
  title: string;
  completedAt: number;
  onIcomplete: () => void;
}

const CompletedTask: React.FC<CompletedTaskInterface> = ({
  title,
  completedAt,
  onIcomplete,
}) => {
  const getTimeString = (time: number) => String(time).padStart(2, '0');

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-4 rounded-md bg-gray-700 p-4">
      <div className="flex items-center gap-4">
        <div
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border-2 border-white-pale bg-transparent"
          onClick={() => onIcomplete()}
        >
          <div className="h-[6px] w-[6px] rounded-full bg-white-pale"></div>
        </div>
        <div>
          <h6 className="mb-[2px] text-base text-white-pale min-[475px]:mb-[6px] min-[475px]:text-xl">
            {title}
          </h6>
          <p className="text-base text-gray-200 min-[475px]:text-base">
            Completed At:{' '}
            {`${getTimeString(
              new Date(completedAt).getHours() % 12 || 12,
            )}:${getTimeString(new Date(completedAt).getMinutes())} ${
              new Date(completedAt).getHours() >= 12 ? 'pm' : 'am'
            }`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletedTask;
