'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { typographyDemos } from '@/utils/Typografies';

import PuffSpinner from '@/components/UI/Loadings/PuffSpinner';

import { AppTypographyIcon } from '@/components/userPages/Profile/Icons/Settings';
import Container from '@/components/UI/Container';

import BackIcon from '@/components/UI/Icons/BackIcon';
import { useTypography } from '@/hooks/useTypography';

const Settings = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  const { typographyName, changeTypographyName } = useTypography();

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 750);
  }, []);

  return (
    <div className="pb-36 md:pb-40">
      {mounted ? (
        <Container>
          <div className="mx-auto mt-8 flex flex-col items-center justify-center">
            <header className="relative flex w-full max-w-lg items-center justify-center">
              <Link href="/profile/settings" className="group">
                {BackIcon}
              </Link>
              <h4 className="text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
                Typography
              </h4>
            </header>
            <main className="mt-6 flex w-full max-w-lg flex-col justify-start">
              <div className="mt-5">
                <h5 className="text-lg text-gray-dark dark:text-gray-200 min-[475px]:text-xl">
                  Choose your font:
                </h5>
                <hr className="mb-4 mt-5 h-[2px] w-full rounded border-0 bg-gray-dark" />
                {typographyDemos.map(({ name, styleName }) => (
                  <div
                    key={name}
                    className="group flex w-full cursor-pointer items-center justify-between gap-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      {AppTypographyIcon}
                      <p
                        className={`${styleName} text-base capitalize text-gray-dark group-hover:text-black dark:text-white-pale dark:group-hover:text-white min-[475px]:text-lg`}
                      >
                        {name} Font Family
                      </p>
                    </div>
                    <input
                      id={name}
                      type="checkbox"
                      className="h-[22px] w-[22px] cursor-pointer"
                      onChange={() => changeTypographyName(name)}
                      checked={typographyName === name}
                    />
                  </div>
                ))}
              </div>
            </main>
          </div>
        </Container>
      ) : (
        <PuffSpinner />
      )}
    </div>
  );
};

export default Settings;
