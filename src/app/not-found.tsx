/* eslint-disable no-console */

'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/UI';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className=" flex h-screen w-screen items-center justify-center">
      <div className="rounded-md px-12 py-20 shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="text-7xl font-bold text-purple min-[475px]:text-9xl">
            404
          </h1>
          <h6 className="my-2 text-center text-2xl font-bold text-gray-dark dark:text-white-pale md:text-3xl">
            <span className="text-red">Oops!</span> Page not found
          </h6>
          <p className="mb-8 text-center text-gray-dark dark:text-white-pale md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>
          <Button
            label="Go to the previous Page"
            onClick={() => router.back()}
            filled
          />
        </div>
      </div>
    </div>
  );
}
