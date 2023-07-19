import React, { useState } from 'react';

const Select = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-base font-medium text-center text-[#ffffffdd] bg-[#ffffff35] rounded-lg"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        This Week
        <svg
          className="w-3 h-3 ml-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id="dropdown-states"
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute right-0 z-40 w-full rounded-lg shadow bg-[#ffffff35]`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 bg-[#3b3b3b] rounded-lg">
          <li>
            <button
              disabled
              type="button"
              className="inline-flex w-full px-4 py-2 text-sm text-[#ffffffdd] bg-[#ffffff35] hover:bg-[#dddddd35]"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <div className="inline-flex items-center">This Week</div>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 text-sm text-[#ffffffdd] bg-[#ffffff35] hover:bg-[#dddddd35]"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <div className="inline-flex items-center">Today</div>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 text-sm text-[#ffffffdd] bg-[#ffffff35] hover:bg-[#dddddd35]"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <div className="inline-flex items-center">Specific Task</div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Select;
