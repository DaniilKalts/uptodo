'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { MdArrowBackIosNew } from 'react-icons/md';

import { motion } from 'framer-motion';

import { Button } from '../../components/UI';
import Container from '../../components/UI/Container';

const Welcome = () => {
  const router = useRouter();

  return (
    <Container>
      <div className="relative flex min-h-screen flex-col items-center justify-center py-10">
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <header className="absolute left-0 top-12">
            <MdArrowBackIosNew
              className="text-black cursor-pointer text-2xl transition hover:text-gray-dark dark:text-white dark:hover:text-white-pale"
              onClick={() => router.back()}
            />
          </header>
          <main className="flex w-full flex-col items-center justify-center">
            <h2 className="mt-12 text-center text-[8.5vw] font-bold text-gray-dark dark:text-white-pale min-[475px]:text-4xl">
              Welcome to UpTodo
            </h2>
            <p className="relative z-10 mt-6 max-w-md text-center text-sm text-gray-dark dark:text-white-pale min-[475px]:text-[17px]">
              Please login to your account or create a new account to continue
            </p>
          </main>
          <footer className="mt-12 flex w-fit items-center justify-between gap-4 min-[475px]:gap-8">
            <Link href="login" className="w-full max-w-sm">
              <Button label="Login" onClick={() => {}} filled upperCase small />
            </Link>
            <Link href="register" className="w-full max-w-sm">
              <Button
                label="Register"
                onClick={() => {}}
                outline
                upperCase
                small
              />
            </Link>
          </footer>
        </motion.div>
      </div>
    </Container>
  );
};

export default Welcome;
