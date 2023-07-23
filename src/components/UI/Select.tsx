import React, { useState, useRef, useEffect, useCallback } from 'react';

interface SelectInterface {
  value: string;
  setValue: (newValue: string) => void;
  options: string[];
}

const Select: React.FC<SelectInterface> = ({ value, setValue, options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const onChange = (newValue: string) => {
    setIsOpen((prev) => !prev);
    setValue(newValue);
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
        className="z-10 inline-flex w-full flex-shrink-0 items-center justify-between rounded-lg bg-gray-500 px-4 py-2.5 text-center text-base font-medium text-white-pale dark:bg-gray-600"
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
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute right-0 z-40 w-full rounded-lg bg-gray-500 shadow dark:bg-gray-600`}
      >
        <ul className="rounded-lg text-sm">
          {options.map((option, id) => (
            <li key={option}>
              <button
                disabled={value === option}
                className={`inline-flex w-full cursor-pointer bg-gray-600 px-4 py-2 text-white-pale hover:bg-gray-500 ${roundedClass(
                  id,
                )} disabled:bg-gray-700`}
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
