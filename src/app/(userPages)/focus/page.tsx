'use client';

import React, { CSSProperties, useState, useEffect } from 'react';

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

import { PuffLoader } from 'react-spinners';

import Timer from '@/components/userPages/Focus/Timer/Timer';
import FocusChart from '@/components/userPages/Focus/FocusChart';
import FocusTask from '@/components/userPages/Focus/FocusTask';

import { Container, Select } from '@/components/UI';
import TimerModal from '@/components/UI/Modals/TimerModal';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  marginTop: '28px',
};

const Focus = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isChooseTimeModal, setIsChooseTimeModal] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  const [stats, setStats] = useState<string>('This Week');
  const [chartConfig, setChartConfig] = useState<any>({
    barChartData: weekBarChartData,
    barChartOptions: weekBarChartOptions,
    doughnutChartData: weekDoughnutChartData,
    doughnutChartOptions: commonDoughnutChartOptions,
  });

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

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
    <div className="pb-36">
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
            <h4 className="text-xl text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
              Focus Mode
            </h4>
          </header>
          <main className="mt-4 flex w-full max-w-lg flex-col justify-start min-[500px]:mt-8">
            <Timer
              timerSeconds={timerSeconds}
              onEdit={() => {
                document.body.style.overflow = 'hidden';
                setIsChooseTimeModal((prev) => !prev);
              }}
            />
            <section>
              <div className="mb-10 flex items-center justify-between min-[500px]:mb-6">
                <h4 className="text-xl text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
                  Overview:
                </h4>
                <Select
                  value={stats}
                  setValue={(newValue: string) => setStats(newValue)}
                  options={['This Week', 'Today', 'Specific Task']}
                  theme="gray"
                />
              </div>
              {mounted ? (
                <FocusChart chartConfig={chartConfig} />
              ) : (
                <PuffLoader
                  color={'#8875FF'}
                  loading={true}
                  cssOverride={override}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </section>
            <h4 className="mb-5 mt-6 text-xl text-gray-dark dark:text-white-pale min-[500px]:mt-12 min-[500px]:text-2xl">
              Time Spent:
            </h4>
            <FocusTask
              icon="MdWorkOutline"
              bgIconColor="#FF9680"
              iconColor="#A31D00"
              title="Work"
              text="You spent 6 hour on Work today"
            />
            <FocusTask
              icon="MdDesignServices"
              bgIconColor="#80FFD9"
              iconColor="#00A372"
              title="Design"
              text="You spent 2 hours on Design today"
            />
            <FocusTask
              icon="IoMusicalNotesOutline"
              bgIconColor="#FC80FF"
              iconColor="#A000A3"
              title="Musick"
              text="You spent 2 hours on Musick today"
            />
            <FocusTask
              icon="MdPeopleOutline"
              bgIconColor="#80FFA3"
              iconColor="#00A3A3"
              title="Health"
              text="You spent 1 hour on Health today"
            />
            <FocusTask
              icon="MdOutlineSchool"
              bgIconColor="#809CFF"
              iconColor="#0055A3"
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
