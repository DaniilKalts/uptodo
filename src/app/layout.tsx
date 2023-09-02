import './globals.css';

import React from 'react';

import { Metadata } from 'next';

import ToasterProvider from '@/providers/ToasterProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'UpTodo 2023',
  description: 'A modern To-Do application built by Nextjs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={`${lato.className} bg-white-pale dark:bg-black-pre`}> */}
      <body className={'bg-white-pale dark:bg-black-pre'}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ToasterProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
