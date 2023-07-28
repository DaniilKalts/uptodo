import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CompletedTaskInterface, IncompletedTaskInterface } from '@/types';
import GroceryIcon from '@/components/userPages/Calendar/Icons/GroceryIcon';
import WorkIcon from '@/components/userPages/Calendar/Icons/WorkIcon';
import HealthIcon from '@/components/userPages/Calendar/Icons/HealthIcon';
import UniversityIcon from '@/components/userPages/Calendar/Icons/UniversityIcon';

const useTasksStore = create(
  persist(
    (set: any) => ({
      incompletedTasks: [
        {
          id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
          title: 'Do math homework',
          deadline: new Date(2023, 6, 27, 18, 45).getTime(),
          category: {
            icon: UniversityIcon,
            bgColor: '#809CFF',
            label: 'University',
          },
          priority: 10,
        },
        {
          id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
          title: 'Have a meeting',
          deadline: new Date(2023, 6, 27, 19, 45).getTime(),
          category: {
            icon: WorkIcon,
            bgColor: '#FF9680',
            label: 'Work',
          },
          priority: 8,
        },
      ],
      completedTasks: [
        {
          id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
          title: 'Buy grocery',
          deadline: new Date(2023, 6, 27, 17, 45).getTime(),
          category: {
            icon: GroceryIcon,
            bgColor: '#CCFF80',
            label: 'Grocery',
          },
          priority: 1,
          completedAt: new Date(2023, 6, 27, 12, 40).getTime(),
        },
        {
          id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
          title: 'Go swimming',
          deadline: new Date(2023, 6, 27, 19, 45).getTime(),
          category: {
            icon: HealthIcon,
            bgColor: '#80FFA3',
            label: 'Health',
          },
          priority: 7,
          completedAt: new Date(2023, 6, 27, 11, 23).getTime(),
        },
      ],
      addCompletedTask: (completedTask: CompletedTaskInterface) =>
        set((state: any) => ({
          incompletedTasks: state.incompletedTasks.filter(
            (task: IncompletedTaskInterface) => task.id !== completedTask.id,
          ),
          completedTasks: [...state.completedTasks, completedTask],
        })),
      addIncompletedTask: (incompletedTask: CompletedTaskInterface) =>
        set((state: any) => ({
          completedTasks: state.completedTasks.filter(
            (task: CompletedTaskInterface) => task.id !== incompletedTask.id,
          ),
          incompletedTasks: [...state.incompletedTasks, incompletedTask],
        })),
    }),
    { name: 'tasks' },
  ),
);

export default useTasksStore;
