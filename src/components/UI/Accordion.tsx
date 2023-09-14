import React from 'react';

import { cn } from '@/utils/Cn';

interface AccordionProps {
  id: number;
  isOpen: boolean;
  question: string;
  answer: string;
  onClick: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  id,
  isOpen,
  question,
  answer,
  onClick,
}) => (
  <li
    onClick={onClick}
    className="group"
    itemType="https://schema.org/Question"
  >
    <input
      className={`peer/option-${id} hidden`}
      type="checkbox"
      id={`checkbox-option-${id}`}
      name="checkbox-options"
    />
    <label
      className={cn(
        'relative block cursor-pointer rounded border border-gray-light p-4 pr-12 font-bold transition-all duration-150 ease-in-out',
        {
          'bg-purple-dark text-white [&>svg]:rotate-45': isOpen,
        },
      )}
      htmlFor={`checkbox-option-${id}`}
    >
      {id}.{question}
      <svg
        className="absolute right-4 top-1/2 -mt-[11.5px] block transition-all duration-150 ease-in-out"
        width="22"
        height="23"
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 11.5L21 11.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M11 1.5L11 21.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </label>
    <div
      className={cn(
        'grid grid-rows-[0fr] transition-all duration-150 ease-in-out',
        { 'grid-rows-[1fr]': isOpen },
      )}
      itemType="https://schema.org/Answer"
    >
      <div className="min-h-[0px] overflow-hidden">
        <div className="mt-2 rounded border border-gray-light p-4">
          {answer}
        </div>
      </div>
    </div>
  </li>
);

export default Accordion;
