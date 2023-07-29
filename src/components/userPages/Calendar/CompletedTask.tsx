import React from 'react';

interface CompletedTaskInterface {
  title: string;
  completedAt: number;
  onIcomplete: () => void;
  priority: number;
}

const CompletedTask: React.FC<CompletedTaskInterface> = ({
  title,
  completedAt,
  onIcomplete,
  priority,
}) => {
  const getTimeString = (time: number) => String(time).padStart(2, '0');

  return (
    <div className="relative flex cursor-pointer flex-wrap items-center justify-between gap-4 rounded-md bg-gray-700 p-4 hover:bg-gray-600">
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
              new Date(completedAt).getHours() % 12 || 0,
            )}:${getTimeString(new Date(completedAt).getMinutes())} ${
              new Date(completedAt).getHours() >= 12 ? 'pm' : 'am'
            }`}
          </p>
        </div>
      </div>
      <div className="flex h-10 items-center justify-center gap-1 rounded-lg border-2 border-purple-light px-3 py-2">
        <svg
          className="h-5 w-5 text-white-pale"
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
        <p className="text-sm text-gray-dark dark:text-white-pale min-[475px]:text-base">
          {priority}
        </p>
      </div>
    </div>
  );
};

export default CompletedTask;
