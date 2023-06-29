'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import React, { FC } from 'react';

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

const Input: FC<InputProps> = ({
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
  <div className="flex flex-col mb-5">
    {label && (
      <label
        htmlFor={id}
        className={`
        text-lg
        min-[400px]:text-xl
        text-black
        dark:text-[#ffffffdd] mb-2
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
      {...register(id, { required: 'You have to fill this field!' })}
      autoComplete="off"
      className={`
        px-4
        py-3
        text-base
        min-[400px]:text-${small ? 'lg' : 'xl'}
      bg-[#1D1D1D] 
      text-white
        border 
        border-[#979797] 
        rounded-lg
        shadow-sm
        ${value.length && type === 'password' ? ' tracking-[0.35rem]' : ''}
      `}
    />
    {errors[id] && <p className="text-red-500 mt-1">{errorMessage}</p>}
  </div>
);

export default Input;
