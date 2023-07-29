import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CompletedTaskInterface, IncompletedTaskInterface } from '@/types';
import {
  HealthIcon,
  UniversityIcon,
  WorkIcon,
  WorkoutIcon,
} from '@/components/UI/Icons/Categories';
import GroceryIcon from '@/components/UI/Icons/Categories/GroceryIcon';

const useTasksStore = create(
  persist(
    (set: any) => ({
      incompletedTasks: [
        {
          id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
          title: 'Do math homework',
          todayAt: new Date(2023, 6, 29, 8, 45).getTime(),
          category: {
            icon: UniversityIcon,
            bgColor: 'blue-light',
            label: 'University',
          },
          priority: 7,
        },
        {
          id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
          title: 'Go swimming',
          todayAt: new Date(2023, 6, 29, 14, 45).getTime(),
          category: {
            icon: HealthIcon,
            bgColor: 'mint-light',
            label: 'Health',
          },
          priority: 10,
        },
        {
          id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
          title: 'Buy grocery',
          todayAt: new Date(2023, 6, 29, 18, 0).getTime(),
          category: {
            icon: GroceryIcon,
            bgColor: 'lemon-chiffon',
            label: 'Grocery',
          },
          priority: 3,
        },
        {
          id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
          title: 'Have a meeting',
          todayAt: new Date(2023, 6, 29, 19, 15).getTime(),
          category: {
            icon: WorkIcon,
            bgColor: 'beige-light',
            label: 'Work',
          },
          priority: 10,
        },
        {
          id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
          title: 'Do workout',
          todayAt: new Date(2023, 6, 29, 20, 35).getTime(),
          category: {
            icon: WorkoutIcon,
            bgColor: 'cyan-light',
            label: 'Workout',
          },
          priority: 8,
        },
      ],
      completedTasks: [],
      addIncompletedTask: (incompletedTask: CompletedTaskInterface) =>
        set((state: any) => ({
          completedTasks: state.completedTasks.filter(
            (task: CompletedTaskInterface) => task.id !== incompletedTask.id,
          ),
          incompletedTasks: [incompletedTask, ...state.incompletedTasks].sort(
            (
              taskA: IncompletedTaskInterface,
              taskB: IncompletedTaskInterface,
            ) => taskA.todayAt - taskB.todayAt,
          ),
        })),
      addCompletedTask: (completedTask: CompletedTaskInterface) =>
        set((state: any) => ({
          incompletedTasks: state.incompletedTasks
            .filter(
              (task: IncompletedTaskInterface) => task.id !== completedTask.id,
            )
            .sort(
              (
                taskA: IncompletedTaskInterface,
                taskB: IncompletedTaskInterface,
              ) => taskA.todayAt - taskB.todayAt,
            ),
          completedTasks: [completedTask, ...state.completedTasks],
        })),
    }),
    { name: 'tasks' },
  ),
);

export default useTasksStore;
