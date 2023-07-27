import { create } from 'zustand';

interface IncompletedTask {
  id: number;
  title: string;
  deadline: number;
  category: {
    label: string;
  };
  priority: number;
}

interface CompletedTask {
  id: number;
  title: string;
  deadline: number;
  completedAt: number;
  category: {
    label: string;
  };
  priority: number;
}

interface TasksState {
  incompletedTasks: IncompletedTask[];
  completedTasks: CompletedTask[];
  addCompletedTask: (CompletedTask: CompletedTask) => void;
  addIncompletedTask: (IncompletedTask: IncompletedTask) => void;
}

const useTasksStore = create<TasksState>((set) => ({
  incompletedTasks: [
    {
      id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
      title: 'Do math homework',
      deadline: new Date(2023, 6, 27, 18, 45).getTime(),
      category: {
        label: 'University',
      },
      priority: 10,
    },
    {
      id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
      title: 'Have a meeting',
      deadline: new Date(2023, 6, 27, 19, 45).getTime(),
      category: {
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
        label: 'Sports',
      },
      priority: 7,
      completedAt: new Date(2023, 6, 27, 11, 23).getTime(),
    },
  ],
  addCompletedTask: (completedTask) =>
    set((state) => ({
      incompletedTasks: state.incompletedTasks.filter(
        (task) => task.id !== completedTask.id,
      ),
      completedTasks: [...state.completedTasks, completedTask],
    })),
  addIncompletedTask: (incompletedTask) =>
    set((state) => ({
      completedTasks: state.completedTasks.filter(
        (task) => task.id !== incompletedTask.id,
      ),
      incompletedTasks: [...state.incompletedTasks, incompletedTask],
    })),
}));

export default useTasksStore;
