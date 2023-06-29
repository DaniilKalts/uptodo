import React from 'react';

import Image from 'next/image';

const Spinner = () => (
  <Image
    width={28}
    height={28}
    src="/images/icons/spinner.svg"
    alt="spinner"
    className="inline animate-spin"
  />
);

export default Spinner;
