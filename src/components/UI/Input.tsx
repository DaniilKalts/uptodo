'use client';

import React from 'react';

import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface InputProps {
  id: string;
  type: string;
  value: string;
  placeholder: string;
  register: UseFormRegister<any>;
  label?: string;
  small?: boolean;
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
  errors,
  errorMessage,
}) => (
  <div className="mb-4 flex flex-col min-[475px]:mb-5">
    {label && (
      <label
        htmlFor={id}
        className={`
          mb-2
          text-lg
          text-gray-dark 
          dark:text-white-pale
          min-[475px]:text-xl
        `}
      >
        {label}
      </label>
    )}
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      className={`
        px-4
        py-[10px]
        text-base
        ${value.length && type === 'password' ? ' tracking-[0.35rem]' : ''}
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
      `}
      autoComplete="off"
      {...register(id, { required: 'You have to fill this field!' })}
    />
    {errors[id] && <p className="mt-1 text-red">{errorMessage}</p>}
  </div>
);

export default Input;
