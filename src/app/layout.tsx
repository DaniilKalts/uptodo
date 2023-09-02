import './globals.css';

import React from 'react';

import { Metadata } from 'next';
import { Inconsolata } from 'next/font/google';

import ToasterProvider from '@/providers/ToasterProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

const inconsolata = Inconsolata({
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
      <body
        className={`${inconsolata.className} bg-white-pale dark:bg-black-pre`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ToasterProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
