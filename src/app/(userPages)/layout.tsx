'use client';

import React, { useCallback } from 'react';
import { Lato } from 'next/font/google';

import Navbar from '@/components/Layout/Navbar/Navbar';
import { useTypography } from '@/hooks/useTypography';
import { typographyDemos } from '@/utils/Typografies';

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { typographyName } = useTypography();

  const getTypographyFont = useCallback(
    () =>
      typographyDemos.find((demo) => demo.name === typographyName)?.styleName ||
      lato.className,
    [typographyName],
  );

  return (
    <div className={`${getTypographyFont()}`}>
      {children}
      <Navbar />
    </div>
  );
}
