import { CategoryType } from '@/types';

import {
  AddIcon,
  DesignIcon,
  GroceryIcon,
  HealthIcon,
  HomeIcon,
  MovieIcon,
  MusickIcon,
  SocialIcon,
  UniversityIcon,
  WorkIcon,
  WorkoutIcon,
} from '@/components/UI/Icons/Categories';

// eslint-disable-next-line import/prefer-default-export
export const categories: CategoryType[] = [
  {
    icon: GroceryIcon,
    bgColor: 'lemon-chiffon',
    label: 'Grocery',
    IconStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
  },
  {
    icon: WorkIcon,
    bgColor: 'beige-light',
    label: 'Work',
    IconStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
  },
  {
    icon: WorkoutIcon,
    bgColor: 'cyan-light',
    label: 'Workout',
    IconStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
  },
  {
    icon: DesignIcon,
    bgColor: 'aquamarine-mist',
    label: 'Design',
    IconStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
  },
  {
    icon: UniversityIcon,
    bgColor: 'blue-light',
    label: 'University',
    IconStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
  },
  {
    icon: SocialIcon,
    bgColor: 'raspberry-sorbet',
    label: 'Social',
    IconStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
  },
  {
    icon: MusickIcon,
    bgColor: 'pink-light',
    label: 'Musick',
    IconStyles: 'w-7 h-7 min-[475px]:w-9 min-[475px]:h-9',
  },
  {
    icon: HealthIcon,
    bgColor: 'mint-light',
    label: 'Health',
    IconStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
  },
  {
    icon: MovieIcon,
    bgColor: 'sky-blue',
    label: 'Movie',
    IconStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
  },
  {
    icon: HomeIcon,
    bgColor: 'coral-pink',
    label: 'Home',
    IconStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
  },
  {
    icon: AddIcon,
    bgColor: 'turquoise-haze',
    label: 'Create New',
    IconStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
  },
];
