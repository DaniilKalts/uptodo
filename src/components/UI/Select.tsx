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
        className="w-full flex-shrink-0 z-10 inline-flex justify-between items-center py-2.5 px-4 text-base font-medium text-center text-[#ffffffdd] bg-[#ffffff35] rounded-lg"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value}
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
        } absolute right-0 z-40 w-full bg-[#444444] rounded-lg shadow`}
      >
        <ul className="text-sm rounded-lg">
          {options.map((option, id) => (
            <li key={option}>
              <button
                disabled={value === option}
                className={`inline-flex w-full py-2 px-4 text-[#ffffffdd] bg-[#444444] hover:bg-[#dddddd35] cursor-pointer ${roundedClass(
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
