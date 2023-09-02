'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import CalendarSkeleton from '@/components/UI/Loadings/CalendarSkeleton';
import PuffSpinner from '@/components/UI/Loadings/PuffSpinner';

export default function Loading() {
  const currentPathName = usePathname();

  return currentPathName.includes('/calendar') ? (
    <CalendarSkeleton />
  ) : (
    <PuffSpinner />
  );
}
