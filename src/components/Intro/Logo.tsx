import Image from 'next/image';

const Logo = () => (
  <Image
    src="/images/intro/logo.svg"
    width={100}
    height={100}
    alt="Logo"
    className="sm:w-32"
    priority
  />
);

export default Logo;
