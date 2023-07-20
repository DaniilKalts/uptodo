'use client';

import React from 'react';

import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Bar, Doughnut } from 'react-chartjs-2';

import { useMediaQuery } from 'react-responsive';
import { ChartConfig } from '@/types';

interface FocusChartInterface {
  chartConfig: ChartConfig;
}

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

const FocusChart: React.FC<FocusChartInterface> = ({ chartConfig }) => {
  const isMobileDevice = useMediaQuery({ maxWidth: 475 });

  return (
    <>
      {isMobileDevice ? (
        <>
          <Doughnut
            className="overflow-hidden rounded-3xl"
            width="1050"
            height="650"
            data={chartConfig.doughnutChartData}
            options={chartConfig.doughnutChartOptions}
          />
        </>
      ) : (
        <Bar
          className="overflow-hidden rounded-3xl"
          width="1050"
          height="650"
          data={chartConfig.barChartData}
          options={chartConfig.barChartOptions}
        />
      )}
    </>
  );
};

export default FocusChart;
