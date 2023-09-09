'use client';

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMediaQuery } from 'react-responsive';

import { motion } from 'framer-motion';

import Logo from '@/components/userPages/Intro/Logo';
import Onboarding from '@/components/userPages/Intro/Onboarding';
import Button from '@/components/UI/Button';

import step1 from '../../../public/images/intro/step1.svg';
import step2 from '../../../public/images/intro/step2.svg';
import step3 from '../../../public/images/intro/step3.svg';

enum STEPS {
  FIRST_SLIDE = 1,
  SECOND_SLIDE = 2,
  THIRD_SLIDE = 3,
}

export default function Home() {
  const isMobileDevice = useMediaQuery({ maxWidth: 992 });
  const [step, setStep] = useState<number | null>(null);

  const router = useRouter();

  let bodyContent = (
    <div className="flex h-screen flex-col items-center justify-center">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 15 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center"
      >
        <Logo />
        <h1 className="text-center text-[2.25rem] font-bold text-gray-dark dark:text-white sm:text-5xl">
          UpTodo
        </h1>
      </motion.div>
    </div>
  );

  useEffect(() => {
    setTimeout(() => {
      if (isMobileDevice) {
        router.push('welcome');
      } else {
        setStep(1);
      }
    }, 1625);
  }, [isMobileDevice, router]);

  if (STEPS.FIRST_SLIDE === step) {
    const HeaderContent = (
      <header className="absolute left-0 top-12">
        <Link
          href="welcome"
          className="cursor-pointer text-base text-gray-300 hover:text-gray-800 dark:hover:text-gray-400 min-[500px]:text-lg"
        >
          Skip
        </Link>
      </header>
    );

    const FooterContent = (
      <footer className="mt-10 flex w-full items-center justify-center min-[500px]:w-fit md:absolute md:bottom-12 md:right-10">
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
      <header className="absolute left-0 top-12">
        <Link
          href="welcome"
          className="cursor-pointer text-base text-gray-300 hover:text-gray-800 dark:hover:text-gray-400 min-[500px]:text-lg"
        >
          Skip
        </Link>
      </header>
    );

    const FooterContent = (
      <footer className="mt-10 flex w-full items-center justify-between  min-[500px]:w-fit min-[500px]:gap-8 md:absolute md:bottom-12 md:right-10">
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
      <header className="absolute left-0 top-12">
        <Link
          href="welcome"
          className="cursor-pointer text-base text-gray-300 hover:text-gray-800 dark:hover:text-gray-400 min-[500px]:text-lg"
        >
          Skip
        </Link>
      </header>
    );

    const FooterContent = (
      <footer className="mt-16 flex w-full items-center justify-between min-[500px]:w-fit min-[500px]:gap-8 md:absolute md:bottom-12 md:right-10">
        <Button
          label="Back"
          onClick={() => {
            setStep(2);
          }}
          upperCase
          small
        />
        <Link href="welcome" className="w-full max-w-sm">
          <Button
            label="Get Started"
            onClick={() => {}}
            filled
            upperCase
            small
          />
        </Link>
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

  return bodyContent;
}
