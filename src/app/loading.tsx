'use client';

import React, { CSSProperties } from 'react';

import { useMediaQuery } from 'react-responsive';

import { PuffLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  marginTop: '28px',
};

const Loading = () => {
  const isMobileDevice = useMediaQuery({ maxWidth: 475 });

  return (
    <div className="fixed left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 transform">
      <PuffLoader
        color={'#8875FF'}
        cssOverride={override}
        size={isMobileDevice ? 120 : 150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
