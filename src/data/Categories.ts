import { CategoryType } from '@/types';

import {
  MdAdd,
  MdWorkOutline,
  MdDesignServices,
  MdOutlineSchool,
  MdPeopleOutline,
  MdSportsGymnastics,
} from 'react-icons/md';

import {
  IoHomeOutline,
  IoMusicalNotesOutline,
  IoFilmOutline,
  IoHeartOutline,
  IoStorefrontOutline,
} from 'react-icons/io5';

// eslint-disable-next-line import/prefer-default-export
export const categories: CategoryType[] = [
  {
    icon: IoStorefrontOutline,
    IconBgColor: '#CCFF80',
    IconColor: '#21A300',
    label: 'Grocery',
  },
  {
    icon: MdWorkOutline,
    IconBgColor: '#FF9680',
    IconColor: '#A31D00',
    label: 'Work',
  },
  {
    icon: MdSportsGymnastics,
    IconBgColor: '#80FFFF',
    IconColor: '#0069A3',
    label: 'Workout',
  },
  {
    icon: MdDesignServices,
    IconBgColor: '#80FFD9',
    IconColor: '#00A372',
    label: 'Design',
  },
  {
    icon: MdOutlineSchool,
    IconBgColor: '#809CFF',
    IconColor: '#0055A3',
    label: 'University',
  },
  {
    icon: MdPeopleOutline,
    IconBgColor: '#FF80EB',
    IconColor: '#A30089',
    label: 'Social',
  },
  {
    icon: IoMusicalNotesOutline,
    IconBgColor: '#FC80FF',
    IconColor: '#A000A3',
    label: 'Musick',
  },
  {
    icon: IoHeartOutline,
    IconBgColor: '#80FFA3',
    IconColor: '#00A3A3',
    label: 'Health',
  },
  {
    icon: IoFilmOutline,
    IconBgColor: '#80D1FF',
    IconColor: '#0069A3',
    label: 'Movie',
  },
  {
    icon: IoHomeOutline,
    IconBgColor: '#FF8080',
    IconColor: '#A30000',
    label: 'Home',
  },
  {
    icon: MdAdd,
    IconBgColor: '#80FFD1',
    IconColor: '#00A369',
    label: 'Create New',
  },
];
