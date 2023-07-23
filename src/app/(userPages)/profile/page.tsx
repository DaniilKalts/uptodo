'use client';

import React from 'react';

import Image from 'next/image';

import Container from '@/components/UI/Container';
import ProfileLink from '@/components/userPages/Profile/ProfileTypography';

import {
  SettingsIcon,
  ProfileNameIcon,
  ProfileImageIcon,
  ProfilePasswordIcon,
  AboutUsIcon,
  FaqIcon,
  FeedbackIcon,
  SupportIcon,
  LogOutIcon,
} from '@/components/userPages/Profile/Icons/Profile';

const Profile = () => (
  <div className="pb-36 md:pb-40">
    <Container>
      <div className="mx-auto mt-8 flex flex-col items-center justify-center">
        <header className="flex w-full flex-col items-center justify-center">
          <h6 className="mb-4 text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
            Profile
          </h6>
          <Image
            src="/images/home/demo_avatar.svg"
            className="mb-4 min-[475px]:w-32"
            width={96}
            height={96}
            alt="Avatar"
          />
          <h5 className="text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
            Kalts Daniil
          </h5>
          <div className="mt-6 flex w-full max-w-[375px] items-center justify-between gap-5">
            <div className="w-2/4 rounded-md border border-gray-700 bg-gray-700 px-6 py-4">
              <p className="text-center text-[15px] text-white-pale min-[475px]:text-lg">
                10 Task left
              </p>
            </div>
            <div className="w-2/4 rounded-md border border-gray-700 bg-gray-700 px-6 py-4">
              <p className="text-center text-[15px] text-white-pale min-[475px]:text-lg">
                5 Task done
              </p>
            </div>
          </div>
        </header>
        <main className="mt-6 flex w-full max-w-lg flex-col justify-start">
          <section className="mt-5">
            <h5 className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-lg">
              Settings
            </h5>
            <ProfileLink
              text="App Settings"
              link="profile/settings"
              svg={SettingsIcon}
            />
          </section>
          <section className="mt-5">
            <h5 className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-lg">
              Account
            </h5>
            <ProfileLink
              text="Change account name"
              link="profile"
              svg={ProfileNameIcon}
            />
            <ProfileLink
              text="Change account password"
              link="profile"
              svg={ProfilePasswordIcon}
            />
            <ProfileLink
              text="Change account Image"
              link="profile"
              svg={ProfileImageIcon}
            />
          </section>
          <section className="mt-5">
            <h5 className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-lg">
              Uptodo
            </h5>
            <ProfileLink text="About US" link="profile" svg={AboutUsIcon} />
            <ProfileLink text="FAQ" link="profile" svg={FaqIcon} />
            <ProfileLink
              text="Help & Feedback"
              link="profile"
              svg={FeedbackIcon}
            />
            <ProfileLink text="Support US" link="profile" svg={SupportIcon} />
            <ProfileLink text="Log out" link="login" svg={LogOutIcon} />
          </section>
        </main>
      </div>
    </Container>
  </div>
);

export default Profile;
