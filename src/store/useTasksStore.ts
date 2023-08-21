import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

import { TaskType } from '@/types';
import {
  MovieIcon,
  HealthIcon,
  UniversityIcon,
  WorkIcon,
  WorkoutIcon,
} from '@/components/UI/Icons/Categories';
import GroceryIcon from '@/components/UI/Icons/Categories/GroceryIcon';

interface TaskStoreInterface {
  todayAtDate: number;
  setTodayAt: (time: number) => void;
  incompletedTasks: TaskType[];
  completedTasks: TaskType[];
  addIncompletedTask: (incompletedTask: TaskType) => void;
  addCompletedTask: (completedTask: TaskType) => void;
}

type MyPersist = (
  config: StateCreator<TaskStoreInterface>,
  options: PersistOptions<TaskStoreInterface>,
) => StateCreator<TaskStoreInterface>;

const useTasksStore = create<TaskStoreInterface, []>(
  (persist as MyPersist)(
    (set): TaskStoreInterface => ({
      todayAtDate: new Date().getTime(),
      setTodayAt: (time: number) =>
        set(() => ({
          todayAtDate: time,
        })),
      incompletedTasks: [
        {
          id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
          title: 'Watch Kungdu Panda 4',
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus accusamus maiores doloremque sed, ad dicta vel modi repudiandae? Obcaecati numquam voluptate nostrum velit excepturi voluptatum repellat ullam doloribus nihil cupiditate.',
          createdAt: new Date(2023, 7, 21, 6, 0).getTime(),
          todayAt: new Date(2023, 7, 21, 7, 15).getTime(),
          completedAt: 0,
          category: {
            icon: MovieIcon,
            bgColor: 'sky-blue',
            label: 'Movie',
          },
          priority: 7,
        },
        {
          id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
          title: 'Do math homework',
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus accusamus maiores doloremque sed, ad dicta vel modi repudiandae? Obcaecati numquam voluptate nostrum velit excepturi voluptatum repellat ullam doloribus nihil cupiditate.',
          createdAt: new Date(2023, 7, 21, 8, 45).getTime(),
          todayAt: new Date(2023, 7, 21, 9, 0).getTime(),
          completedAt: 0,
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
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus accusamus maiores doloremque sed, ad dicta vel modi repudiandae? Obcaecati numquam voluptate nostrum velit excepturi voluptatum repellat ullam doloribus nihil cupiditate.',
          createdAt: new Date(2023, 7, 21, 8, 48).getTime(),
          todayAt: new Date(2023, 7, 21, 14, 0).getTime(),
          completedAt: 0,
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
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus accusamus maiores doloremque sed, ad dicta vel modi repudiandae? Obcaecati numquam voluptate nostrum velit excepturi voluptatum repellat ullam doloribus nihil cupiditate.',
          createdAt: new Date(2023, 7, 21, 8, 51).getTime(),
          todayAt: new Date(2023, 7, 21, 15, 45).getTime(),
          completedAt: 0,
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
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus accusamus maiores doloremque sed, ad dicta vel modi repudiandae? Obcaecati numquam voluptate nostrum velit excepturi voluptatum repellat ullam doloribus nihil cupiditate.',
          createdAt: new Date(2023, 7, 21, 8, 53).getTime(),
          todayAt: new Date(2023, 7, 21, 17, 30).getTime(),
          completedAt: 0,
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
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus accusamus maiores doloremque sed, ad dicta vel modi repudiandae? Obcaecati numquam voluptate nostrum velit excepturi voluptatum repellat ullam doloribus nihil cupiditate.',
          createdAt: new Date(2023, 7, 21, 18, 45).getTime(),
          todayAt: new Date(2023, 7, 21, 19, 15).getTime(),
          completedAt: 0,
          category: {
            icon: WorkoutIcon,
            bgColor: 'cyan-light',
            label: 'Workout',
          },
          priority: 8,
        },
      ],
      completedTasks: [],
      addIncompletedTask: (incompletedTask: TaskType) =>
        set((state) => ({
          completedTasks: state.completedTasks.filter(
            (task: TaskType) => task.id !== incompletedTask.id,
          ),
          incompletedTasks: [incompletedTask, ...state.incompletedTasks].sort(
            (taskA: TaskType, taskB: TaskType) => taskA.todayAt - taskB.todayAt,
          ),
        })),
      addCompletedTask: (completedTask: TaskType) =>
        set((state) => ({
          incompletedTasks: state.incompletedTasks.filter(
            (task: TaskType) => task.id !== completedTask.id,
          ),
          completedTasks: [completedTask, ...state.completedTasks].sort(
            (taskA: TaskType, taskB: TaskType) => taskA.todayAt - taskB.todayAt,
          ),
        })),
    }),
    { name: 'tasks' },
  ),
);

export default useTasksStore;
