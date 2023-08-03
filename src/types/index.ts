export type ChartConfig = {
  barChartData: {
    labels: string[];
    datasets: any;
  };
  barChartOptions: object;
  doughnutChartData: {
    labels: string[];
    datasets: any;
  };
  doughnutChartOptions: object;
};

export type CommonBarChartData = {
  borderRadius: number;
  borderSkipped: boolean;
  categoryPercentage: number;
  datalabels: {
    color: string;
    anchor: string;
    align: string;
    offset: number;
    font: {
      size: number;
    };
    formatter: (value: number) => string;
  };
};

export type CommonBarChartOptions = {
  scales: {
    x: {
      ticks: {
        padding: number;
        font: {
          size: number;
        };
        color: (context: any) => string;
      };
      grid: {
        lineWidth: number;
        color: (context: any) => string;
      };
    };
    y: {
      ticks: {
        padding: number;
        color: string;
        font: {
          size: number;
        };
        callback: (value: number) => string;
      };
      grid: {
        lineWidth: number;
        color: (context: any) => string;
      };
    };
  };
};

export type CommonDoughnutChartData = {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      categoryPercentage: number;
      backgroundColor: string[];
      hoverBackgroundColor: string[];
      datalabels: {
        anchor: string;
        align: string;
        formatter: (_: any, context: object) => string;
      };
    },
  ];
};

export type CommonDoughnutChartOptions = {
  scales: {
    x: {
      display: false;
    };
    y: {
      display: false;
    };
  };
  plugins: {
    legend: {
      display: false;
    };
    datalabels: {
      color: string;
    };
    tooltip: {
      callbacks: {
        label: (context: object) => string;
      };
    };
    title: {
      display: boolean;
      color: string;
      text: string;
      position: string;
      padding: number;
    };
  };
};

export type IncompletedTaskType = {
  id: number;
  title: string;
  description: string;
  todayAt: number;
  category: {
    icon: React.ReactNode;
    bgColor: string;
    label: string;
  };
  priority: number;
};

export type CompletedTaskType = {
  id: number;
  title: string;
  description: string;
  todayAt: number;
  completedAt: number;
  category: {
    icon: React.ReactNode;
    label: string;
  };
  priority: number;
};
