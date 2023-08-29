'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/UI';

const Tasks = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 pb-20 min-[475px]:pb-24">
      <h2 className="w-4/5 text-center text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
        Hey! You should provide a valid TaskID!
      </h2>
      <div className="max-w-xs">
        <Button
          label="Go to the previous Page"
          onClick={() => router.back()}
          filled
        />
      </div>
    </div>
  );
};

export default Tasks;
