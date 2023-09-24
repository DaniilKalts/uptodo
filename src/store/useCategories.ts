import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

// import {
//   MdAdd,
//   MdWorkOutline,
//   MdDesignServices,
//   MdOutlineSchool,
//   MdPeopleOutline,
//   MdSportsGymnastics,
// } from 'react-icons/md';

// import {
//   IoHomeOutline,
//   IoMusicalNotesOutline,
//   IoFilmOutline,
//   IoHeartOutline,
//   IoStorefrontOutline,
// } from 'react-icons/io5';

import { CategoryType } from '@/types';

interface CategoriesStoreInterface {
  categories: CategoryType[];
  addCategory: (newCategory: CategoryType) => void;
  removeCategory: (oldCategory: CategoryType) => void;
}

type MyPersist = (
  config: StateCreator<CategoriesStoreInterface>,
  options: PersistOptions<CategoriesStoreInterface>,
) => StateCreator<CategoriesStoreInterface>;

const useCategoriesStore = create<CategoriesStoreInterface, []>(
  (persist as MyPersist)(
    (set): CategoriesStoreInterface => ({
      categories: [
        {
          icon: 'IoStorefrontOutline',
          iconBgColor: '#CCFF80',
          iconColor: '#21A300',
          label: 'Grocery',
        },
        {
          icon: 'MdWorkOutline',
          iconBgColor: '#FF9680',
          iconColor: '#A31D00',
          label: 'Work',
        },
        {
          icon: 'MdSportsGymnastics',
          iconBgColor: '#80FFFF',
          iconColor: '#0069A3',
          label: 'Workout',
        },
        {
          icon: 'MdDesignServices',
          iconBgColor: '#80FFD9',
          iconColor: '#00A372',
          label: 'Design',
        },
        {
          icon: 'MdOutlineSchool',
          iconBgColor: '#809CFF',
          iconColor: '#0055A3',
          label: 'University',
        },
        {
          icon: 'MdPeopleOutline',
          iconBgColor: '#FF80EB',
          iconColor: '#A30089',
          label: 'Social',
        },
        {
          icon: 'IoMusicalNotesOutline',
          iconBgColor: '#FC80FF',
          iconColor: '#A000A3',
          label: 'Musick',
        },
        {
          icon: 'IoHeartOutline',
          iconBgColor: '#80FFA3',
          iconColor: '#00A3A3',
          label: 'Health',
        },
        {
          icon: 'IoFilmOutline',
          iconBgColor: '#80D1FF',
          iconColor: '#0069A3',
          label: 'Movie',
        },
        {
          icon: 'IoHomeOutline',
          iconBgColor: '#FF8080',
          iconColor: '#A30000',
          label: 'Home',
        },
        {
          icon: 'MdAdd',
          iconBgColor: '#80FFD1',
          iconColor: '#00A369',
          label: 'Create New',
        },
      ],
      addCategory: (newCategory: CategoryType) =>
        set((state) => ({
          categories: [newCategory, ...state.categories].filter(
            (item, index, self) => self.indexOf(item) === index,
          ),
        })),
      removeCategory: (oldCategory: CategoryType) =>
        set((state) => ({
          categories: state.categories.filter(
            (category) => category.icon !== oldCategory.icon,
          ),
        })),
    }),
    { name: 'categories' },
  ),
);

export default useCategoriesStore;
