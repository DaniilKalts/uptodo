import React from 'react';

import Image from 'next/image';

const Spinner = () => (
  <Image
    width={24}
    height={24}
    src="/images/icons/spinner.svg"
    alt="spinner"
    className="inline sm:w-7 sm:h-7 animate-spin"
  />
);

export default Spinner;
