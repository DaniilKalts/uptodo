'use client';

import React from 'react';
import Link from 'next/link';

import Container from '@/components/UI/Container';
import ProfileLink from '@/components/userPages/Profile/ProfileTypography';

import {
  AppColorIcon,
  AppLanguageIcon,
  AppTypographyIcon,
  GoogleCalendarIcon,
} from '@/components/userPages/Profile/Icons/Settings';
import BackIcon from '@/components/UI/Icons/BackIcon';

const Settings = () => (
  <div className="pb-36 md:pb-40">
    <Container>
      <div className="mx-auto mt-8 flex flex-col items-center justify-center">
        <header className="relative flex w-full max-w-lg items-center justify-center">
          <Link href="/profile" className="group">
            {BackIcon}
          </Link>
          <h4 className="text-xl text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
            Settings
          </h4>
        </header>
        <main className="mt-6 flex w-full max-w-lg flex-col justify-start">
          <div className="mt-5">
            <h5 className="text-sm text-gray-dark dark:text-gray-200 min-[500px]:text-lg">
              Settings
            </h5>
            <ProfileLink
              text="Change app color"
              link="/profile/settings/theme"
              svg={AppColorIcon}
            />
          </div>
          <div className="mt-5">
            <h5 className="text-sm text-gray-dark dark:text-gray-200 min-[500px]:text-lg">
              Account
            </h5>
            <ProfileLink
              text="Change app typography"
              link="/profile/settings/typography"
              svg={AppTypographyIcon}
            />
            <ProfileLink
              text="Change app language"
              link="/profile"
              svg={AppLanguageIcon}
            />
            <ProfileLink
              text="Export tasks in specific format"
              link="/profile/settings/export-format"
              svg={GoogleCalendarIcon}
            />
          </div>
        </main>
      </div>
    </Container>
  </div>
);

export default Settings;
