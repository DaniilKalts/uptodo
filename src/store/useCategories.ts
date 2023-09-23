import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

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

import { CategoryType } from '@/types';

interface CategoriesStoreInterface {
  categories: CategoryType[];
}

type MyPersist = (
  config: StateCreator<CategoriesStoreInterface>,
  options: PersistOptions<CategoriesStoreInterface>,
) => StateCreator<CategoriesStoreInterface>;

const useCategoriesStore = create<CategoriesStoreInterface, []>(
  (persist as MyPersist)(
    (): CategoriesStoreInterface => ({
      categories: [
        {
          icon: IoStorefrontOutline.toString(),
          IconBgColor: '#CCFF80',
          IconColor: '#21A300',
          label: 'Grocery',
        },
        {
          icon: MdWorkOutline.toString(),
          IconBgColor: '#FF9680',
          IconColor: '#A31D00',
          label: 'Work',
        },
        {
          icon: MdSportsGymnastics.toString(),
          IconBgColor: '#80FFFF',
          IconColor: '#0069A3',
          label: 'Workout',
        },
        {
          icon: MdDesignServices.toString(),
          IconBgColor: '#80FFD9',
          IconColor: '#00A372',
          label: 'Design',
        },
        {
          icon: MdOutlineSchool.toString(),
          IconBgColor: '#809CFF',
          IconColor: '#0055A3',
          label: 'University',
        },
        {
          icon: MdPeopleOutline.toString(),
          IconBgColor: '#FF80EB',
          IconColor: '#A30089',
          label: 'Social',
        },
        {
          icon: IoMusicalNotesOutline.toString(),
          IconBgColor: '#FC80FF',
          IconColor: '#A000A3',
          label: 'Musick',
        },
        {
          icon: IoHeartOutline.toString(),
          IconBgColor: '#80FFA3',
          IconColor: '#00A3A3',
          label: 'Health',
        },
        {
          icon: IoFilmOutline.toString(),
          IconBgColor: '#80D1FF',
          IconColor: '#0069A3',
          label: 'Movie',
        },
        {
          icon: IoHomeOutline.toString(),
          IconBgColor: '#FF8080',
          IconColor: '#A30000',
          label: 'Home',
        },
        {
          icon: MdAdd.toString(),
          IconBgColor: '#80FFD1',
          IconColor: '#00A369',
          label: 'Create New',
        },
      ],
    }),
    { name: 'categories' },
  ),
);

export default useCategoriesStore;
