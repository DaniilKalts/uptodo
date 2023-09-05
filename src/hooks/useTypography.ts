import { useEffect, useState } from 'react';

import { parseCookies, setCookie } from 'nookies';

// eslint-disable-next-line import/prefer-default-export
export function useTypography() {
  const [typographyName, setTypographyName] = useState<any>('');

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies?.typographyName) {
      setTypographyName(cookies?.typographyName);
    }
  }, []);

  const changeTypographyName = (newFontName: string) => {
    setTypographyName(newFontName);

    setCookie(null, 'typographyName', newFontName, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  };

  return { typographyName, changeTypographyName };
}
