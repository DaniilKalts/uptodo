import React from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import Container from '../UI/Container';

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
      <div className="relative flex flex-col items-center justify-center min-h-screen py-10">
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
                className="mt-6 min-[475px]:w-80 md:w-96"
                priority
              />
              <div className="flex items-center justify-center gap-3 mt-16 w-36">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={`
                        ${
                          step === n
                            ? 'bg-[#000000dd] dark:bg-[#ffffffdd]'
                            : 'bg-[#AFAFAF]'
                        } 
                        w-[30%]
                        h-[6px] 
                        rounded-xl
                      `}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center md:ml-9">
              <h2 className="text-[1.75rem] font-bold text-[#3d3d3d] dark:text-[#ffffffdd] text-center mt-12 min-[475px]:text-4xl">
                {title}
              </h2>
              <p className="text-sm text-[#3d3d3d] dark:text-[#ffffffdd] mt-3 max-w-sm text-center relative z-10 min-[475px]:text-base min-[475px]:mt-6">
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
