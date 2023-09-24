export type CategoryType = {
  icon: string;
  iconBgColor: string;
  iconColor: string;
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
