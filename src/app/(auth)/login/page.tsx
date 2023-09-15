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

import { Container, Input, Button } from '@/components/UI';

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

  const onSubmit: SubmitHandler<FieldValues> = (_, event) => {
    event?.preventDefault();

    if (userName.length && password.length) {
      setIsLoading(true);
      const toastLoading = toast.loading('Loading...');

      setTimeout(() => {
        setIsLoading(false);

        toast.remove(toastLoading);
        toast.error('Invalid email or password!', {
          duration: 2000,
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
        duration: 2000,
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
        duration: 2000,
      });
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <Container>
      <div className="relative mx-auto flex min-h-screen w-full max-w-[425px] flex-col justify-center pb-12 pt-24 md:py-10">
        <header className="absolute left-0 top-8 md:hidden">
          <MdArrowBackIosNew
            className="cursor-pointer text-2xl text-white transition hover:text-white-darker"
            onClick={() => router.back()}
          />
        </header>
        <h1 className="mb-8 text-4xl font-semibold text-gray-dark dark:text-white-pale md:mb-10 md:text-5xl">
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
            type="submit"
            label="Login"
            onClick={onSubmit}
            filled
            isLoading={isLoading}
            disabled={!!Object.keys(errors).length}
          />
        </form>
        <div className="my-6 inline-flex w-full items-center justify-center md:my-8">
          <hr className="my-4 h-[2px] w-full rounded border-0 bg-gray-dark" />
          <div className="absolute left-1/2 -translate-x-1/2 bg-white-pale px-2 dark:bg-black-pre">
            <span className="text-lg text-black-pre dark:text-gray-100 md:text-[22px]">
              or
            </span>
          </div>
        </div>
        <div className="mb-6 flex flex-col gap-6">
          <Button
            label="Login with Google"
            onClick={googleSignIn}
            outline="purple"
            disabled={isGoogleLoading}
            icon={FcGoogle}
          />
          <Button
            label="Login with Github"
            onClick={githubSignIn}
            outline="purple"
            disabled={isGithubLoading}
            icon={AiFillGithub}
          />
        </div>
        <p className="text-center text-gray-300">
          Don’t have an account?{' '}
          <Link
            href="register"
            className="cursor-pointer text-purple hover:underline dark:text-white-pale"
          >
            Register
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;
