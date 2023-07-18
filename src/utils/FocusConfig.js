export const chartData = {
  labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
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

export const chartOptions = {
  scales: {
    offset: true,
    x: {
      bar: {
        offset: true,
      },
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
