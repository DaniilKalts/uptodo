import './globals.css';

import React from 'react';

import { Metadata } from 'next';
import { Lato } from 'next/font/google';

import ToasterProvider from '@/providers/ToasterProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

import { cookies } from 'next/headers';
import { typographyDemos } from '@/utils/Typografies';

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: 'UpTodo 2023',
  description: 'A modern To-Do application built by Nextjs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const typographyName = cookieStore.get('typographyName')?.value;

  const appFont = typographyDemos.find(
    (demo) => demo.name === typographyName,
  )?.styleName;

  return (
    <html lang="en">
      <body
        className={`${
          appFont || lato.className
        } bg-white-pale dark:bg-black-pre`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ToasterProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
