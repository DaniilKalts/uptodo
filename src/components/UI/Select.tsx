import React, { useState } from 'react';

interface SelectInterface {
  value: string;
  setValue: (newValue: string) => void;
  options: string[];
}

const Select: React.FC<SelectInterface> = ({ value, setValue, options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  return (
    <div className="relative min-w-[125px]">
      <button
        className="z-10 inline-flex w-full flex-shrink-0 items-center justify-between rounded-lg bg-[#ffffff35] px-4 py-2.5 text-center text-base font-medium text-[#ffffffdd]"
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
        } absolute right-0 z-40 w-full rounded-lg bg-[#444444] shadow`}
      >
        <ul className="rounded-lg text-sm">
          {options.map((option, id) => (
            <li key={option}>
              <button
                disabled={value === option}
                className={`inline-flex w-full cursor-pointer bg-[#444444] px-4 py-2 text-[#ffffffdd] hover:bg-[#dddddd35] ${roundedClass(
                  id,
                )} rounded-tr-lg disabled:bg-[#333333]`}
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
