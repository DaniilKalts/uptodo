export type CategoryType = {
  icon: any;
  IconBgColor: string;
  IconColor: string;
  label: string;
};

export type TaskType = {
  id: number;
  title: string;
  description: string;
  createdAt: number;
  todayAt: number;
  completedAt: number;
  category: CategoryType;
  priority: number;
};
