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
      w-full
      items-center
      justify-center
      max-w-${small ? 'sm' : 'md'}
      gap-2
      px-5
      py-3
      text-base
      ${
        filled
          ? 'bg-[#8875FF] text-white hover:bg-[#7969e1] focus:outline-none focus:ring-4 focus:ring-[#a79aff]'
          : ''
      }
      ${
        label === 'Back'
          ? 'bg-transparent text-[#ffffff70] hover:text-[#d9d9d970]'
          : ''
      }
      ${
        label === 'Cancel'
          ? 'bg-transparent text-[#8875FF] hover:text-[#7969e1]'
          : ''
      }
      ${
        outline
          ? 'bg-transparent text-[#3d3d3d] outline outline-2 outline-[#a79aff] focus:ring-4 focus:ring-[#a79aff] dark:text-white'
          : ''
      }
      ${disabled && filled ? 'hover:bg-[#8875FF]' : ''}
      ${isLoading ? 'bg-[#8875FF] opacity-70 ring-0 hover:bg-[#8875FF]' : ''}
      ${upperCase ? 'uppercase' : ''}
      overflow-hidden
      whitespace-nowrap
      rounded-md
      disabled:cursor-not-allowed 
      disabled:opacity-70 
      min-[475px]:text-${small ? 'base' : 'lg'}
      min-[475px]:px-8
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
