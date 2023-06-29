'use client';

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { MdArrowBackIosNew } from 'react-icons/md';
import { motion } from 'framer-motion';

import Logo from './components/Intro/Logo';
import Onboarding from './components/Intro/Onboarding';
import Button from './components/Button';
import Container from './components/Container';

import step1 from '../../public/images/intro/step1.svg';
import step2 from '../../public/images/intro/step2.svg';
import step3 from '../../public/images/intro/step3.svg';

enum STEPS {
  FIRST_SLIDE = 1,
  SECOND_SLIDE = 2,
  THIRD_SLIDE = 3,
  FOURTH_SLIDE = 4,
}

export default function Home() {
  const [step, setStep] = useState<number | null>(null);

  let bodyContent = (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 15 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center"
      >
        <Logo />
        <h1 className="text-[2.5rem] sm:text-5xl font-bold text-center text-black dark:text-white mt-3">
          UpTodo
        </h1>
      </motion.div>
    </div>
  );

  useEffect(() => {
    setTimeout(() => {
      setStep(1);
    }, 1625);
  }, []);

  if (STEPS.FIRST_SLIDE === step) {
    const HeaderContent = (
      <header className="absolute top-12 left-0">
        <p
          className="text-[#ffffff70] hover:text-[#d9d9d970] text-base min-[400px]:text-lg cursor-pointer"
          onClick={() => {
            setStep(4);
          }}
        >
          Skip
        </p>
      </header>
    );

    const FooterContent = (
      <footer className="w-full min-[475px]:w-fit flex items-center justify-center mt-14 min-[475px]:mt-8 md:absolute md:bottom-12 md:right-10">
        <Button
          label="Next"
          onClick={() => {
            setStep(2);
          }}
          filled
          upperCase
          small
        />
      </footer>
    );

    bodyContent = (
      <Onboarding
        step={step}
        header={HeaderContent}
        imageSrc={step1}
        title="Manage your tasks"
        text="You can easily manage all of your daily tasks in UpTodo for free"
        footer={FooterContent}
        key={origin}
      />
    );
  }

  if (STEPS.SECOND_SLIDE === step) {
    const HeaderContent = (
      <header className="absolute top-12 left-0">
        <p
          className="text-[#ffffff70] hover:text-[#d9d9d970] text-base min-[400px]:text-lg cursor-pointer"
          onClick={() => {
            setStep(4);
          }}
        >
          Skip
        </p>
      </header>
    );

    const FooterContent = (
      <footer className="w-full min-[475px]:w-fit min-[475px]:gap-8 flex items-center justify-between mt-14 md:absolute md:bottom-12 md:right-10">
        <Button
          label="Back"
          onClick={() => {
            setStep(1);
          }}
          upperCase
          small
        />
        <Button
          label="Next"
          onClick={() => {
            setStep(3);
          }}
          filled
          upperCase
          small
        />
      </footer>
    );

    bodyContent = (
      <Onboarding
        step={step}
        header={HeaderContent}
        imageSrc={step2}
        title="Create daily routine"
        text="In Uptodo  you can create your personalized routine to stay productive"
        footer={FooterContent}
      />
    );
  }

  if (STEPS.THIRD_SLIDE === step) {
    const HeaderContent = (
      <header className="absolute top-12 left-0">
        <p
          className="text-[#ffffff70] hover:text-[#d9d9d970] text-base min-[400px]:text-lg cursor-pointer"
          onClick={() => {
            setStep(4);
          }}
        >
          Skip
        </p>
      </header>
    );

    const FooterContent = (
      <footer className="w-full min-[475px]:w-fit min-[475px]:gap-8 flex items-center justify-between mt-16 md:absolute md:bottom-12 md:right-10">
        <Button
          label="Back"
          onClick={() => {
            setStep(2);
          }}
          upperCase
          small
        />
        <Button
          label="Get Started"
          onClick={() => {
            setStep(4);
          }}
          filled
          upperCase
          small
        />
      </footer>
    );

    bodyContent = (
      <Onboarding
        step={step}
        header={HeaderContent}
        imageSrc={step3}
        title="Organize your tasks"
        text="You can organize your daily tasks by adding your tasks into separate categories"
        footer={FooterContent}
        key={origin}
      />
    );
  }

  if (STEPS.FOURTH_SLIDE === step) {
    bodyContent = (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-screen py-10 relative">
          <header className="absolute top-12 left-0">
            <MdArrowBackIosNew
              className="text-white text-2xl hover:text-gray-300 transition cursor-pointer"
              onClick={() => {
                setStep(3);
              }}
            />
          </header>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            <main className="w-full flex flex-col items-center justify-center">
              <h2 className="text-[8.5vw] min-[400px]:text-4xl font-bold text-black dark:text-[#ffffffdd] mt-12">
                Welcome to UpTodo
              </h2>
              <p className="text-[17px] text-black dark:text-[#ffffffdd] mt-6 max-w-md text-center relative z-10">
                Please login to your account or create a new account to continue
              </p>
            </main>
            <footer className="w-full sm:w-fit flex flex-col sm:flex-row items-center justify-between gap-8 mt-16">
              <Link href="login" className="w-full max-w-sm">
                <Button
                  label="Login"
                  onClick={() => {}}
                  filled
                  upperCase
                  small
                />
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
  }

  return <>{bodyContent}</>;
}
