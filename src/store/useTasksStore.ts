import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

import { TaskType } from '@/types';

interface TaskStoreInterface {
  incompletedTasks: TaskType[];
  completedTasks: TaskType[];
  addIncompletedTask: (incompletedTask: TaskType) => void;
  addCompletedTask: (completedTask: TaskType) => void;
  removeIncompletedTask: (incompletedTaskId: number) => void;
  removeCompletedTask: (completedTaskId: number) => void;
  updateIncompletedTask: (updatedIncompletedTask: TaskType) => void;
  updateCompletedTask: (updatedCompletedTask: TaskType) => void;
}

type MyPersist = (
  config: StateCreator<TaskStoreInterface>,
  options: PersistOptions<TaskStoreInterface>,
) => StateCreator<TaskStoreInterface>;

const useTasksStore = create<TaskStoreInterface, []>(
  (persist as MyPersist)(
    (set): TaskStoreInterface => ({
      incompletedTasks: [],
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
      removeIncompletedTask: (incompletedTaskId: number) =>
        set((state) => ({
          incompletedTasks: [...state.incompletedTasks].filter(
            (task: TaskType) => task.id !== incompletedTaskId,
          ),
        })),
      removeCompletedTask: (completedTaskId: number) =>
        set((state) => ({
          completedTasks: [...state.completedTasks].filter(
            (task: TaskType) => task.id !== completedTaskId,
          ),
        })),
      updateIncompletedTask: (updatedIncompletedTask: TaskType) =>
        set((state) => ({
          incompletedTasks: [...state.incompletedTasks]
            .filter((task: TaskType) => task.id !== updatedIncompletedTask.id)
            .concat(updatedIncompletedTask),
        })),
      updateCompletedTask: (updatedCompletedTask: TaskType) =>
        set((state) => ({
          completedTasks: [...state.completedTasks]
            .filter((task: TaskType) => task.id !== updatedCompletedTask.id)
            .concat(updatedCompletedTask),
        })),
    }),
    { name: 'tasks' },
  ),
);

export default useTasksStore;
