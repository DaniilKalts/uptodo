import React from 'react';

interface IncompletedTaskInterface {
  title: string;
  deadline: number;
  priority: number;
  onComplete: () => void;
}

const IncompletedTask: React.FC<IncompletedTaskInterface> = ({
  title,
  deadline,
  priority,
  onComplete,
}) => {
  const getTimeString = (time: number) => String(time).padStart(2, '0');

  return (
    <div className="relative flex flex-wrap items-center gap-4 rounded-md bg-gray-700 p-4">
      <div
        className="h-5 w-5 cursor-pointer rounded-full border-2 border-white-pale bg-transparent"
        onClick={() => onComplete()}
      ></div>
      <div>
        <h6 className="mb-[2px] text-base text-white-pale min-[475px]:mb-[6px] min-[475px]:text-xl">
          {title}
        </h6>
        <p className="text-base text-gray-200 min-[475px]:text-base">
          Deadline:{' '}
          {`${getTimeString(
            new Date(deadline).getHours() % 12 || 12,
          )}:${getTimeString(new Date(deadline).getMinutes())} ${
            new Date(deadline).getHours() >= 12 ? 'pm' : 'am'
          }`}
        </p>
      </div>
      <div className="flex gap-4 min-[475px]:absolute min-[475px]:bottom-1 min-[475px]:right-2">
        <div className="flex h-10 items-center gap-3 rounded-md bg-[#809CFF] px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 14 15"
            fill="none"
          >
            <path
              d="M12.5359 6.44413L11.9526 6.1233L6.70259 3.20663H6.63843C6.60266 3.19151 6.56555 3.17979 6.52759 3.17163H6.41676H6.31176C6.2719 3.1798 6.23286 3.19151 6.19509 3.20663H6.13093L0.880925 6.1233C0.791151 6.17418 0.71648 6.24795 0.664528 6.33711C0.612577 6.42627 0.585205 6.52761 0.585205 6.6308C0.585205 6.73399 0.612577 6.83533 0.664528 6.92448C0.71648 7.01364 0.791151 7.08742 0.880925 7.1383L2.33343 7.9433V10.7083C2.33343 11.1724 2.5178 11.6175 2.84599 11.9457C3.17418 12.2739 3.6193 12.4583 4.08343 12.4583H8.75009C9.21422 12.4583 9.65934 12.2739 9.98753 11.9457C10.3157 11.6175 10.5001 11.1724 10.5001 10.7083V7.9433L11.6668 7.28996V8.9583C11.6668 9.11301 11.7282 9.26138 11.8376 9.37078C11.947 9.48017 12.0954 9.54163 12.2501 9.54163C12.4048 9.54163 12.5532 9.48017 12.6626 9.37078C12.772 9.26138 12.8334 9.11301 12.8334 8.9583V6.95163C12.8332 6.84827 12.8056 6.74681 12.7533 6.65763C12.7011 6.56846 12.626 6.49478 12.5359 6.44413ZM9.33343 10.7083C9.33343 10.863 9.27197 11.0114 9.16257 11.1208C9.05317 11.2302 8.9048 11.2916 8.75009 11.2916H4.08343C3.92872 11.2916 3.78034 11.2302 3.67095 11.1208C3.56155 11.0114 3.50009 10.863 3.50009 10.7083V8.5908L6.13093 10.0491L6.21843 10.0841H6.27093C6.31934 10.0902 6.36834 10.0902 6.41676 10.0841C6.46518 10.0902 6.51417 10.0902 6.56259 10.0841H6.61509C6.64606 10.0776 6.67566 10.0658 6.70259 10.0491L9.33343 8.5908V10.7083ZM6.41676 8.87663L2.36843 6.62496L6.41676 4.3733L10.4651 6.62496L6.41676 8.87663Z"
              fill="#0055A3"
            />
          </svg>
          <p className="text-sm text-white min-[475px]:text-base">University</p>
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
    </div>
  );
};

export default IncompletedTask;
