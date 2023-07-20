'use client';

import React, { useEffect, useState } from 'react';

import {
  weekBarChartData,
  weekBarChartOptions,
  weekDoughnutChartData,
  weekDoughnutChartOptions,
  todayBarChartData,
  todayBarChartOptions,
  todayDoughnutChartData,
  todayDoughnutChartOptions,
  specificBarChartData,
  specificDoughnutChartOptions,
  specificDoughnutChartData,
} from '@/utils/FocusConfig';

import TimerModal from '@/components/UI/Modals/TimerModal';
import Navbar from '@/components/Layout/Navbar';
import Container from '@/components/UI/Container';
import FocusTask from '@/components/Focus/FocusTask';
import Timer from '@/components/Timer/Timer';
import FocusChart from '@/components/Focus/FocusChart/FocusChart';
import Select from '@/components/UI/Select';

import { ChartConfig } from '@/types';

const Focus = () => {
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isChooseTimeModal, setIsChooseTimeModal] = useState<boolean>(false);

  const [stats, setStats] = useState<string>('This Week');
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    barChartData: weekBarChartData,
    barChartOptions: weekBarChartOptions,
    doughnutChartData: weekDoughnutChartData,
    doughnutChartOptions: weekDoughnutChartOptions,
  });

  useEffect(() => {
    if (stats === 'This Week') {
      setChartConfig({
        barChartData: weekBarChartData,
        barChartOptions: weekBarChartOptions,
        doughnutChartData: weekDoughnutChartData,
        doughnutChartOptions: weekDoughnutChartOptions,
      });
    } else if (stats === 'Today') {
      setChartConfig({
        barChartData: todayBarChartData,
        barChartOptions: todayBarChartOptions,
        doughnutChartData: todayDoughnutChartData,
        doughnutChartOptions: todayDoughnutChartOptions,
      });
    } else if (stats === 'Specific Task') {
      const chartData = specificBarChartData;

      chartData.datasets[0].label = 'Time spent';
      chartData.datasets[0].data = [0.5, 2, 0.5, 3, 0.5, 1, 0, 6];
      chartData.datasets[0].backgroundColor = [
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#A5A5A5',
        '#8875FF',
        '#A5A5A5',
      ];
      chartData.datasets[0].hoverBackgroundColor = [
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#838383',
        '#7969e1',
        '#838383',
      ];

      const donught = specificDoughnutChartData;

      donught.datasets[0].data = [0.5, 2, 0.5, 3, 0.5, 1, 0];

      setChartConfig({
        barChartData: chartData,
        barChartOptions: weekBarChartOptions,
        doughnutChartData: donught,
        doughnutChartOptions: specificDoughnutChartOptions,
      });
    }
  }, [stats]);

  return (
    <div className="pb-36 md:pb-40">
      <Container>
        <TimerModal
          timerSeconds={timerSeconds}
          isModal={isChooseTimeModal}
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
        <div className="flex flex-col items-center justify-center mx-auto mt-8">
          <header className="relative flex items-center justify-center w-full max-w-lg">
            <h6 className="text-xl text-[#3d3d3d] dark:text-[#ffffffdd] min-[475px]:text-2xl">
              Focus Mode
            </h6>
          </header>
          <main className="flex flex-col justify-start w-full max-w-lg mt-4 min-[475px]:mt-8">
            <Timer
              timerSeconds={timerSeconds}
              onEdit={() => {
                document.body.style.overflow = 'hidden';
                setIsChooseTimeModal((prev) => !prev);
              }}
            />
            <div>
              <div className="flex justify-between items-center mb-10 min-[475px]:mb-6">
                <h4 className="text-xl text-[#3d3d3d] dark:text-[#ffffffdd] min-[475px]:text-2xl">
                  Overview:
                </h4>
                <Select
                  value={stats}
                  setValue={(newValue: string) => setStats(newValue)}
                  options={['This Week', 'Today', 'Specific Task']}
                />
              </div>
              <FocusChart chartConfig={chartConfig} />
            </div>
            <h4 className="text-xl text-[#3d3d3d] dark:text-[#ffffffdd] mt-12 mb-5 min-[475px]:text-2xl">
              Time Spent:
            </h4>
            <FocusTask
              logo={
                <div className="flex justify-center p-1 mr-5 bg-[#80FFFF]">
                  <svg
                    className="text-[#00A32F] mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                  >
                    <path
                      d="M25.3333 6.66931H22.6667C21.196 6.66931 20 7.86531 20 9.33598V13.336H12V9.33598C12 7.86531 10.804 6.66931 9.33333 6.66931H6.66667C5.196 6.66931 4 7.86531 4 9.33598V20.0026C4 21.4733 5.196 22.6693 6.66667 22.6693H9.33333C10.804 22.6693 12 21.4733 12 20.0026V16.0026H20V20.0026C20 21.4733 21.196 22.6693 22.6667 22.6693H25.3333C26.804 22.6693 28 21.4733 28 20.0026V9.33598C28 7.86531 26.804 6.66931 25.3333 6.66931ZM6.66667 20.0026V9.33598H9.33333L9.33467 20.0026H6.66667ZM22.6667 20.0026V9.33598H25.3333L25.3347 20.0026H22.6667ZM29.3333 12.0026H32V17.336H29.3333V12.0026ZM0 12.0026H2.66667V17.336H0V12.0026Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              }
              title="Workout"
              text="You spent 1 hour on Workout today"
            />
            <FocusTask
              logo={
                <div className="flex justify-center p-1 mr-5 bg-[#FF9680]">
                  <svg
                    className="text-[#A31D00]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M12.0033 2.99597C10.3587 2.99597 8.99763 4.3571 8.99763 6.00167V6.99772H4.0018C2.3566 6.99772 1.00391 8.35629 1.00391 10.0015V12.0014C1.00391 13.1372 1.64629 14.1747 2.65812 14.6809C2.77087 14.7373 2.88324 14.7944 2.99599 14.8508V25.9967C2.99599 27.6413 4.35709 29.0024 6.00169 29.0024H25.9967C27.6414 29.0024 29.0024 27.6413 29.0024 25.9967V14.8508C29.1157 14.7942 29.229 14.7376 29.3423 14.6809C30.3542 14.1747 30.9945 13.1372 30.9945 12.0014V10.0015C30.9945 8.35629 29.6438 6.99772 27.9986 6.99772H23.0008V6.00167C23.0008 4.3571 21.6417 2.99597 19.9971 2.99597H12.0033ZM12.0033 4.99587H19.9971C20.5684 4.99587 21.0009 5.43039 21.0009 6.00167V6.99772H10.9975V6.00167C10.9975 5.43039 11.432 4.99587 12.0033 4.99587ZM4.0018 8.99761H27.9986C28.5631 8.99761 29.0024 9.43695 29.0024 10.0015V12.0014C29.0024 12.3795 28.784 12.7248 28.4419 12.8958C24.4437 14.8962 20.4446 16.8942 16.4465 18.8955C16.1623 19.0376 15.8361 19.0376 15.552 18.8955C11.5538 16.8942 7.55667 14.8962 3.55846 12.8958C3.2163 12.7246 2.99599 12.3795 2.99599 12.0014V10.0015C2.99599 9.43695 3.43729 8.99761 4.0018 8.99761ZM15.9992 14.9993C15.447 14.9993 14.9993 15.4469 14.9993 15.9992C14.9993 16.5514 15.447 16.9992 15.9992 16.9992C16.5515 16.9992 16.9992 16.5514 16.9992 15.9992C16.9992 15.4469 16.5515 14.9993 15.9992 14.9993ZM4.99784 15.8508C8.21645 17.4608 11.4337 19.0718 14.6516 20.6826C15.497 21.1057 16.5014 21.1057 17.3468 20.6826C20.5648 19.0717 23.7838 17.4609 27.0026 15.8508V25.9967C27.0026 26.5679 26.568 27.0006 25.9967 27.0006H6.00169C5.43047 27.0006 4.99784 26.5679 4.99784 25.9967V15.8508Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              }
              title="Work"
              text="You spent 6 hours on Work today"
            />
            <FocusTask
              logo={
                <div className="flex justify-center p-1 mr-5 bg-[#FC80FF]">
                  <svg
                    className="text-[#A000A3]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <path
                      d="M6.97097 26.932H5.97097C4.87797 26.932 3.91197 26.498 3.25197 25.712C2.59197 24.925 2.32297 23.848 2.51597 22.758C2.89397 20.612 4.87597 18.932 7.02997 18.932H9.54797V5.80296C9.55017 5.04234 9.84026 4.31077 10.3599 3.75533C10.8795 3.19988 11.5902 2.86177 12.349 2.80896L23.349 2.07596C23.7586 2.05008 24.1691 2.10794 24.5556 2.246C24.9421 2.38406 25.2965 2.59943 25.597 2.87896C26.201 3.44396 26.548 4.24296 26.548 5.06996L26.538 19.439C26.537 19.659 26.526 19.877 26.485 20.107C26.107 22.252 24.125 23.932 21.971 23.932H20.971C19.878 23.932 18.912 23.498 18.252 22.712C17.592 21.925 17.323 20.848 17.516 19.758C17.894 17.612 19.876 15.932 22.03 15.932H24.548V11.07C24.548 10.79 24.436 10.53 24.231 10.339C24.1315 10.2448 24.0136 10.1725 23.8846 10.1265C23.7556 10.0805 23.6185 10.062 23.482 10.072L12.482 10.805C12.229 10.8226 11.9922 10.9353 11.8189 11.1205C11.6457 11.3056 11.5489 11.5494 11.548 11.803V22.432C11.548 22.521 11.536 22.607 11.515 22.689C11.506 22.994 11.495 23.05 11.486 23.107C11.106 25.251 9.12397 26.932 6.97097 26.932ZM7.02897 20.932C5.85697 20.932 4.69197 21.927 4.48397 23.106C4.39397 23.62 4.50097 24.088 4.78397 24.427C5.05697 24.752 5.47897 24.932 5.97097 24.932H6.97097C8.14297 24.932 9.30797 23.937 9.51597 22.758C9.51297 22.756 9.52697 22.465 9.53597 20.932H7.02897ZM22.029 17.932C20.857 17.932 19.692 18.927 19.484 20.106C19.394 20.62 19.501 21.088 19.784 21.427C20.057 21.752 20.479 21.932 20.971 21.932H21.971C23.143 21.932 24.308 20.937 24.516 19.758C24.536 19.645 24.537 19.535 24.537 19.428L24.544 17.932H22.029ZM12.48 4.80496C12.227 4.82263 11.9902 4.93535 11.8169 5.12047C11.6437 5.30559 11.5469 5.54941 11.546 5.80296V8.97496C11.799 8.88496 12.067 8.82796 12.347 8.80896L23.347 8.07596C23.755 8.05296 24.164 8.10695 24.546 8.24195V5.06896C24.546 4.78896 24.434 4.52896 24.229 4.33796C24.1294 4.24404 24.0114 4.17182 23.8825 4.12586C23.7536 4.07991 23.6165 4.06121 23.48 4.07096L12.48 4.80496Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              }
              title="Musick"
              text="You spent 2 hours on Musick today"
            />
            <FocusTask
              logo={
                <div className="flex justify-center p-1 mr-5 bg-[#80FFA3]">
                  <svg
                    className="text-[#00A3A3]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M11.1539 4.00305C7.21935 4.00305 4.00186 7.18902 4.00187 11.1044C4.0394 12.0779 4.20149 13.1654 4.40029 14.0066H2.99605C1.6325 13.9764 1.6325 16.0371 2.99605 16.0065H5.02527C6.77765 20.5603 10.6991 25.1133 15.5092 27.8674C15.8156 28.0416 16.1911 28.0416 16.4975 27.8674C19.6775 26.0467 22.5124 23.3152 24.5811 20.3247C25.5509 18.9228 26.3472 17.464 26.9307 16.0065H29.0028C30.3664 16.0367 30.3664 13.976 29.0028 14.0066H27.5849C27.8493 12.9982 27.9857 12.0581 27.999 11.1044C27.999 7.18902 24.7795 4.00305 20.845 4.00305C19.0134 4.00305 17.2915 4.69932 15.9936 5.88778C14.6967 4.70227 12.9838 4.00305 11.1539 4.00305ZM11.1539 6.00496C12.7476 6.00496 14.216 6.72449 15.1772 7.91495C15.5501 8.37698 16.2411 8.41428 16.6615 7.99511C17.9014 6.90612 19.4474 6.02768 20.845 6.00496C23.6609 6.00496 25.9182 8.20634 25.9912 10.9676C25.9284 12.0378 25.764 13.141 25.5088 14.0066H21.0012C20.7362 14.0046 20.4812 14.1079 20.2922 14.2938L19.2727 15.3134L17.8939 12.5596C17.5247 11.825 16.4761 11.825 16.1069 12.5596L15.103 14.5673L13.9292 11.6299C13.7762 11.247 13.404 10.9974 12.9917 11.001C12.6584 11.0043 12.3486 11.1733 12.1656 11.4521L10.4665 14.0067H6.51544C6.22998 12.9422 6.03781 11.8973 6.01156 10.9228C6.10795 8.18279 8.35332 6.00508 11.1539 6.00508V6.00496ZM12.7769 14.1394L14.0698 17.3717C14.3879 18.1732 15.5033 18.2233 15.892 17.4537L16.9994 15.239L18.1068 17.4537C18.4129 18.0634 19.2263 18.1944 19.7083 17.7115L21.4133 16.0065H24.7491C24.2677 17.0662 23.6578 18.1427 22.9347 19.1879C21.1565 21.7586 18.6532 24.0239 16.0034 25.6682C12.1793 23.2952 8.98009 19.5725 7.30057 16.0065H10.9977C11.3345 16.0064 11.6487 15.8367 11.8336 15.5553L12.7769 14.1394Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              }
              title="Health"
              text="You spent 1 hour on Health today"
            />
            <FocusTask
              logo={
                <div className="flex justify-center p-1 mr-5 bg-[#809CFF]">
                  <svg
                    className="text-[#0055A3]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M28.6533 13.5867L27.32 12.8534L15.32 6.18669H15.1733C15.0916 6.15213 15.0068 6.12534 14.92 6.10669H14.6667H14.4267C14.3356 6.12536 14.2463 6.15213 14.16 6.18669H14.0133L2.01333 12.8534C1.80814 12.9696 1.63746 13.1383 1.51871 13.3421C1.39997 13.5459 1.3374 13.7775 1.3374 14.0134C1.3374 14.2492 1.39997 14.4809 1.51871 14.6846C1.63746 14.8884 1.80814 15.0571 2.01333 15.1734L5.33333 17.0134V23.3334C5.33333 24.3942 5.75476 25.4116 6.50491 26.1618C7.25505 26.9119 8.27247 27.3334 9.33333 27.3334H20C21.0609 27.3334 22.0783 26.9119 22.8284 26.1618C23.5786 25.4116 24 24.3942 24 23.3334V17.0134L26.6667 15.52V19.3334C26.6667 19.687 26.8071 20.0261 27.0572 20.2762C27.3072 20.5262 27.6464 20.6667 28 20.6667C28.3536 20.6667 28.6928 20.5262 28.9428 20.2762C29.1929 20.0261 29.3333 19.687 29.3333 19.3334V14.7467C29.3329 14.5104 29.2697 14.2785 29.1503 14.0747C29.0308 13.8709 28.8593 13.7025 28.6533 13.5867ZM21.3333 23.3334C21.3333 23.687 21.1929 24.0261 20.9428 24.2762C20.6928 24.5262 20.3536 24.6667 20 24.6667H9.33333C8.97971 24.6667 8.64057 24.5262 8.39052 24.2762C8.14048 24.0261 8 23.687 8 23.3334V18.4934L14.0133 21.8267L14.2133 21.9067H14.3333C14.444 21.9206 14.556 21.9206 14.6667 21.9067C14.7773 21.9206 14.8893 21.9206 15 21.9067H15.12C15.1908 21.8918 15.2585 21.8647 15.32 21.8267L21.3333 18.4934V23.3334ZM14.6667 19.1467L5.41333 14L14.6667 8.85336L23.92 14L14.6667 19.1467Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              }
              title="University"
              text="You spent 3 hours on University today"
            />
          </main>
        </div>
      </Container>
      <Navbar />
    </div>
  );
};

export default Focus;
