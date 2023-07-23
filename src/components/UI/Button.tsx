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
          ? 'bg-purple text-white hover:bg-purple-dark focus:outline-none focus:ring-4 focus:ring-purple-light'
          : ''
      }
      ${
        label === 'Back'
          ? 'bg-transparent text-gray-300 hover:text-gray-800 dark:hover:text-gray-400'
          : ''
      }
      ${
        label === 'Cancel'
          ? 'bg-transparent text-purple hover:text-purple-dark'
          : ''
      }
      ${
        outline
          ? 'bg-transparent text-gray-dark outline outline-2 outline-purple-light focus:ring-4 focus:ring-purple-light dark:text-white'
          : ''
      }
      ${disabled && filled ? 'hover:bg-purple' : ''}
      ${isLoading ? 'bg-purple opacity-70 ring-0 hover:bg-purple' : ''}
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
