/* eslint-disable import/prefer-default-export */
import {
  Ubuntu,
  Nunito,
  Lato,
  Jost,
  Space_Grotesk,
  Inconsolata,
  Patrick_Hand,
  Caveat_Brush,
} from 'next/font/google';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  weight: ['400'],
});

const caveatBrush = Caveat_Brush({
  subsets: ['latin'],
  weight: ['400'],
});

export const typographyDemos = [
  {
    name: 'ubuntu',
    styleName: ubuntu.className,
  },
  {
    name: 'nunito',
    styleName: nunito.className,
  },
  {
    name: 'lato',
    styleName: lato.className,
  },
  {
    name: 'jost',
    styleName: jost.className,
  },
  {
    name: 'spaceGrotesk',
    styleName: spaceGrotesk.className,
  },
  {
    name: 'inconsolata',
    styleName: inconsolata.className,
  },
  {
    name: 'patrickHand',
    styleName: patrickHand.className,
  },
  {
    name: 'raleway',
    styleName: caveatBrush.className,
  },
];
