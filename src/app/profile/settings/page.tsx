'use client';

import React from 'react';

import Link from 'next/link';

import Container from '@/components/UI/Container';
import ProfileLink from '@/components/Profile/ProfileTypography';
import Navbar from '@/components/Layout/Navbar/Navbar';

import {
  AppColorIcon,
  AppLanguageIcon,
  AppTypographyIcon,
  GoogleCalendarIcon,
} from '@/components/Profile/Icons/Settings';
import BackIcon from '@/components/UI/Icons/BackIcon';

const Settings = () => (
  <div className="pb-36 md:pb-40">
    <Container>
      <div className="mx-auto mt-8 flex flex-col items-center justify-center">
        <header className="relative flex w-full max-w-lg items-center justify-center">
          <Link href="/profile" className="group">
            {BackIcon}
          </Link>
          <h6 className="text-xl text-[#3d3d3d] dark:text-[#ffffffdd] min-[475px]:text-2xl">
            Settings
          </h6>
        </header>
        <main className="mt-6 flex w-full max-w-lg flex-col justify-start">
          <div className="mt-5">
            <h5 className="text-sm text-[#3d3d3d] dark:text-[#AFAFAF] min-[475px]:text-lg">
              Settings
            </h5>
            <ProfileLink
              text="Change app color"
              onClick={() => document.documentElement.classList.toggle('dark')}
              svg={AppColorIcon}
            />
          </div>
          <div className="mt-5">
            <h5 className="text-sm text-[#3d3d3d] dark:text-[#AFAFAF] min-[475px]:text-lg">
              Account
            </h5>
            <ProfileLink
              text="Change app typography"
              link="/profile"
              svg={AppTypographyIcon}
            />
            <ProfileLink
              text="Change app language"
              link="/profile"
              svg={AppLanguageIcon}
            />
            <ProfileLink
              text="Import from Google calendar"
              link="/profile"
              svg={GoogleCalendarIcon}
            />
          </div>
        </main>
      </div>
    </Container>
    <Navbar />
  </div>
);

export default Settings;
