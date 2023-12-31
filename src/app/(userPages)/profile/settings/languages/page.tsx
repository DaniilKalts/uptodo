'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Us, Kz, Ru } from 'react-flags-select';

import { Container } from '@/components/UI';
import BackIcon from '@/components/UI/Icons/BackIcon';

const LANGUAGES = [
  {
    lang: 'kazakh',
    icon: Kz,
  },
  {
    lang: 'english',
    icon: Us,
  },
  {
    lang: 'russian',
    icon: Ru,
  },
];

type LanguagesType = 'kazakh' | 'english' | 'russian';

const Languages = () => {
  const [language, setLanguage] = useState<LanguagesType>('english');

  return (
    <div className="pb-36 md:pb-40">
      <Container>
        <div className="mx-auto mt-8 flex flex-col items-center justify-center">
          <header className="relative flex w-full max-w-lg items-center justify-center">
            <Link href="/profile/settings" className="group">
              {BackIcon}
            </Link>
            <h4 className="text-xl text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
              Languages
            </h4>
          </header>
          <main className="mt-6 flex w-full max-w-lg flex-col justify-start">
            <div className="mt-5">
              <h5 className="text-lg text-gray-dark dark:text-gray-200 min-[500px]:text-xl">
                Choose your native language:
              </h5>
              <hr className="mb-4 mt-5 h-[2px] w-full rounded border-0 bg-gray-dark" />
              {LANGUAGES.map(({ lang, icon: Icon }) => (
                <div
                  key={lang}
                  className="group flex w-full cursor-pointer items-center justify-between gap-4 py-3"
                  onClick={() => setLanguage(lang as LanguagesType)}
                >
                  <div className="flex items-center gap-3">
                    {<Icon className="text-3xl" />}
                    <p
                      className={
                        'text-base capitalize text-gray-dark group-hover:text-black dark:text-white-pale dark:group-hover:text-white min-[500px]:text-lg'
                      }
                    >
                      {lang} Language
                    </p>
                  </div>
                  <input
                    id={lang}
                    type="checkbox"
                    className="h-[22px] w-[22px] cursor-pointer"
                    checked={language === lang}
                    onChange={() => {}}
                  />
                </div>
              ))}
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
};

export default Languages;
