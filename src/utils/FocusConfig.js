export const barChartData = {
  labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  datasets: [
    {
      label: 'Time spent',
      data: [2.5, 3.5, 5, 3, 4, 4.5, 2, 6],
      borderRadius: 6,
      borderSkipped: false,
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
          return `${Math.floor(value)}h 30 m`;
        },
      },
    },
  ],
};

export const barChartOptions = {
  scales: {
    x: {
      ticks: {
        padding: 10,
        font: {
          size: 16,
        },
        color(context) {
          return context.index === 0 || context.index === 6
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

export const pieChartData = {
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
        formatter(_, context) {
          return `${
            [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ][context.dataIndex]
          }`;
        },
      },
    },
  ],
};

export const pieChartOptions = {
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
    // title: {
    //   display: true,
    //   text: 'View the stats on chart',
    //   color: '#fff',
    //   position: 'bottom',
    // },
  },
};
