import React from 'react';
import Image from 'next/image';

import { cn } from '@/utils/Cn';

import { motion } from 'framer-motion';

import Container from '@/components/UI/Container';

interface OnboardingProps {
  step: number;
  header: React.ReactElement;
  imageSrc: string;
  title: string;
  text: string;
  footer: React.ReactElement;
}

const Onboarding: React.FC<OnboardingProps> = ({
  step,
  header,
  imageSrc,
  title,
  text,
  footer,
}) => {
  const imageSize = () => {
    switch (step) {
      case 1:
        return 256;
      case 2:
        return 275;
      case 3:
        return 275;
      default:
        return 256;
    }
  };

  return (
    <Container>
      <div className="relative flex min-h-screen flex-col items-center justify-center py-10">
        {header}
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -70 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={imageSrc}
                width={imageSize()}
                height={imageSize()}
                alt="Management"
                className="mt-6 min-[500px]:w-80 md:w-96"
                priority
              />
              <div className="mt-16 flex w-36 items-center justify-center gap-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={cn(
                      'h-[6px] w-[30%] rounded-xl',
                      step === n
                        ? 'bg-black-light dark:bg-white-pale'
                        : 'bg-gray-200',
                    )}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center md:ml-9">
              <h2 className="mt-12 text-center text-[1.75rem] font-bold text-gray-dark dark:text-white-pale min-[500px]:text-4xl">
                {title}
              </h2>
              <p className="relative z-10 mt-3 max-w-sm text-center text-sm text-gray-dark dark:text-white-pale min-[500px]:mt-6 min-[500px]:text-base">
                {text}
              </p>
            </div>
          </div>
        </motion.div>
        {footer}
      </div>
    </Container>
  );
};

export default Onboarding;
