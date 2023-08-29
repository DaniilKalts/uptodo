import './globals.css';

import React from 'react';

import { Metadata } from 'next';
import { Lato } from 'next/font/google';

import ToasterProvider from '@/providers/ToasterProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

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
  return (
    <html lang="en">
      <body className={`${lato.className} bg-white-pale dark:bg-black-pre`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ToasterProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
