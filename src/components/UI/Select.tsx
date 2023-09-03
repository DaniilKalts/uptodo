import React, { useState, useRef, useEffect, useCallback } from 'react';

import { cn } from '@/utils/Cn';

interface SelectInterface {
  value: string;
  setValue: (newValue: string) => void;
  options: string[];
  theme: 'purple' | 'gray';
}

const Select: React.FC<SelectInterface> = ({
  value,
  setValue,
  options,
  theme,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const onChange = (newValue: string) => {
    setIsOpen((prev) => !prev);
    setValue(newValue);
  };

  const hoverClass = () => {
    if (theme === 'gray') {
      return 'hover:bg-gray-light dark:hover:bg-gray-500';
    }
    return 'hover:bg-purple-light';
  };

  const roundedClass = (id: number) => {
    if (id === 0) {
      return 'rounded-tl-lg rounded-tr-lg';
    }
    if (id === options.length - 1) {
      return 'rounded-bl-lg rounded-br-lg';
    }
    return '';
  };

  const disabledClass = () => {
    if (theme === 'gray') {
      return 'disabled:bg-gray-700';
    }
    return 'disabled:bg-purple-dark';
  };

  const outsideClick = useCallback((e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', outsideClick);
    return () => {
      window.removeEventListener('click', outsideClick);
    };
  }, [outsideClick]);

  return (
    <div className="relative min-w-[125px]" ref={selectRef}>
      <button
        className={cn(
          'z-10 inline-flex w-full flex-shrink-0 items-center justify-between rounded-lg px-4 py-2.5 text-center text-base font-medium text-white-pale',
          theme === 'gray' ? 'bg-gray-500 dark:bg-gray-600' : 'bg-purple',
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value}
        <svg
          className="ml-4 h-3 w-3"
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
        className={cn(
          'absolute right-0 z-40 w-full rounded-lg shadow',
          theme === 'gray' ? 'bg-gray-600 dark:bg-gray-700' : 'bg-purple-light',
          isOpen ? 'block' : 'hidden',
        )}
      >
        <ul className="rounded-lg text-sm">
          {options.map((option, id) => (
            <li key={option}>
              <button
                disabled={value === option}
                className={cn(
                  'inline-flex w-full cursor-pointer px-4 py-2 text-base text-white-pale',
                  theme === 'gray'
                    ? 'bg-gray-500 dark:bg-gray-600'
                    : 'bg-purple',
                  hoverClass(),
                  roundedClass(id),
                  disabledClass(),
                )}
                onClick={() => onChange(option)}
              >
                <div className="inline-flex items-center">{option}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
