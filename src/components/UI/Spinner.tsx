import React from 'react';

import Image from 'next/image';

const Spinner = () => (
  <Image
    width={24}
    height={24}
    src="/images/icons/spinner.svg"
    alt="spinner"
    className="inline animate-spin sm:h-7 sm:w-7"
  />
);

export default Spinner;
