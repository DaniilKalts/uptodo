'use client';

import React from 'react';

import Link from 'next/link';

import Navbar from '@/components/Layout/Navbar';
import Container from '@/components/UI/Container';
import ProfileLink from '@/components/Profile/ProfileTypography';

const Settings = () => (
  <div className="pb-36 md:pb-40">
    <Container>
      <div className="flex flex-col items-center justify-center mx-auto mt-8">
        <header className="relative flex items-center justify-center w-full max-w-lg">
          <Link href="profile" className="group">
            <svg
              className="absolute left-0 top-1 text-[#3d3d3d] dark:text-[#ffffffdd] dark:group-hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 20.67C14.81 20.67 14.62 20.6 14.47 20.45L7.95003 13.93C6.89003 12.87 6.89003 11.13 7.95003 10.07L14.47 3.55002C14.76 3.26002 15.24 3.26002 15.53 3.55002C15.82 3.84002 15.82 4.32002 15.53 4.61002L9.01003 11.13C8.53003 11.61 8.53003 12.39 9.01003 12.87L15.53 19.39C15.82 19.68 15.82 20.16 15.53 20.45C15.38 20.59 15.19 20.67 15 20.67Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <h6 className="text-xl text-[#3d3d3d] dark:text-[#ffffffdd] min-[475px]:text-2xl">
            Settings
          </h6>
        </header>
        <main className="flex flex-col justify-start w-full max-w-lg mt-6">
          <div className="mt-5">
            <h5 className="text-sm text-[#3d3d3d] dark:text-[#AFAFAF] min-[475px]:text-lg">
              Settings
            </h5>
            <ProfileLink
              text="Change app color"
              onClick={() => document.documentElement.classList.toggle('dark')}
              svg={
                <svg
                  className="text-[#3d3d3d] group-hover:text-black dark:text-[#ffffffdd] dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10.4299 18.3699C10.2799 18.3699 10.1399 18.3299 10.0099 18.2399C9.79991 18.0999 9.67991 17.8699 9.67991 17.6199C9.67991 17.4699 9.66991 17.3099 9.64991 17.1499C9.55991 16.4399 9.23991 15.8199 8.69991 15.2799C8.15991 14.7399 7.48991 14.3999 6.76991 14.3099C6.64991 14.2999 6.47991 14.2899 6.31991 14.2999C6.05991 14.3199 5.81991 14.2099 5.66991 13.9999C5.51991 13.7999 5.47991 13.5299 5.55991 13.2899C5.70991 12.8799 5.92991 12.5099 6.18991 12.2099L7.72991 10.2699C10.3799 6.95992 15.7499 2.97992 19.6799 1.39992C20.5099 1.07992 21.3999 1.26992 22.0099 1.86992C22.6399 2.49992 22.8299 3.39992 22.4999 4.21992C20.9199 8.15992 16.9499 13.5199 13.6399 16.1699L11.6699 17.7499C11.2999 18.0199 10.9999 18.1899 10.6999 18.3099C10.6199 18.3499 10.5199 18.3699 10.4299 18.3699ZM7.53991 12.9399C8.37991 13.1599 9.12991 13.5999 9.75991 14.2299C10.3899 14.8499 10.8099 15.5699 11.0199 16.3699L12.7099 15.0099C15.8499 12.4999 19.6199 7.40992 21.1099 3.66992C21.2599 3.29992 21.0499 3.03992 20.9499 2.94992C20.8799 2.87992 20.6199 2.65992 20.2199 2.80992C16.4999 4.30992 11.4099 8.07992 8.88991 11.2199L7.53991 12.9399Z"
                    fill="currentColor"
                  />
                  <path
                    d="M4.08011 22.7501C3.33011 22.7501 2.61011 22.4501 2.07011 21.9101C1.45011 21.2901 1.15011 20.4301 1.25011 19.5501L1.52011 17.0901C1.78011 14.6501 3.78011 12.8401 6.26011 12.7901C6.45011 12.7801 6.70011 12.7901 6.93011 12.8101C8.02011 12.9501 8.99011 13.4401 9.77011 14.2201C10.5401 14.9901 11.0001 15.9101 11.1401 16.9401C11.1701 17.1601 11.1901 17.4001 11.1901 17.6101C11.1901 18.9301 10.6801 20.1601 9.76011 21.0901C8.99011 21.8501 8.00011 22.3201 6.88011 22.4601L4.41011 22.7301C4.30011 22.7401 4.19011 22.7501 4.08011 22.7501ZM6.45011 14.3001C6.41011 14.3001 6.36011 14.3001 6.32011 14.3001C4.81011 14.3301 3.21011 15.3601 3.01011 17.2601L2.74011 19.7201C2.69011 20.1401 2.84011 20.5501 3.13011 20.8501C3.42011 21.1401 3.83011 21.2901 4.24011 21.2401L6.70011 20.9701C7.47011 20.8701 8.16011 20.5501 8.68011 20.0301C9.32011 19.3901 9.68011 18.5301 9.68011 17.6101C9.68011 17.4601 9.67011 17.3001 9.65011 17.1401C9.56011 16.4301 9.24011 15.8101 8.70011 15.2701C8.16011 14.7301 7.49011 14.3901 6.77011 14.3001C6.69011 14.3001 6.57011 14.3001 6.45011 14.3001Z"
                    fill="currentColor"
                  />
                  <path
                    d="M14.24 15.2202C13.83 15.2202 13.49 14.8802 13.49 14.4702C13.49 12.2702 11.7 10.4902 9.51001 10.4902C9.10001 10.4902 8.76001 10.1502 8.76001 9.74023C8.76001 9.33023 9.09001 8.99023 9.50001 8.99023C12.52 8.99023 14.98 11.4502 14.98 14.4702C14.99 14.8902 14.65 15.2202 14.24 15.2202Z"
                    fill="currentColor"
                  />
                </svg>
              }
            />
          </div>
          <div className="mt-5">
            <h5 className="text-sm text-[#3d3d3d] dark:text-[#AFAFAF] min-[475px]:text-lg">
              Account
            </h5>
            <ProfileLink
              text="Change app typography"
              link="profile"
              svg={
                <svg
                  className="text-[#3d3d3d] group-hover:text-black dark:text-[#ffffffdd] dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.3299 7.91979C20.9199 7.91979 20.5799 7.57979 20.5799 7.16979V5.34979C20.5799 4.61979 19.9899 4.02979 19.2599 4.02979H4.73992C4.00992 4.02979 3.41992 4.61979 3.41992 5.34979V7.17978C3.41992 7.58978 3.07992 7.92978 2.66992 7.92978C2.25992 7.92978 1.91992 7.58979 1.91992 7.16979V5.34979C1.91992 3.78979 3.18992 2.52979 4.73992 2.52979H19.2599C20.8199 2.52979 22.0799 3.79979 22.0799 5.34979V7.17978C22.0799 7.58978 21.7499 7.91979 21.3299 7.91979Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 21.4699C11.59 21.4699 11.25 21.1299 11.25 20.7199V4.10986C11.25 3.69986 11.59 3.35986 12 3.35986C12.41 3.35986 12.75 3.69986 12.75 4.10986V20.7199C12.75 21.1399 12.41 21.4699 12 21.4699Z"
                    fill="currentColor"
                  />
                  <path
                    d="M15.9401 21.4702H8.06006C7.65006 21.4702 7.31006 21.1302 7.31006 20.7202C7.31006 20.3102 7.65006 19.9702 8.06006 19.9702H15.9401C16.3501 19.9702 16.6901 20.3102 16.6901 20.7202C16.6901 21.1302 16.3501 21.4702 15.9401 21.4702Z"
                    fill="currentColor"
                  />
                </svg>
              }
            />
            <ProfileLink
              text="Change app language"
              link="profile"
              svg={
                <svg
                  className="text-[#3d3d3d] group-hover:text-black dark:text-[#ffffffdd] dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M16.99 9.71H7.01c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.98c.41 0 .75.34.75.75s-.34.75-.75.75Z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 9.71c-.41 0-.75-.34-.75-.75V7.28c0-.41.34-.75.75-.75s.75.34.75.75v1.68c0 .41-.34.75-.75.75ZM7 17.47c-.41 0-.75-.34-.75-.75s.34-.75.75-.75c3.72 0 6.75-3.15 6.75-7.03 0-.41.34-.75.75-.75s.75.34.75.75c0 4.71-3.7 8.53-8.25 8.53Z"
                  />
                  <path
                    fill="currentColor"
                    d="M17 17.47c-1.97 0-3.8-.98-5.14-2.77a.75.75 0 0 1 1.2-.9c1.06 1.4 2.46 2.17 3.95 2.17.41 0 .75.34.75.75s-.35.75-.76.75Z"
                  />
                  <path
                    fill="currentColor"
                    d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75Zm-6-20C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9Z"
                  />
                </svg>
              }
            />
            <ProfileLink
              text="Import from Google calendar"
              link="profile"
              svg={
                <svg
                  className="text-[#3d3d3d] group-hover:text-black dark:text-[#ffffffdd] dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.26 22.2498H8.73998C3.82998 22.2498 1.72998 20.1498 1.72998 15.2398V15.1098C1.72998 10.6698 3.47998 8.52978 7.39998 8.15978C7.79998 8.12978 8.17998 8.42978 8.21998 8.83978C8.25998 9.24978 7.95998 9.61978 7.53998 9.65978C4.39998 9.94978 3.22998 11.4298 3.22998 15.1198V15.2498C3.22998 19.3198 4.66998 20.7598 8.73998 20.7598H15.26C19.33 20.7598 20.77 19.3198 20.77 15.2498V15.1198C20.77 11.4098 19.58 9.92978 16.38 9.65978C15.97 9.61978 15.66 9.25978 15.7 8.84978C15.74 8.43978 16.09 8.12978 16.51 8.16978C20.49 8.50978 22.27 10.6598 22.27 15.1298V15.2598C22.27 20.1498 20.17 22.2498 15.26 22.2498Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 15.63C11.59 15.63 11.25 15.29 11.25 14.88V2C11.25 1.59 11.59 1.25 12 1.25C12.41 1.25 12.75 1.59 12.75 2V14.88C12.75 15.3 12.41 15.63 12 15.63Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.0001 16.7498C11.8101 16.7498 11.6201 16.6798 11.4701 16.5298L8.12009 13.1798C7.83009 12.8898 7.83009 12.4098 8.12009 12.1198C8.41009 11.8298 8.89009 11.8298 9.18009 12.1198L12.0001 14.9398L14.8201 12.1198C15.1101 11.8298 15.5901 11.8298 15.8801 12.1198C16.1701 12.4098 16.1701 12.8898 15.8801 13.1798L12.5301 16.5298C12.3801 16.6798 12.1901 16.7498 12.0001 16.7498Z"
                    fill="currentColor"
                  />
                </svg>
              }
            />
          </div>
        </main>
      </div>
    </Container>
    <Navbar />
  </div>
);

export default Settings;
