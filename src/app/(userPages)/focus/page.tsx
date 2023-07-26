'use client';

import React, { useState, useEffect } from 'react';

import { ChartConfig } from '@/types';

import {
  weekBarChartData,
  weekBarChartOptions,
  weekDoughnutChartData,
  todayBarChartData,
  todayBarChartOptions,
  todayDoughnutChartData,
  specificBarChartData,
  specificDoughnutChartData,
  commonDoughnutChartOptions,
} from '@/utils/FocusChartConfig';

import Timer from '@/components/userPages/Focus/Timer/Timer';
import FocusChart from '@/components/userPages/Focus/FocusChart';
import FocusTask from '@/components/userPages/Focus/FocusTask';

import {
  WorkoutIcon,
  WorkIcon,
  MusickIcon,
  HealthIcon,
  UniversityIcon,
} from '../../../components/UI/Icons/Categories';

import { Select } from '../../../components/UI';

import TimerModal from '../../../components/UI/Modals/TimerModal';
import Container from '../../../components/UI/Container';

const Focus = () => {
  const [isChooseTimeModal, setIsChooseTimeModal] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  const [stats, setStats] = useState<string>('This Week');
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    barChartData: weekBarChartData,
    barChartOptions: weekBarChartOptions,
    doughnutChartData: weekDoughnutChartData,
    doughnutChartOptions: commonDoughnutChartOptions,
  });

  useEffect(() => {
    if (stats === 'This Week') {
      setChartConfig({
        barChartData: weekBarChartData,
        barChartOptions: weekBarChartOptions,
        doughnutChartData: weekDoughnutChartData,
        doughnutChartOptions: commonDoughnutChartOptions,
      });
    } else if (stats === 'Today') {
      setChartConfig({
        barChartData: todayBarChartData,
        barChartOptions: todayBarChartOptions,
        doughnutChartData: todayDoughnutChartData,
        doughnutChartOptions: commonDoughnutChartOptions,
      });
    } else if (stats === 'Specific Task') {
      const barChartData = specificBarChartData;

      barChartData.datasets[0].label = 'Time spent';
      barChartData.datasets[0].data = [0.5, 2, 0.5, 3, 0.5, 1, 0, 6];
      barChartData.datasets[0].backgroundColor = [
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#8875FF',
        '#A5A5A5',
      ];
      barChartData.datasets[0].hoverBackgroundColor = [
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#7969e1',
        '#838383',
      ];

      const doughnutChartData = specificDoughnutChartData;

      doughnutChartData.datasets[0].data = [0.5, 2, 0.5, 3, 0.5, 1, 0];

      setChartConfig({
        barChartData,
        barChartOptions: weekBarChartOptions,
        doughnutChartData,
        doughnutChartOptions: commonDoughnutChartOptions,
      });
    }
  }, [stats]);

  return (
    <div className="pb-36 md:pb-40">
      <Container>
        {isChooseTimeModal && (
          <TimerModal
            isOpen={isChooseTimeModal}
            timerSeconds={timerSeconds}
            onCancel={() => {
              document.body.style.overflow = 'auto';
              setIsChooseTimeModal(false);
            }}
            onSave={(seconds: number) => {
              document.body.style.overflow = 'auto';
              setIsChooseTimeModal(false);
              setTimerSeconds(seconds);
            }}
          />
        )}
        <div className="mx-auto mt-8 flex flex-col items-center justify-center">
          <header>
            <h4 className="text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
              Focus Mode
            </h4>
          </header>
          <main className="mt-4 flex w-full max-w-lg flex-col justify-start min-[475px]:mt-8">
            <Timer
              timerSeconds={timerSeconds}
              onEdit={() => {
                document.body.style.overflow = 'hidden';
                setIsChooseTimeModal((prev) => !prev);
              }}
            />
            <section>
              <div className="mb-10 flex items-center justify-between min-[475px]:mb-6">
                <h4 className="text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
                  Overview:
                </h4>
                <Select
                  value={stats}
                  setValue={(newValue: string) => setStats(newValue)}
                  options={['This Week', 'Today', 'Specific Task']}
                />
              </div>
              <FocusChart chartConfig={chartConfig} />
            </section>
            <h4 className="mb-5 mt-6 text-xl text-gray-dark dark:text-white-pale min-[475px]:mt-12 min-[475px]:text-2xl">
              Time Spent:
            </h4>
            <FocusTask
              logo={WorkoutIcon}
              title="Workout"
              text="You spent 1 hour on Workout today"
            />
            <FocusTask
              logo={WorkIcon}
              title="Work"
              text="You spent 6 hours on Work today"
            />
            <FocusTask
              logo={MusickIcon}
              title="Musick"
              text="You spent 2 hours on Musick today"
            />
            <FocusTask
              logo={HealthIcon}
              title="Health"
              text="You spent 1 hour on Health today"
            />
            <FocusTask
              logo={UniversityIcon}
              title="University"
              text="You spent 3 hours on University today"
            />
          </main>
        </div>
      </Container>
    </div>
  );
};

export default Focus;
