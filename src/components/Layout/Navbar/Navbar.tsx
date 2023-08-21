'use clinet';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useTasksStore from '@/store/useTasksStore';

import NewTaskModal from '@/components/UI/Modals/NewTaskModal/NewTaskModal';

import { IndexIcon, CalendarIcon, FocusIcon, ProfileIcon } from './Icons';

const Navbar = () => {
  const currentPathName = usePathname();

  const [isNewTaskModal, setIsNewTaskModal] = useState<boolean>(false);
  const storeTodayAtDate = useTasksStore((state) => state.todayAtDate);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 z-40 h-20 w-full bg-gray-700 md:h-24">
      {isNewTaskModal && (
        <NewTaskModal
          isOpen={isNewTaskModal}
          onClose={() => setIsNewTaskModal((prev) => !prev)}
        />
      )}
      <div className="mx-auto grid h-full max-w-lg grid-cols-5 font-medium">
        <Link
          href="/home"
          className="group inline-flex flex-col items-center justify-center px-5"
        >
          <IndexIcon isActive={currentPathName === '/home'} />
          <span className="text-sm text-white-pale min-[475px]:text-base">
            Index
          </span>
        </Link>
        <Link
          href={`/calendar/incompleted/${storeTodayAtDate}`}
          className="group inline-flex flex-col items-center justify-center px-5"
        >
          <CalendarIcon isActive={currentPathName.includes('/calendar')} />
          <span className="text-sm text-white-pale min-[475px]:text-base">
            Calendar
          </span>
        </Link>
        <div className="flex items-center justify-center">
          <button
            data-tooltip-target="tooltip-new"
            type="button"
            className="group relative bottom-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple font-medium hover:bg-purple-dark min-[475px]:bottom-12 min-[475px]:h-[4.5rem] min-[475px]:w-[4.5rem]"
            onClick={() => setIsNewTaskModal((prev) => !prev)}
          >
            <svg
              className="h-6 w-6 text-white-pale"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            <span className="sr-only">New item</span>
          </button>
        </div>
        <Link
          href="/focus"
          className="group inline-flex flex-col items-center justify-center px-5"
        >
          <FocusIcon isActive={currentPathName === '/focus'} />
          <span className="text-sm text-white-pale min-[475px]:text-base">
            Focus
          </span>
        </Link>
        <Link
          href="/profile"
          className="group inline-flex flex-col items-center justify-center px-5"
        >
          <ProfileIcon />
          <span className="text-sm text-white-pale min-[475px]:text-base">
            Profile
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
