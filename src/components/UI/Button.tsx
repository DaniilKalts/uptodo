import React from 'react';

import { FieldValues } from 'react-hook-form';

import { IconType } from 'react-icons/lib';

import Spinner from './Spinner';

interface ButtonProps {
  label: string;
  onClick: (() => void) | ((data: FieldValues) => void);
  disabled?: boolean;
  isLoading?: boolean;
  outline?: 'gray' | 'purple';
  filled?: boolean;
  iconReversed?: boolean;
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
  iconReversed,
  upperCase,
  small,
  icon: Icon,
}) => {
  const outlineStyles = () => {
    if (outline === 'gray') {
      return `bg-transparent ${
        Icon ? 'text-gray-dark' : 'text-white-pale'
      } outline outline-2 outline-gray-300 focus:ring-4 focus:ring-gray-300 dark:text-white`;
    }
    if (outline === 'purple') {
      return 'bg-transparent text-gray-dark outline outline-2 outline-purple-light focus:ring-4 focus:ring-purple-light dark:text-white';
    }
  };

  return (
    <button
      className={`
      flex
      w-full
      items-center
      justify-center
      max-w-${small ? 'sm' : 'md'}
      gap-2
      px-4
      py-3
      text-base
      min-[475px]:px-8
      ${
        filled
          ? 'bg-purple text-white outline outline-2 outline-purple hover:bg-purple-dark hover:outline-purple-dark focus:outline-none focus:ring-4 focus:ring-purple-light'
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
      ${outline ? outlineStyles() : ''}
      ${disabled && filled ? 'hover:bg-purple' : ''}
      ${
        isLoading && filled ? 'bg-purple opacity-70 ring-0 hover:bg-purple' : ''
      }
      ${upperCase ? 'uppercase' : ''}
      ${iconReversed ? 'flex-row-reverse' : ''}
      overflow-hidden
      whitespace-nowrap
      rounded-md
      disabled:cursor-not-allowed 
      disabled:opacity-70 
      min-[475px]:text-${small ? 'base' : 'lg'}
    `}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {Icon && isLoading && <Spinner />}
      {Icon && !isLoading && <Icon size={24} />}
      {isLoading ? 'Please wait...' : label}
    </button>
  );
};

export default Button;
