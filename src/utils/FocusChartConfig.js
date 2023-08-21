const daysOfTheWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const commonChartColors = {
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
};

const commonBarChartData = {
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
    formatter(value) {
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
  scales: {
    x: {
      ticks: {
        padding: 10,
        font: {
          size: 16,
        },
        color(context) {
          return context.index === 2 || context.index === 5
            ? '#FF4949'
            : '#ffffffdd';
        },
      },
      grid: {
        lineWidth: 3,
        color(context) {
          if (context.index === 0) {
            return '#ffffffdd';
          }
          return '';
        },
      },
    },
    y: {
      ticks: {
        padding: 10,
        color: '#ffffffdd',
        font: {
          size: 16,
        },
        callback(value) {
          return `${value}h`;
        },
      },
      grid: {
        lineWidth: 3,
        color(context) {
          if (context.index === 0) {
            return '#ffffffdd';
          }
          return '';
        },
      },
    },
  },
};

export const commonDoughnutChartOptions = {
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
        label(context) {
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

export const weekBarChartData = {
  labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  datasets: [
    {
      label: 'Time spent',
      data: [2.5, 3.5, 5, 3, 4, 4.5, 2, 6],
      ...commonChartColors,
      ...commonBarChartData,
    },
  ],
};

export const weekBarChartOptions = {
  ...commonBarChartOptions,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label(context) {
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
  labels: daysOfTheWeek,
  datasets: [
    {
      label: 'Time spent',
      data: [2.5, 3.5, 5, 3, 4, 4.5, 2],
      categoryPercentage: 0.75,
      ...commonChartColors,
      datalabels: {
        anchor: 'center',
        align: 'center',
        formatter(value, context) {
          return value ? `${daysOfTheWeek[context.dataIndex]}` : '';
        },
      },
    },
  ],
};

export const todayBarChartData = {
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
  ...commonBarChartOptions,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label(context) {
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
        formatter(_, context) {
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

export const specificBarChartData = {
  labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  datasets: [
    {
      label: 'Time spent',
      data: [2.5, 3.5, 5, 3, 4, 4.5, 2, 6],
      ...commonChartColors,
    },
  ],
};

export const specificDoughnutChartData = {
  labels: daysOfTheWeek,
  datasets: [
    {
      label: 'Time spent',
      data: [2.5, 3.5, 5, 3, 4, 4.5, 2],
      categoryPercentage: 0.75,
      ...commonChartColors,
      datalabels: {
        anchor: 'center',
        align: 'center',
        formatter(value, context) {
          return value ? `${daysOfTheWeek[context.dataIndex]}` : '';
        },
      },
    },
  ],
};
