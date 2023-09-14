/* eslint-disable import/prefer-default-export */

'use client';

import React, { useState, useEffect } from 'react';
import { Lato } from 'next/font/google';

import { TypographyDemos } from '@/data/Typographies';

import { useCookies } from 'react-cookie';

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(['typographyName']);
  const [mounted, setMounted] = useState<boolean>(false);

  const typographyStyles = TypographyDemos.find(
    (demo) => demo.name === cookies?.typographyName,
  )?.styleName;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={mounted ? typographyStyles || lato.className : lato.className}
    >
      {children}
    </div>
  );
};

export default FontProvider;
