/* eslint-disable @typescript-eslint/indent */

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import Navbar from '@/components/Layout/Navbar/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPathName = usePathname();

  return (
    <>
      {children}
      {!currentPathName.includes('/tasks') &&
      !currentPathName.includes('/create-category') ? (
        <Navbar />
      ) : null}
    </>
  );
}
