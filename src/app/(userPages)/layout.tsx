'use client';

import React from 'react';

import Navbar from '@/components/Layout/Navbar/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
