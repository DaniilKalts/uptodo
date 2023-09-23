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
      {currentPathName !== '/create-category' ? <Navbar /> : null}
    </>
  );
}
