'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { MdArrowBackIosNew } from 'react-icons/md';

import { motion } from 'framer-motion';

import Container from '../../components/UI/Container';
import Button from '../../components/UI/Button';

const Welcome = () => {
  const router = useRouter();

  return (
    <Container>
      <div className="relative flex flex-col items-center justify-center min-h-screen py-10">
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <header className="absolute left-0 top-12">
            <MdArrowBackIosNew
              className="text-2xl text-white transition cursor-pointer hover:text-gray-300"
              onClick={() => router.back()}
            />
          </header>
          <main className="flex flex-col items-center justify-center w-full">
            <h2 className="text-[8.5vw] min-[400px]:text-4xl font-bold text-center text-[#3d3d3d] dark:text-[#ffffffdd] mt-12">
              Welcome to UpTodo
            </h2>
            <p className="text-sm min-[400px]:text-[17px] text-[#3d3d3d] dark:text-[#ffffffdd] mt-6 max-w-md text-center relative z-10">
              Please login to your account or create a new account to continue
            </p>
          </main>
          <footer className="w-fit flex items-center justify-between gap-4 min-[400px]:gap-8 mt-12">
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
