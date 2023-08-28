'use client';

import React, { CSSProperties } from 'react';

import { PuffLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  marginTop: '28px',
};

const Loading = () => (
  <div className="fixed left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 transform">
    <PuffLoader
      color={'#8875FF'}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);

export default Loading;
