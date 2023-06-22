import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  outline?: boolean;
  filled?: boolean;
  upperCase?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  outline,
  filled,
  upperCase,
}) => (
  <button
    className={`
    text-base
    min-[400px]:text-lg
    w-full
    max-w-md
    px-8
    py-3
    ${
      filled
        ? 'bg-[#8875FF] text-white hover:bg-[#7969e1] focus:outline-none focus:ring-4 focus:ring-[#a79aff]'
        : ''
    }
    ${
      !filled && !outline
        ? 'bg-transparent text-[#ffffff70] hover:text-[#d9d9d970]'
        : ''
    }
    ${upperCase ? 'uppercase' : ''}
    ${
      outline
        ? 'bg-transparent text-black dark:text-white outline outline-2 outline-[#8E7CFF] focus:ring-4 focus:ring-[#a79aff]'
        : ''
    }
    whitespace-nowrap
    rounded-md
`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Button;
