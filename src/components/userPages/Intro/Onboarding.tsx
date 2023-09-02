import React, { useCallback } from 'react';
import { Lato } from 'next/font/google';
import Image from 'next/image';

import { typographyDemos } from '@/utils/Typografies';

import { motion } from 'framer-motion';

import Container from '@/components/UI/Container';
import { useTypography } from '@/hooks/useTypography';

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

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
  const { typographyName } = useTypography();

  const getTypographyFont = useCallback(
    () =>
      typographyDemos.find((demo) => demo.name === typographyName)?.styleName ||
      lato.className,
    [typographyName],
  );

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
      <div
        className={`${getTypographyFont()} relative flex min-h-screen flex-col items-center justify-center py-10`}
      >
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
              <div className="mt-16 flex w-36 items-center justify-center gap-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={`
                        ${
                          step === n
                            ? 'bg-black-light dark:bg-white-pale'
                            : 'bg-gray-200'
                        } 
                        h-[6px]
                        w-[30%] 
                        rounded-xl
                      `}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center md:ml-9">
              <h2 className="mt-12 text-center text-[1.75rem] font-bold text-gray-dark dark:text-white-pale min-[475px]:text-4xl">
                {title}
              </h2>
              <p className="relative z-10 mt-3 max-w-sm text-center text-sm text-gray-dark dark:text-white-pale min-[475px]:mt-6 min-[475px]:text-base">
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
