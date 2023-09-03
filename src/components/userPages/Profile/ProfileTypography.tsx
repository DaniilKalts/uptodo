import React from 'react';
import Link from 'next/link';

import { cn } from '@/utils/Cn';

interface ProfileTypographyInterface {
  text: string;
  onClick?: () => void;
  link?: string;
  svg: React.ReactNode;
}

const ProfileTypography: React.FC<ProfileTypographyInterface> = ({
  text,
  onClick,
  link,
  svg,
}) => {
  const bodyContent = (
    <>
      <div className="flex items-center gap-3">
        {svg}
        <p
          className={cn('text-base min-[475px]:text-lg', {
            'text-gray-dark group-hover:text-black dark:text-white-pale dark:group-hover:text-white':
              text !== 'Log out',
            'text-red group-hover:text-red-dark': text === 'Log out',
          })}
        >
          {text}
        </p>
      </div>
      {text !== 'Log out' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-gray-dark group-hover:text-black dark:text-white-pale dark:group-hover:text-white"
        >
          <path
            d="M8.99997 3.32998C9.18997 3.32998 9.37997 3.39998 9.52997 3.54998L16.05 10.07C17.11 11.13 17.11 12.87 16.05 13.93L9.52997 20.45C9.23997 20.74 8.75997 20.74 8.46997 20.45C8.17997 20.16 8.17997 19.68 8.46997 19.39L14.99 12.87C15.47 12.39 15.47 11.61 14.99 11.13L8.46997 4.60998C8.17997 4.31998 8.17997 3.83998 8.46997 3.54998C8.61997 3.40998 8.80997 3.32998 8.99997 3.32998Z"
            fill="currentColor"
          />
        </svg>
      )}
    </>
  );

  return (
    <>
      {link && (
        <Link
          className="group flex w-full items-center justify-between py-3"
          href={link}
        >
          {bodyContent}
        </Link>
      )}
      {!link && onClick && (
        <div
          className="group flex w-full cursor-pointer items-center justify-between py-3"
          onClick={onClick}
        >
          {bodyContent}
        </div>
      )}
    </>
  );
};

export default ProfileTypography;
