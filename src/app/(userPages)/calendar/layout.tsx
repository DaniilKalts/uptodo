'use client';

import 'swiper/css';
import 'swiper/css/navigation';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import qs from 'query-string';

import Container from '@/components/UI/Container';
import { Button } from '@/components/UI';
import Calendar from '@/components/userPages/Calendar/Calendar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const currentPathName = usePathname();

  const onClick = (route: 'incompleted' | 'completed') => {
    let newRoute = window.location.href;

    if (route === 'incompleted') {
      if (newRoute.includes('incompleted')) {
        return;
      }
      newRoute = newRoute.replace('completed', 'incompleted');
    } else if (route === 'completed') {
      newRoute = newRoute.replace('incompleted', 'completed');
    }

    const url = qs.stringifyUrl(
      {
        url: newRoute,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="pb-40 md:pb-44">
      <header className="mx-auto mb-4 mt-8 flex items-center justify-center">
        <h4 className="text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
          Calendar
        </h4>
      </header>
      <Calendar />
      <Container>
        <section className="mx-auto max-w-[575px]">
          <div className="mx-auto mt-7 flex w-full justify-center gap-4 rounded-md bg-gray-500 p-4 min-[475px]:gap-8 min-[525px]:w-11/12 min-[575px]:w-10/12">
            {currentPathName.includes('incompleted') ? (
              <Button
                label="Incompleted"
                onClick={() => onClick('incompleted')}
                filled
              />
            ) : (
              <Button
                label="Incompleted"
                onClick={() => onClick('incompleted')}
                outline="gray"
              />
            )}
            {currentPathName.includes('/completed') ? (
              <Button
                label="Completed"
                onClick={() => onClick('completed')}
                filled
              />
            ) : (
              <Button
                label="Completed"
                onClick={() => onClick('completed')}
                outline="gray"
              />
            )}
          </div>
        </section>
      </Container>
      {children}
    </div>
  );
}
