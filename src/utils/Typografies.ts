/* eslint-disable import/prefer-default-export */
import {
  Ubuntu,
  Mukta,
  Dosis,
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

const mukta = Mukta({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const dosis = Dosis({
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
    name: 'Space_Grotesk',
    styleName: spaceGrotesk.className,
  },
  {
    name: 'Inconsolata',
    styleName: inconsolata.className,
  },
  {
    name: 'Patrick_Hand',
    styleName: patrickHand.className,
  },
  {
    name: 'Ubuntu',
    styleName: ubuntu.className,
  },
  {
    name: 'Mukta',
    styleName: mukta.className,
  },
  {
    name: 'Raleway',
    styleName: caveatBrush.className,
  },
  {
    name: 'Lato',
    styleName: lato.className,
  },
  {
    name: 'Jost',
    styleName: jost.className,
  },
  {
    name: 'Dosis',
    styleName: dosis.className,
  },
];
