'use client';

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="max-w-[2520px] mx-auto xl:px-20 md:px-12 px-8">
    {children}
  </div>
);

export default Container;
