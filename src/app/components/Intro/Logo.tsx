import Image from 'next/image';

const Logo = () => (
  <Image
    src="/images/intro/logo.svg"
    width={112}
    height={112}
    alt="Logo"
    className="sm:w-32"
    priority
  />
);

export default Logo;
