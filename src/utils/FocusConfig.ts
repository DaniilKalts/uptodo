const daysOfTheWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const commonBarChartData: {
  borderRadius: number;
  borderSkipped: boolean;
  categoryPercentage: number;
  datalabels: {};
} = {
  borderRadius: 6,
  borderSkipped: false,
  categoryPercentage: 0.75,
  datalabels: {
    color: '#ffffffdd',
    anchor: 'end',
    align: 'top',
    offset: 6,
    font: {
      size: 13,
    },
    formatter(value: number) {
      if (Number.isInteger(value)) {
        return `${value}h`;
      }
      return value
        ? `${Math.floor(value) ? `${Math.floor(value)}h` : ''} 30 m`
        : '';
    },
  },
};

const commonBarChartOptions = {
  y: {
    ticks: {
      padding: 10,
      color: '#ffffffdd',
      font: {
        size: 16,
      },
      callback(value: number) {
        return `${value}h`;
      },
    },
    grid: {
      lineWidth: 3,
      color(context: any) {
        if (context.index === 0) {
          return '#ffffffdd';
        }
        return '';
      },
    },
  },
};

const commonDoughnutChartOptions = {
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      color: '#fff',
    },
    tooltip: {
      callbacks: {
        label(context: any) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }

          label += `${context?.formattedValue} hours`;

          return label;
        },
      },
    },
    title: {
      display: true,
      color: '#818181',
      text: 'Click on each segment and check out the stats!',
      position: 'bottom',
      padding: 16,
    },
  },
};

export const weekBarChartData: {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    },
  ];
} = {
  labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  datasets: [
    {
      label: 'Time spent',
      data: [2.5, 3.5, 5, 3, 4, 4.5, 2, 6],
      backgroundColor: [
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#8875FF',
        '#A5A5A5',
      ],
      hoverBackgroundColor: [
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#7969e1',
        '#838383',
      ],
      ...commonBarChartData,
    },
  ],
};

export const weekBarChartOptions = {
  scales: {
    x: {
      ticks: {
        padding: 10,
        font: {
          size: 16,
        },
        color(context: any) {
          return context.index === 2 || context.index === 5
            ? '#FF4949'
            : '#ffffffdd';
        },
      },
      grid: {
        lineWidth: 3,
        color(context: any) {
          if (context.index === 0) {
            return '#ffffffdd';
          }
          return '';
        },
      },
    },
    ...commonBarChartOptions,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label(context: any) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }

          label += `${context?.formattedValue} hours`;

          return label;
        },
      },
    },
  },
};

export const weekDoughnutChartData = {
  labels: [
    'MONDAY',
    'TUESDAY',
    'WEDNSDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ],
  datasets: [
    {
      label: 'Time spent',
      data: [2.5, 3.5, 5, 3, 4, 4.5, 2],
      categoryPercentage: 0.75,
      backgroundColor: [
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#8875FF',
        '#A5A5A5',
      ],
      hoverBackgroundColor: [
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#7969e1',
        '#838383',
      ],
      datalabels: {
        anchor: 'center',
        align: 'center',
        formatter(value: number, context: any) {
          return value ? `${daysOfTheWeek[context.dataIndex]}` : '';
        },
      },
    },
  ],
};

export const weekDoughnutChartOptions = {
  ...commonDoughnutChartOptions,
};

export const todayBarChartData: {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      borderRadius: number;
      borderSkipped: boolean;
      categoryPercentage: number;
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    },
  ];
} = {
  labels: ['Workout', 'Work', 'Musick', 'Health', 'University'],
  datasets: [
    {
      ...commonBarChartData,
      label: 'Time spent',
      data: [1, 6, 2, 1, 3],
      borderRadius: 6,
      borderSkipped: false,
      categoryPercentage: 0.75,
      backgroundColor: ['#80FFFF', '#FF9680', '#FC80FF', '#80FFA3', '#809CFF'],
      hoverBackgroundColor: [
        '#80FFFF',
        '#FF9680',
        '#FC80FF',
        '#80FFA3',
        '#809CFF',
      ],
    },
  ],
};

export const todayBarChartOptions = {
  scales: {
    x: {
      ticks: {
        padding: 10,
        font: {
          size: 16,
        },
        color(context: any) {
          return context.index === 1 ? '#FF4949' : '#ffffffdd';
        },
      },
      grid: {
        lineWidth: 3,
        color(context: any) {
          if (context.index === 0) {
            return '#ffffffdd';
          }
          return '';
        },
      },
    },
    ...commonBarChartOptions,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label(context: any) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }

          label += `${context?.formattedValue} hours`;

          return label;
        },
      },
    },
  },
};

export const todayDoughnutChartData = {
  labels: ['Workout', 'Work', 'Musick', 'Health', 'University'],
  datasets: [
    {
      label: 'Time spent',
      data: [1, 6, 2, 1, 3],
      categoryPercentage: 0.75,
      backgroundColor: ['#80FFFF', '#FF9680', '#FC80FF', '#80FFA3', '#809CFF'],
      hoverBackgroundColor: [
        '#80FFFF',
        '#FF9680',
        '#FC80FF',
        '#80FFA3',
        '#809CFF',
      ],
      datalabels: {
        anchor: 'center',
        align: 'center',
        formatter(_: any, context: any) {
          return `${
            ['Workout', 'Work', 'Musick', 'Health', 'University'][
              context.dataIndex
            ]
          }`;
        },
      },
    },
  ],
};

export const todayDoughnutChartOptions = {
  ...commonDoughnutChartOptions,
};

export const specificBarChartData = {
  labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  datasets: [
    {
      label: 'Time spent',
      data: [2.5, 3.5, 5, 3, 4, 4.5, 2, 6],
      backgroundColor: [
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#8875FF',
        '#A5A5A5',
      ],
      hoverBackgroundColor: [
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#7969e1',
        '#838383',
      ],
    },
  ],
};

export const specificDoughnutChartData = {
  labels: [
    'MONDAY',
    'TUESDAY',
    'WEDNSDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ],
  datasets: [
    {
      label: 'Time spent',
      data: [2.5, 3.5, 5, 3, 4, 4.5, 2],
      categoryPercentage: 0.75,
      backgroundColor: [
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#8875FF',
        '#A5A5A5',
      ],
      hoverBackgroundColor: [
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#7969e1',
        '#838383',
      ],
      datalabels: {
        anchor: 'center',
        align: 'center',
        formatter(value: number, context: any) {
          return value ? `${daysOfTheWeek[context.dataIndex]}` : '';
        },
      },
    },
  ],
};

export const specificDoughnutChartOptions = {
  ...commonDoughnutChartOptions,
};
