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
      flex
      items-center
      justify-center
      w-full
      max-w-${small ? 'sm' : 'md'}
      gap-2
      px-8
      py-3
      text-base
      ${
        filled
          ? 'text-white bg-[#8875FF] hover:bg-[#7969e1] focus:ring-[#a79aff] focus:ring-4 focus:outline-none'
          : ''
      }
      ${
        !filled && !outline
          ? 'text-[#ffffff70] bg-transparent hover:text-[#d9d9d970]'
          : ''
      }
      ${
        outline
          ? 'text-[#3d3d3d] dark:text-white bg-transparent outline outline-2 outline-[#a79aff] focus:ring-4 focus:ring-[#a79aff]'
          : ''
      }
      ${disabled && filled ? 'hover:bg-[#8875FF]' : ''}
      ${isLoading ? 'bg-[#8875FF] hover:bg-[#8875FF] opacity-70 ring-0' : ''}
      ${upperCase ? 'uppercase' : ''}
      overflow-hidden
      rounded-md
      whitespace-nowrap
      disabled:cursor-not-allowed 
      disabled:opacity-70 
      min-[475px]:text-${small ? 'base' : 'lg'}
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
