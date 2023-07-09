'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { toast } from 'react-hot-toast';

import { MdArrowBackIosNew } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

import Container from '../../../components/UI/Container';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';

interface LoginInputs extends FieldValues {
  userName: string;
  password: string;
}

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
});

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>({
    mode: 'all',
    defaultValues: {
      userName: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const userName = watch('userName');
  const password = watch('password');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data, event) => {
    event?.preventDefault();
    if (userName.length && password.length) {
      setIsLoading(true);
      const toastLoading = toast.loading('Loading...');

      setTimeout(() => {
        setIsLoading(false);

        toast.remove(toastLoading);
        toast.error('Invalid email or password!', {
          duration: 3000,
        });

        router.push('home');

        reset();
      }, 2000);
    }
  };

  const googleSignIn = async () => {
    setIsGoogleLoading(true);

    try {
      // signIn('google');
    } catch (err) {
      toast.error('Something went wrong!', {
        duration: 3000,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const githubSignIn = () => {
    setIsGithubLoading(true);

    try {
      // signIn('github');
    } catch (err) {
      toast.error('Something went wrong!', {
        duration: 3000,
      });
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <Container>
      <div className="w-full min-h-screen flex flex-col justify-center max-w-[425px] pt-24 pb-12 min-[400px]:py-10 mx-auto relative">
        <header className="min-[400px]:hidden absolute top-10 left-0">
          <MdArrowBackIosNew
            className="text-2xl text-white transition cursor-pointer hover:text-gray-300"
            onClick={() => router.back()}
          />
        </header>
        <h1 className="text-4xl min-[400px]:text-5xl font-semibold text-[#3d3d3d] dark:text-[#ffffffdd] mb-8 min-[400px]:mb-10">
          Login
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
          </div>
          <Button
            label="Login"
            onClick={onSubmit}
            filled
            isLoading={isLoading}
            disabled={!!Object.keys(errors).length}
          />
        </form>
        <div className="inline-flex items-center justify-center w-full my-6 min-[400px]:my-8">
          <hr className="w-full h-[2px] my-4 border-0 rounded bg-[#3d3d3d]" />
          <div className="absolute px-2 -translate-x-1/2 left-1/2 bg-white dark:bg-[#121212]">
            <span className="text-lg min-[400px]:text-[22px] text-[#121212] dark:text-[#e5e5e5]">
              or
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-6 mb-6">
          <Button
            label="Login with Google"
            onClick={googleSignIn}
            outline
            disabled={isGoogleLoading}
            icon={FcGoogle}
          />
          <Button
            label="Login with Github"
            onClick={githubSignIn}
            outline
            disabled={isGithubLoading}
            icon={AiFillGithub}
          />
        </div>
        <p className="text-[#979797] text-center">
          Don’t have an account?{' '}
          <Link
            href="register"
            className="text-[#8875FF] dark:text-[#ffffffdd] hover:underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;
