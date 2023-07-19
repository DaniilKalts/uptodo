'use client';

import React from 'react';

import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Bar, Doughnut } from 'react-chartjs-2';

import { useMediaQuery } from 'react-responsive';

interface FocusChartInterface {
  pieChartData: any;
  pieChartOptions: any;
  barChartData: any;
  barChartOptions: any;
}

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

const FocusChart: React.FC<FocusChartInterface> = ({
  pieChartData,
  pieChartOptions,
  barChartData,
  barChartOptions,
}) => {
  const isMobileDevice = useMediaQuery({ maxWidth: 475 });

  return (
    <>
      {isMobileDevice ? (
        <>
          <Doughnut
            className="overflow-hidden rounded-3xl"
            width="1050"
            height="650"
            data={pieChartData}
            options={pieChartOptions}
          />
        </>
      ) : (
        <Bar
          className="overflow-hidden rounded-3xl"
          width="1050"
          height="650"
          data={barChartData}
          options={barChartOptions}
        />
      )}
    </>
  );
};

export default FocusChart;
