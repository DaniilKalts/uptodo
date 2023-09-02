/* eslint-disable import/prefer-default-export */
import {
  Kanit,
  Ubuntu,
  Lato,
  Nunito,
  Montserrat,
  Raleway,
  Josefin_Sans,
  Inconsolata,
} from 'next/font/google';

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const typographyDemos = [
  {
    name: 'kanit',
    styleName: kanit.className,
  },
  {
    name: 'ubuntu',
    styleName: ubuntu.className,
  },
  {
    name: 'lato',
    styleName: lato.className,
  },
  {
    name: 'nunito',
    styleName: nunito.className,
  },
  {
    name: 'montserrat',
    styleName: montserrat.className,
  },
  {
    name: 'raleway',
    styleName: raleway.className,
  },
  {
    name: 'josefinSans',
    styleName: josefinSans.className,
  },
  {
    name: 'inconsolata',
    styleName: inconsolata.className,
  },
];
