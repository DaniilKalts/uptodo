import React from 'react';

import Image from 'next/image';
import { motion } from 'framer-motion';

import Container from '../Container';

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
        return 305;
      case 3:
        return 305;
      default:
        return 256;
    }
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        {header}
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -70 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={imageSrc}
                width={imageSize()}
                height={imageSize()}
                alt="Management"
                className="min-[475px]:w-80 md:w-96 mt-6"
                priority
              />
              <div className="flex items-center justify-center gap-3 w-36 mt-16">
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
              <h2 className="text-[8.5vw] min-[400px]:text-4xl font-bold text-black dark:text-[#ffffffdd] mt-12">
                {title}
              </h2>
              <p className="text-[17px] text-black dark:text-[#ffffffdd] mt-6 max-w-md text-center relative z-10">
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
