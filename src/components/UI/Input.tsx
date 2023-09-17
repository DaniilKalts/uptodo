'use client';

import React from 'react';

import { cn } from '@/utils/Cn';

import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface InputProps {
  id: string;
  type: string;
  value: string;
  placeholder: string;
  register: UseFormRegister<any>;
  label?: string;
  small?: boolean;
  ghost?: boolean;
  errors: FieldErrors;
  errorMessage: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  placeholder,
  register,
  label,
  small,
  ghost,
  errors,
  errorMessage,
}) => (
  <div className="mb-4 flex flex-col min-[500px]:mb-5">
    {label && (
      <label
        htmlFor={id}
        className={cn(
          'mb-2 text-base',
          ghost ? 'text-white-pale' : 'text-gray-dark dark:text-white-pale',
          type === 'password'
            ? 'min-[500px]:text-[17px]'
            : 'min-[500px]:text-xl',
        )}
      >
        {label}
      </label>
    )}
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      className={cn(
        'rounded-lg border px-4 py-[10px] text-base placeholder-gray-200 shadow-sm min-[500px]:py-3',
        {
          'tracking-[0.35rem] min-[500px]:text-xl':
            value.length && type === 'password',
          'min-[500px]:text-lg': small && type !== 'password',
          'min-[500px]:text-xl': !small && type !== 'password',
          'bg-transparent text-white-pale focus-within:px-4': ghost,
          'border-gray-300 text-gray-dark dark:bg-black-light dark:text-white-pale':
            !ghost,
        },
      )}
      autoComplete="off"
      {...register(id, { required: 'You have to fill this field!' })}
    />
    {errors[id] && (
      <p className="mt-1 text-red max-[500px]:text-[15px]">{errorMessage}</p>
    )}
  </div>
);

export default Input;
