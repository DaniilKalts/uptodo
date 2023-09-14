'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import PuffSpinner from '@/components/UI/Loaders/PuffSpinner';
import Navbar from '@/components/Layout/Navbar/Navbar';

export default function Loading() {
  const currentPathName = usePathname();

  return currentPathName.includes('/calendar') ? <Navbar /> : <PuffSpinner />;
}
