'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { toast } from 'react-hot-toast';

import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

import { IRegisterInputs } from '../types';

import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Button';

const schema = yup.object().shape({
  userName: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must not exceed 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain alphanumeric characters and underscores',
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must not exceed 20 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Confirm Password must match the Password'),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterInputs>({
    mode: 'onSubmit',
    defaultValues: {
      userName: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const userName = watch('userName');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = (data, event) => {
    event?.preventDefault();
    if (userName.length && password.length) {
      setIsLoading(true);
      const toastLoading = toast.loading('Loading...');

      setTimeout(() => {
        setIsLoading(false);
        toast.remove(toastLoading);
        toast.error('Something went wrong!', {
          duration: 2000,
        });
      }, 2000);
    }
  };

  const googleSignIn = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      toast.error('Something went wrong!', {
        duration: 3000,
      });
    }, 2000);
  };

  const githubSignIn = () => {
    setIsGithubLoading(true);
    setTimeout(() => {
      setIsGithubLoading(false);
      toast.error('Something went wrong!', {
        duration: 3000,
      });
    }, 2000);
  };

  return (
    <Container>
      <div className="w-full min-h-screen flex flex-col justify-center max-w-[425px] py-10 mx-auto">
        <h1 className="text-4xl min-[400px]:text-5xl font-semibold text-black dark:text-[#ffffffdd] mb-10">
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Input
              id="userName"
              type="text"
              value={userName}
              placeholder="Enter your Username"
              register={register}
              label="Username"
              small
              errors={errors}
              errorMessage={errors.userName?.message as string}
            />
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your Password"
              register={register}
              label="Password"
              small
              errors={errors}
              errorMessage={errors.password?.message as string}
            />
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              register={register}
              label="Confirm Password"
              small
              errors={errors}
              errorMessage={errors.confirmPassword?.message as string}
            />
          </div>
          <Button
            label="Register"
            onClick={onSubmit}
            filled
            isLoading={isLoading}
            disabled={!!Object.keys(errors).length}
          />
        </form>
        <div className="inline-flex items-center justify-center w-full my-8">
          <hr className="w-full h-[2px] my-4 border-0 rounded dark:bg-[#3d3d3d]" />
          <div className="absolute px-2 -translate-x-1/2 left-1/2 bg-black">
            <span className="text-lg min-[400px]:text-[22px] text-[#e5e5e5]">
              or
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-6 mb-6">
          <Button
            label="Register with Google"
            onClick={googleSignIn}
            outline
            disabled={isGoogleLoading}
            icon={FcGoogle}
          />
          <Button
            label="Register with Github"
            onClick={githubSignIn}
            outline
            disabled={isGithubLoading}
            icon={AiFillGithub}
          />
        </div>
        <p className="text-[#979797] text-center">
          Already have an account?{' '}
          <Link
            href="login"
            className="text-[#ffffffdd] hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Register;
