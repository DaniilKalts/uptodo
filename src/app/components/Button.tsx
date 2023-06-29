import React from 'react';

import { FieldValues } from 'react-hook-form';

import { IconType } from 'react-icons/lib';
import Spinner from './Spinner';

interface ButtonProps {
  label: string;
  onClick: (() => void) | ((data: FieldValues) => void);
  disabled?: boolean;
  isLoading?: boolean;
  outline?: boolean;
  filled?: boolean;
  upperCase?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  isLoading,
  outline,
  filled,
  upperCase,
  small,
  icon: Icon,
}) => (
  <button
    className={`
      text-base
      min-[400px]:text-${small ? 'base' : 'lg'}
      w-full
      max-w-${small ? 'sm' : 'md'}
      px-8
      py-3
      flex
      items-center
      justify-center
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
      ${disabled && filled ? 'hover:bg-[#8875FF]' : ''}
      ${isLoading ? 'bg-[#8875FF] hover:bg-[#8875FF] opacity-70 ring-0' : ''}
      whitespace-nowrap
      rounded-md
      gap-2
      disabled:cursor-not-allowed 
      disabled:opacity-70 overflow-hidden
    `}
    disabled={disabled || isLoading}
    onClick={onClick}
  >
    {Icon && disabled && <Spinner />}
    {Icon && !disabled && <Icon size={24} />}
    {isLoading ? 'Please wait...' : label}
  </button>
);

export default Button;
