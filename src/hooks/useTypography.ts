import { useState, useEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export
export function useTypography() {
  const [typographyName, setTypographyName] = useState<any>('');

  useEffect(() => {
    const typographyValue = localStorage.getItem('typographyName');
    setTypographyName(typographyValue);
  }, []);

  const changeTypographyName = (newFontName: string) => {
    setTypographyName(newFontName);
    localStorage.setItem('typographyName', newFontName);
  };

  return { typographyName, changeTypographyName };
}
