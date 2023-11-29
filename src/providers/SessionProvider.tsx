/* eslint-disable import/prefer-default-export */

'use client';

import { SessionProvider as Provider } from 'next-auth/react';
import React from 'react';

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <Provider>{children}</Provider>;
