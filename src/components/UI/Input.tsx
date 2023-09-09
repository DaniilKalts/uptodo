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
}) => {
  const inputStyles = () => {
    if (ghost) {
      return `
        text-base
        px-4
        py-[10px]
        ${value.length && type === 'password' ? ' tracking-[0.35rem]' : ''}
        rounded-lg 
        border
        focus-within:px-4
        text-white-pale
        placeholder-gray-200
        shadow-sm
        min-[500px]:py-3
        min-[500px]:text-${small ? 'lg' : 'xl'} 
        bg-transparent
      `;
    }

    return `
      text-base
      px-4
      py-[10px]
      ${value.length && type === 'password' ? ' tracking-[0.35rem]' : ''}
      rounded-lg 
      border
      border-gray-300
      text-gray-dark
      placeholder-gray-200
      shadow-sm 
      dark:bg-black-light
      dark:text-white-pale
      min-[500px]:py-3
      min-[500px]:text-${small ? 'lg' : 'xl'}
    `;
  };
  return (
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
        className={inputStyles()}
        autoComplete="off"
        {...register(id, { required: 'You have to fill this field!' })}
      />
      {errors[id] && (
        <p className="mt-1 text-red max-[500px]:text-[15px]">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
