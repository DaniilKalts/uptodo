'use client';

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="mx-auto max-w-[2520px] px-8 md:px-12 xl:px-20">
    {children}
  </div>
);

export default Container;
