'use client';

import 'swiper/css';
import 'swiper/css/navigation';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import qs from 'query-string';

import Calendar from '@/components/userPages/Calendar/Calendar';
import { Container, Button } from '@/components/UI';

export default function CalendarLayout({
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

  return (
    <div className="pb-40 md:pb-44">
      <header className="mx-auto mb-4 mt-8 flex items-center justify-center">
        <h4 className="text-xl text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
          Calendar
        </h4>
      </header>
      <Calendar />
      <Container>
        <section className="mx-auto mt-7 max-w-[575px]">
          <div className="mx-auto flex w-full justify-center gap-4 rounded-md bg-gray-500 p-4 min-[500px]:gap-8 min-[525px]:w-11/12 min-[575px]:w-10/12">
            <Button
              label="Incompleted"
              onClick={() => onClick('incompleted')}
              filled={currentPathName.includes('/incompleted')}
              outline={
                currentPathName.includes('/incompleted') ? undefined : 'gray'
              }
            />
            <Button
              label="Completed"
              onClick={() => onClick('completed')}
              filled={currentPathName.includes('/completed')}
              outline={
                currentPathName.includes('/completed') ? undefined : 'gray'
              }
            />
          </div>
        </section>
      </Container>
      {children}
    </div>
  );
}
