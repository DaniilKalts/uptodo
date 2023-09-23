import './globals.css';

import React from 'react';
import { Metadata } from 'next';

import { ThemeProvider } from '@/providers/ThemeProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import FontProvider from '@/providers/FontProvider';

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
      <body className={'bg-white-pale dark:bg-black-pre'}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <FontProvider>
            <ToasterProvider />
            {children}
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
