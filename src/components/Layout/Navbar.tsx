'use clinet';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const currentRoute = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full h-20 bg-[#363636] md:h-24">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <Link
          href="home"
          className="inline-flex flex-col items-center justify-center px-5 group"
        >
          <svg
            className="w-6 h-6 mb-2 text-[#ffffffdd]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            {currentRoute === '/home' ? (
              <path
                d="M20.04 6.81994L14.28 2.78994C12.71 1.68994 10.3 1.74994 8.78999 2.91994L3.77999 6.82994C2.77999 7.60994 1.98999 9.20994 1.98999 10.4699V17.3699C1.98999 19.9199 4.05999 21.9999 6.60999 21.9999H17.39C19.94 21.9999 22.01 19.9299 22.01 17.3799V10.5999C22.01 9.24994 21.14 7.58994 20.04 6.81994ZM12.75 17.9999C12.75 18.4099 12.41 18.7499 12 18.7499C11.59 18.7499 11.25 18.4099 11.25 17.9999V14.9999C11.25 14.5899 11.59 14.2499 12 14.2499C12.41 14.2499 12.75 14.5899 12.75 14.9999V17.9999Z"
                fill="currentColor"
              />
            ) : (
              <>
                <path
                  d="M17.79 22.75H6.21C3.47 22.75 1.25 20.52 1.25 17.78V10.37C1.25 9.00997 2.09 7.29997 3.17 6.45997L8.56 2.25997C10.18 0.999974 12.77 0.939974 14.45 2.11997L20.63 6.44997C21.82 7.27997 22.75 9.05997 22.75 10.51V17.79C22.75 20.52 20.53 22.75 17.79 22.75ZM9.48 3.43997L4.09 7.63997C3.38 8.19997 2.75 9.46997 2.75 10.37V17.78C2.75 19.69 4.3 21.25 6.21 21.25H17.79C19.7 21.25 21.25 19.7 21.25 17.79V10.51C21.25 9.54997 20.56 8.21997 19.77 7.67997L13.59 3.34997C12.45 2.54997 10.57 2.58997 9.48 3.43997Z"
                  fill="currentColor"
                />
                <path
                  d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z"
                  fill="currentColor"
                />
              </>
            )}
          </svg>
          <span className="text-sm text-[#ffffffdd] min-[475px]:text-base">
            Index
          </span>
        </Link>
        <Link
          href="calendar"
          className="inline-flex flex-col items-center justify-center px-5 group"
        >
          <svg
            className="w-6 h-6 mb-2 text-[#ffffffdd]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            {currentRoute === '/calendar' ? (
              <>
                <path
                  fill="currentColor"
                  d="M16.75 3.56V2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.5h-6.5V2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.56c-2.7.25-4.01 1.86-4.21 4.25-.02.29.22.53.5.53h16.92c.29 0 .53-.25.5-.53-.2-2.39-1.51-4-4.21-4.25ZM20 9.84H4c-.55 0-1 .45-1 1V17c0 3 1.5 5 5 5h8c3.5 0 5-2 5-5v-6.16c0-.55-.45-1-1-1ZM9.21 18.21c-.05.04-.1.09-.15.12-.06.04-.12.07-.18.09-.06.03-.12.05-.18.06-.07.01-.13.02-.2.02-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71.1-.09.2-.16.33-.21.18-.08.38-.1.58-.06.06.01.12.03.18.06.06.02.12.05.18.09l.15.12c.18.19.29.45.29.71 0 .26-.11.52-.29.71Zm0-3.5c-.19.18-.45.29-.71.29-.26 0-.52-.11-.71-.29-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71.28-.28.72-.37 1.09-.21.13.05.24.12.33.21.18.19.29.45.29.71 0 .26-.11.52-.29.71Zm3.5 3.5c-.19.18-.45.29-.71.29-.26 0-.52-.11-.71-.29-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71.37-.37 1.05-.37 1.42 0 .18.19.29.45.29.71 0 .26-.11.52-.29.71Zm0-3.5-.15.12c-.06.04-.12.07-.18.09-.06.03-.12.05-.18.06-.07.01-.13.02-.2.02-.26 0-.52-.11-.71-.29-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71.09-.09.2-.16.33-.21.37-.16.81-.07 1.09.21.18.19.29.45.29.71 0 .26-.11.52-.29.71Zm3.5 3.5c-.19.18-.45.29-.71.29-.26 0-.52-.11-.71-.29-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71.37-.37 1.05-.37 1.42 0 .18.19.29.45.29.71 0 .26-.11.52-.29.71Zm0-3.5-.15.12c-.06.04-.12.07-.18.09-.06.03-.12.05-.18.06-.07.01-.14.02-.2.02-.26 0-.52-.11-.71-.29-.18-.19-.29-.45-.29-.71 0-.26.11-.52.29-.71.1-.09.2-.16.33-.21.18-.08.38-.1.58-.06.06.01.12.03.18.06.06.02.12.05.18.09l.15.12c.18.19.29.45.29.71 0 .26-.11.52-.29.71Z"
                />
              </>
            ) : (
              <>
                <path
                  fill="currentColor"
                  d="M8 5.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75ZM16 5.75c-.41 0-.75-.34-.75-.75V2c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75ZM8.5 14.5c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21-.18-.19-.29-.44-.29-.71 0-.13.03-.26.08-.38s.12-.23.21-.33c.1-.09.2-.16.33-.21.36-.15.81-.07 1.09.21.18.19.29.45.29.71 0 .06-.01.13-.02.2-.01.06-.03.12-.06.18-.02.06-.05.12-.09.18-.03.05-.08.1-.12.15-.19.18-.45.29-.71.29ZM12 14.5c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21-.18-.19-.29-.44-.29-.71 0-.13.03-.26.08-.38s.12-.23.21-.33c.1-.09.2-.16.33-.21.36-.16.81-.07 1.09.21.18.19.29.45.29.71 0 .06-.01.13-.02.2-.01.06-.03.12-.06.18-.02.06-.05.12-.09.18-.03.05-.08.1-.12.15-.19.18-.45.29-.71.29ZM15.5 14.5c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21l-.12-.15a.757.757 0 0 1-.09-.18.636.636 0 0 1-.06-.18c-.01-.07-.02-.14-.02-.2 0-.26.11-.52.29-.71.1-.09.2-.16.33-.21.37-.16.81-.07 1.09.21.18.19.29.45.29.71 0 .06-.01.13-.02.2-.01.06-.03.12-.06.18-.02.06-.05.12-.09.18-.03.05-.08.1-.12.15-.19.18-.45.29-.71.29ZM8.5 18c-.13 0-.26-.03-.38-.08s-.23-.12-.33-.21c-.18-.19-.29-.45-.29-.71 0-.13.03-.26.08-.38.05-.13.12-.24.21-.33.37-.37 1.05-.37 1.42 0 .18.19.29.45.29.71 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29ZM12 18c-.26 0-.52-.11-.71-.29-.18-.19-.29-.45-.29-.71 0-.13.03-.26.08-.38.05-.13.12-.24.21-.33.37-.37 1.05-.37 1.42 0 .09.09.16.2.21.33.05.12.08.25.08.38 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29ZM15.5 18c-.26 0-.52-.11-.71-.29a.933.933 0 0 1-.21-.33.995.995 0 0 1-.08-.38c0-.13.03-.26.08-.38.05-.13.12-.24.21-.33.23-.23.58-.34.9-.27.07.01.13.03.19.06.06.02.12.05.18.09.05.03.1.08.15.12.18.19.29.45.29.71 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29ZM20.5 9.84h-17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h17c.41 0 .75.34.75.75s-.34.75-.75.75Z"
                />
                <path
                  fill="currentColor"
                  d="M16 22.75H8c-3.65 0-5.75-2.1-5.75-5.75V8.5c0-3.65 2.1-5.75 5.75-5.75h8c3.65 0 5.75 2.1 5.75 5.75V17c0 3.65-2.1 5.75-5.75 5.75ZM8 4.25c-2.86 0-4.25 1.39-4.25 4.25V17c0 2.86 1.39 4.25 4.25 4.25h8c2.86 0 4.25-1.39 4.25-4.25V8.5c0-2.86-1.39-4.25-4.25-4.25H8Z"
                />
              </>
            )}
          </svg>
          <span className="text-sm text-[#ffffffdd] min-[475px]:text-base">
            Calendar
          </span>
        </Link>
        <div className="flex items-center justify-center">
          <button
            data-tooltip-target="tooltip-new"
            type="button"
            className="relative inline-flex items-center bottom-10 justify-center w-16 h-16 font-medium bg-[#8875FF] rounded-full hover:bg-[#7969e1] group min-[475px]:bottom-12 min-[475px]:w-[4.5rem] min-[475px]:h-[4.5rem]"
          >
            <svg
              className="w-6 h-6 text-[#ffffffdd]"
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
          href="focus"
          className="inline-flex flex-col items-center justify-center px-5 group"
        >
          <svg
            className="w-6 h-6 mb-2 text-[#ffffffdd]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            {currentRoute === '/focus' ? (
              <>
                <path
                  d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.35 15.57C16.21 15.81 15.96 15.94 15.7 15.94C15.57 15.94 15.44 15.91 15.32 15.83L12.22 13.98C11.45 13.52 10.88 12.51 10.88 11.62V7.52C10.88 7.11 11.22 6.77 11.63 6.77C12.04 6.77 12.38 7.11 12.38 7.52V11.62C12.38 11.98 12.68 12.51 12.99 12.69L16.09 14.54C16.45 14.75 16.57 15.21 16.35 15.57Z"
                  fill="currentColor"
                />
              </>
            ) : (
              <>
                <path
                  d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                  fill="currentColor"
                />
                <path
                  d="M15.7099 15.93C15.5799 15.93 15.4499 15.9 15.3299 15.82L12.2299 13.97C11.4599 13.51 10.8899 12.5 10.8899 11.61V7.51001C10.8899 7.10001 11.2299 6.76001 11.6399 6.76001C12.0499 6.76001 12.3899 7.10001 12.3899 7.51001V11.61C12.3899 11.97 12.6899 12.5 12.9999 12.68L16.0999 14.53C16.4599 14.74 16.5699 15.2 16.3599 15.56C16.2099 15.8 15.9599 15.93 15.7099 15.93Z"
                  fill="currentColor"
                />
              </>
            )}
          </svg>
          <span className="text-sm text-[#ffffffdd] min-[475px]:text-base">
            Focus
          </span>
        </Link>
        <Link
          href="profile"
          className="inline-flex flex-col items-center justify-center px-5 group"
        >
          <svg
            className="w-6 h-6 mb-2 text-[#ffffffdd]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            {currentRoute === '/profile' ? (
              <>
                <path
                  d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z"
                  fill="currentColor"
                />
                <path
                  d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3202 15.75 12.0002 15.75C7.68015 15.75 4.16016 18.55 4.16016 22C4.16016 22.41 3.82016 22.75 3.41016 22.75C3.00016 22.75 2.66016 22.41 2.66016 22C2.66016 17.73 6.85015 14.25 12.0002 14.25C17.1502 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z"
                  fill="currentColor"
                />
              </>
            ) : (
              <>
                <path
                  d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z"
                  fill="currentColor"
                />
                <path
                  d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3202 15.75 12.0002 15.75C7.68015 15.75 4.16016 18.55 4.16016 22C4.16016 22.41 3.82016 22.75 3.41016 22.75C3.00016 22.75 2.66016 22.41 2.66016 22C2.66016 17.73 6.85015 14.25 12.0002 14.25C17.1502 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z"
                  fill="currentColor"
                />
              </>
            )}
          </svg>
          <span className="text-sm text-[#ffffffdd] min-[475px]:text-base">
            Profile
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
