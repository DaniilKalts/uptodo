/* eslint-disable import/prefer-default-export */
import {
  Patrick_Hand,
  Ubuntu,
  Lato,
  Nunito,
  Ysabeau_Office,
  Caveat_Brush,
  Josefin_Sans,
  Inconsolata,
} from 'next/font/google';

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  weight: ['400'],
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

const ysabeauOffice = Ysabeau_Office({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const caveatBrush = Caveat_Brush({
  subsets: ['latin'],
  weight: ['400'],
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
    name: 'patrickHand',
    styleName: patrickHand.className,
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
    name: 'ysabeauOffice',
    styleName: ysabeauOffice.className,
  },
  {
    name: 'raleway',
    styleName: caveatBrush.className,
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
