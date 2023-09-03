'use client';

import React from 'react';

import { cn } from '@/utils/Cn';

import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface InputProps {
  id: string;
  value: string;
  placeholder: string;
  register: UseFormRegister<any>;
  label?: string;
  small?: boolean;
  rows?: number;
  ghost?: boolean;
  errors: FieldErrors;
  errorMessage: string;
}

const Textarea: React.FC<InputProps> = ({
  id,
  value,
  placeholder,
  register,
  label,
  small,
  rows,
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
        focus-within:px-4
        rounded-lg 
        border
        text-white-pale
        placeholder-gray-200
        shadow-sm
        min-[475px]:py-3
        min-[475px]:text-${small ? 'lg' : 'xl'}
        bg-transparent
        h-48
        resize-none
      `;
    }

    return `
      px-4
      py-[10px]
      text-base
      rounded-lg 
      border
      border-gray-300
      text-black-light 
      placeholder-gray-200
      shadow-sm 
      dark:bg-black-light
      dark:text-white-pale
      min-[475px]:py-3
      min-[475px]:text-${small ? 'lg' : 'xl'}
    `;
  };
  return (
    <div className="mb-4 flex flex-col min-[475px]:mb-5">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'mb-2 text-lg min-[475px]:text-xl',
            ghost ? 'text-white-pale' : 'text-gray-dark dark:text-white-pale',
          )}
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        className={inputStyles()}
        autoComplete="off"
        rows={rows}
        {...register(id, { required: 'You have to fill this field!' })}
      />
      {errors[id] && <p className="mt-1 text-red">{errorMessage}</p>}
    </div>
  );
};

export default Textarea;
