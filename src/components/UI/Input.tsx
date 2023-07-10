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
  <div className="flex flex-col mb-4 min-[475px]:mb-5">
    {label && (
      <label
        htmlFor={id}
        className={`
          text-lg
          text-[#3d3d3d]
          dark:text-[#ffffffdd] 
          mb-2
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
      text-[#1D1D1D] 
      dark:text-white
      dark:bg-[#1D1D1D] 
        border 
        border-[#979797] 
        rounded-lg
        shadow-sm
        min-[475px]:py-3
        min-[475px]:text-${small ? 'lg' : 'xl'}
      `}
      autoComplete="off"
      {...register(id, { required: 'You have to fill this field!' })}
    />
    {errors[id] && <p className="mt-1 text-red-500">{errorMessage}</p>}
  </div>
);

export default Input;
