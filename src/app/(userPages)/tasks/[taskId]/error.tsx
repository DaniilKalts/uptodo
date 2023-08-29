'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/UI';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 pb-20 min-[475px]:pb-24">
      <h2 className="w-4/5 text-center text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
        Something went wrong &#128532; <br />
        We are working on this error!
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
}
