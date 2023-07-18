import React from 'react';

import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Bar } from 'react-chartjs-2';

interface FocusChartInterface {
  chartData: any;
  chartOptions: any;
}

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

const FocusChart: React.FC<FocusChartInterface> = ({
  chartData,
  chartOptions,
}) => (
  <Bar
    className="overflow-hidden rounded-2xl"
    width="1050"
    height="650"
    data={chartData}
    options={chartOptions}
  />
);

export default FocusChart;
