export type CategoryIconType = React.FC<{ IconStyles: string }>;

export type TaskType = {
  id: number;
  title: string;
  description: string;
  createdAt: number;
  todayAt: number;
  completedAt: number;
  category: {
    bgColor: string;
    label: string;
  };
  priority: number;
};

export type CategoryType = {
  icon: CategoryIconType;
  bgColor: string;
  label: string;
  IconStyles: string;
};
