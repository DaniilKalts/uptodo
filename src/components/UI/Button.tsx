import React from 'react';

import { cn } from '@/utils/Cn';

import { FieldValues } from 'react-hook-form';
import { IconType } from 'react-icons/lib';

import Spinner from '@/components/UI/Spinner';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
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
  type,
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
      type={type || 'button'}
      className={cn(
        'flex w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md px-4 py-3 text-base disabled:cursor-not-allowed disabled:opacity-70 min-[475px]:px-8 ',
        `max-w-${small ? 'sm' : 'md'}`,
        `min-[475px]:text-${small ? 'base' : 'lg'}`,
        outlineStyles(),
        {
          'bg-purple text-white outline outline-2 outline-purple hover:bg-purple-dark hover:outline-purple-dark focus:outline-none focus:ring-4 focus:ring-purple-light':
            filled,
          'bg-transparent text-gray-300 hover:text-gray-800 dark:hover:text-gray-400':
            label === 'Back',
          'bg-transparent text-purple hover:text-purple-dark':
            label === 'Cancel',
          'hover:bg-purple': disabled && filled,
          'bg-purple opacity-70 ring-0 hover:bg-purple': isLoading && filled,
          uppercase: upperCase,
          'flex-row-reverse': iconReversed,
        },
      )}
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
