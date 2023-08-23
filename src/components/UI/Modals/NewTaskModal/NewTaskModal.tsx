/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { CategoryIconType, TaskType } from '@/types';

import qs from 'query-string';

import {
  FieldValues,
  Resolver,
  ResolverOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useTasksStore from '@/store/useTasksStore';

import TimerSwiper from '@/components/userPages/Focus/Timer/TimerSwiper';
import TimeSwiper from '@/components/userPages/Focus/Timer/TimeSwiper';

import { TagIcon, ClockIcon, FlagIcon, SendIcon } from './Icons';
import {
  GroceryIcon,
  MovieIcon,
  HomeIcon,
  HealthIcon,
  MusickIcon,
  UniversityIcon,
  WorkIcon,
  WorkoutIcon,
  DesignIcon,
  SocialIcon,
  AddIcon,
} from '../../Icons/Categories';

import { Button, Input, Textarea } from '../../index';
import Modal from '../Modal';

interface NewTaskInputs extends FieldValues {
  taskTitle: string;
  taskDescription: string;
  taskDate: Date;
  taskCategory: {
    icon: CategoryIconType;
    bgColor: string;
    label: string;
    IconStyles: string;
  } | null;
  taskPriority: number | null;
}

const schema = yup.object().shape({
  taskTitle: yup
    .string()
    .required('Title is required')
    .min(3, 'Task title must be at least 3 characters long')
    .max(20, 'Task title must not exceed 20 characters'),
  taskDescription: yup
    .string()
    .required('Description is required')
    .min(20, 'Task description must be at least 20 characters long')
    .max(200, 'Task description must not exceed 200 characters'),
  taskDate: yup.date().required(),
  taskCategory: yup.object(),
  taskPriority: yup.number().required(),
});

enum STEPS {
  DATE = 1,
  TIME = 2,
  CATEGORY = 3,
  PRIORITY = 4,
}

type TaskPropsValue =
  | null
  | string
  | number
  | Date
  | {
      icon: CategoryIconType;
      bgColor: string;
      label: string;
      IconStyles: string;
    };

interface NewTaskModalInterface {
  isOpen: boolean;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalInterface> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<NewTaskInputs>({
    mode: 'all',
    defaultValues: {
      taskTitle: '',
      taskDescription: '',
      taskDate: new Date(),
      taskCategory: null,
      taskPriority: null,
    },
    resolver: yupResolver(schema) as unknown as Resolver<
      NewTaskInputs,
      ResolverOptions<NewTaskInputs>
    >,
  });

  const taskTitle = watch('taskTitle');
  const taskDescription = watch('taskDescription');
  const taskDate = watch('taskDate');
  const taskCategory = watch('taskCategory');
  const taskPriority = watch('taskPriority');

  const [step, setStep] = useState<number | null>(null);

  const [potentialDate, setPotentialDate] = useState(taskDate);
  const [selectedDate, setSelectedDate] = useState(taskDate);

  const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
  const [potentialMinutes, setPotentialMinutes] = useState<number>(0);
  const [timeOption, setTimeOption] = useState<string>(
    new Date().getHours() < 12 ? 'AM' : 'PM',
  );

  const [potentialCategory, setPotentialCategory] = useState<{
    icon: CategoryIconType;
    bgColor: string;
    label: string;
    IconStyles: string;
  } | null>(taskCategory);
  const [potentialPriority, setPotentialPriority] = useState<null | number>(
    taskPriority,
  );

  let modalTitle: string = '';

  const categories: {
    icon: CategoryIconType;
    bgColor: string;
    label: string;
    IconStyles: string;
  }[] = [
    {
      icon: GroceryIcon,
      bgColor: 'lemon-chiffon',
      label: 'Grocery',
      IconStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
    },
    {
      icon: WorkIcon,
      bgColor: 'beige-light',
      label: 'Work',
      IconStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
    },
    {
      icon: WorkoutIcon,
      bgColor: 'cyan-light',
      label: 'Sport',
      IconStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
    },
    {
      icon: DesignIcon,
      bgColor: 'aquamarine-mist',
      label: 'Design',
      IconStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
    },
    {
      icon: UniversityIcon,
      bgColor: 'blue-light',
      label: 'University',
      IconStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
    },
    {
      icon: SocialIcon,
      bgColor: 'raspberry-sorbet',
      label: 'Social',
      IconStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
    },
    {
      icon: MusickIcon,
      bgColor: 'pink-light',
      label: 'Musick',
      IconStyles: 'w-7 h-7 min-[475px]:w-9 min-[475px]:h-9',
    },
    {
      icon: HealthIcon,
      bgColor: 'mint-light',
      label: 'Health',
      IconStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
    },
    {
      icon: MovieIcon,
      bgColor: 'sky-blue',
      label: 'Movie',
      IconStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
    },
    {
      icon: HomeIcon,
      bgColor: 'coral-pink',
      label: 'Home',
      IconStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
    },
    {
      icon: AddIcon,
      bgColor: 'turquoise-haze',
      label: 'Create New',
      IconStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
    },
  ];

  const getCategoryBgColor = (bgIconColor: string) => {
    switch (bgIconColor) {
      case 'blue-light':
        return 'bg-blue-light';
      case 'mint-light':
        return 'bg-mint-light';
      case 'lemon-light':
        return 'bg-lemon-light';
      case 'lemon-chiffon':
        return 'bg-lemon-chiffon';
      case 'beige-light':
        return 'bg-beige-light';
      case 'cyan-light':
        return 'bg-cyan-light';
      case 'pink-light':
        return 'bg-pink-light';
      case 'aquamarine-mist':
        return 'bg-aquamarine-mist';
      case 'raspberry-sorbet':
        return 'bg-raspberry-sorbet';
      case 'sky-blue':
        return 'bg-sky-blue';
      case 'coral-pink':
        return 'bg-coral-pink';
      case 'turquoise-haze':
        return 'bg-turquoise-haze';
      default:
        return '';
    }
  };

  const addIncompletedTask = useTasksStore((state) => state.addIncompletedTask);

  const onSubmit: SubmitHandler<FieldValues> = (_, event) => {
    event?.preventDefault();

    if (!Object.keys(errors).length) {
      const incompletedTask: TaskType = {
        id: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
        title: taskTitle,
        description: taskDescription,
        createdAt: new Date().getTime(),
        todayAt: taskDate.getTime(),
        completedAt: 0,
        category: {
          bgColor: taskCategory?.bgColor!,
          label: taskCategory?.label!,
        },
        priority: taskPriority!,
      };

      addIncompletedTask(incompletedTask);
    }

    onClose();

    if (window.location.href.includes('calendar')) {
      const query = { dateTime: taskDate.getTime() };

      const url = qs.stringifyUrl(
        {
          url: window.location.href,
          query,
        },
        { skipNull: true },
      );

      router.push(url);
    }
  };

  const setCustomValue = (id: string, value: TaskPropsValue) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const getCustomClassName = (formValue: boolean) => {
    if (formValue) {
      return 'text-purple';
    }
    if (isSubmitted && !formValue) {
      return 'text-red-dark hover:text-purple';
    }

    return 'text-white-pale hover:text-purple';
  };

  let bodyContent = (
    <form
      className="w-screen max-w-md rounded-t-xl bg-gray-700 px-8 py-8 pb-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="mb-6 text-xl font-bold text-white-pale min-[475px]:text-2xl">
        Add Task
      </h3>
      <main className="mx-auto mt-4">
        <Input
          id="taskTitle"
          type="text"
          value={taskTitle}
          placeholder="Title"
          register={register}
          small
          ghost
          errors={errors}
          errorMessage={errors.taskTitle?.message as string}
        />
        <Textarea
          id="taskDescription"
          value={taskDescription}
          placeholder="Description"
          register={register}
          small
          ghost
          errors={errors}
          errorMessage={errors.taskDescription?.message as string}
        />
      </main>
      <footer className="mt-10 flex items-center justify-between">
        <div className="flex items-center gap-7">
          <ClockIcon
            onClick={() => setStep(1)}
            customClasses={getCustomClassName(!!taskDate)}
          />
          <TagIcon
            onClick={() => setStep(3)}
            customClasses={getCustomClassName(!!taskCategory)}
          />
          <FlagIcon
            onClick={() => setStep(4)}
            customClasses={getCustomClassName(!!taskPriority)}
          />
        </div>
        <button type="submit">
          <SendIcon />
        </button>
      </footer>
    </form>
  );

  let footerContent = null;

  // Function to handle previous month click
  const goToPreviousMonth = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Function to handle next month click
  const goToNextMonth = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const getDaysInMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = [];

    const emptyCells = firstDay.getDay();

    const previousMonthLastDay = new Date(year, month, 0).getDate();
    for (
      let i = previousMonthLastDay - emptyCells + 1;
      i <= previousMonthLastDay;
      i++
    ) {
      const currentDate = new Date(year, month - 1, i);
      daysInMonth.push(currentDate);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      daysInMonth.push(currentDate);
    }

    const nextMonthDaysToAdd = 7 - (daysInMonth.length % 7);
    for (let i = 1; i <= nextMonthDaysToAdd; i++) {
      const currentDate = new Date(year, month + 1, i);
      daysInMonth.push(currentDate);
    }

    return daysInMonth;
  };

  const getDateStylings = (date: Date) => {
    if (
      date.getDate() === potentialDate.getDate() &&
      date.getMonth() === potentialDate.getMonth() &&
      !(
        Math.floor(
          (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
        ) >= 364
      )
    ) {
      return 'cursor-pointer bg-purple';
    }

    if (date.getMonth() === selectedDate.getMonth()) {
      if (
        date.getTime() < new Date(new Date().setHours(0, 0, 0, 0)).getTime() ||
        Math.floor(
          (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
        ) >= 364
      ) {
        return 'cursor-not-allowed bg-gray-800 opacity-50';
      }
      return 'cursor-pointer bg-gray-800 hover:bg-purple';
    }

    if (
      Math.floor(
        (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      ) >= 364
    ) {
      if (selectedDate.getMonth() === date.getMonth()) {
        return 'cursor-not-allowed bg-gray-800 opacity-50';
      }
      return 'cursor-not-allowed opacity-50';
    }

    return date.getTime() < new Date().getTime()
      ? 'cursor-not-allowed'
      : 'cursor-pointer';
  };

  if (STEPS.DATE === step) {
    modalTitle = '';

    bodyContent = (
      <div className="w-full min-[475px]:px-2">
        <div className="flex items-center justify-between px-3">
          <svg
            onClick={goToPreviousMonth}
            className="h-6 w-6 cursor-pointer text-white-pale hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.06 2.21999C10.1867 2.21999 10.3134 2.26665 10.4134 2.36665C10.6067 2.55999 10.6067 2.87999 10.4134 3.07332L6.06668 7.41999C5.74668 7.73999 5.74668 8.25999 6.06668 8.57999L10.4133 12.9267C10.6067 13.12 10.6067 13.44 10.4133 13.6333C10.22 13.8267 9.90002 13.8267 9.70668 13.6333L5.36002 9.28665C5.02002 8.94665 4.82668 8.48665 4.82668 7.99999C4.82668 7.51332 5.01335 7.05332 5.36002 6.71332L9.70668 2.36665C9.80668 2.27332 9.93335 2.21999 10.06 2.21999Z"
              fill="currentColor"
            />
          </svg>
          <div className="flex flex-col items-center">
            <h4 className="text-lg text-gray-dark dark:text-white-pale min-[475px]:text-xl">
              {selectedDate
                .toLocaleString('en-GB', {
                  month: 'long',
                })
                .toUpperCase()}
            </h4>
            <p className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-base">
              {selectedDate.toLocaleString('en-GB', {
                year: 'numeric',
              })}
            </p>
          </div>
          <svg
            onClick={goToNextMonth}
            className="h-6 w-6 cursor-pointer text-white-pale hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.93998 13.78C5.81331 13.78 5.68665 13.7333 5.58665 13.6333C5.39332 13.44 5.39332 13.12 5.58665 12.9267L9.93332 8.58001C10.2533 8.26001 10.2533 7.74001 9.93332 7.42001L5.58665 3.07335C5.39332 2.88001 5.39332 2.56001 5.58665 2.36668C5.77998 2.17335 6.09998 2.17335 6.29332 2.36668L10.64 6.71335C10.98 7.05335 11.1733 7.51335 11.1733 8.00001C11.1733 8.48668 10.9866 8.94668 10.64 9.28668L6.29331 13.6333C6.19331 13.7267 6.06665 13.78 5.93998 13.78Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="mx-auto my-3 h-[0.5px] w-full bg-white-pale"></div>
        <div className="mb-5 grid grid-cols-7 gap-x-4 gap-y-4 min-[475px]:gap-x-7">
          <div className="text-center text-xs font-semibold uppercase text-red min-[475px]:text-base">
            Sun
          </div>
          <div className="text-center text-xs font-semibold uppercase text-gray-dark dark:text-white-pale min-[475px]:text-base">
            Mon
          </div>
          <div className="text-center text-xs font-semibold uppercase text-gray-dark dark:text-white-pale min-[475px]:text-base">
            Tue
          </div>
          <div className="text-center text-xs font-semibold uppercase text-gray-dark dark:text-white-pale min-[475px]:text-base">
            Wed
          </div>
          <div className="text-center text-xs font-semibold uppercase text-gray-dark dark:text-white-pale min-[475px]:text-base">
            Thu
          </div>
          <div className="text-center text-xs font-semibold uppercase text-gray-dark dark:text-white-pale min-[475px]:text-base">
            Fri
          </div>
          <div className="text-center text-xs font-semibold uppercase text-red min-[475px]:text-base">
            Sat
          </div>
          {getDaysInMonth().map((date, index) => (
            <div
              key={index}
              className={`flex h-7 w-7 items-center justify-center rounded-lg min-[475px]:h-9 min-[475px]:w-9 ${getDateStylings(
                date,
              )}`}
              onClick={() => {
                if (
                  date.getTime() <
                    new Date(new Date().setHours(0, 0, 0, 0)).getTime() ||
                  Math.floor(
                    (date.getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24),
                  ) >= 364
                ) {
                  return;
                }
                setPotentialDate(date);

                if (
                  date.getMonth() !== selectedDate.getMonth() &&
                  date.getTime() < selectedDate.getTime()
                ) {
                  goToPreviousMonth();
                }

                if (
                  date.getMonth() !== selectedDate.getMonth() &&
                  date.getTime() > selectedDate.getTime()
                ) {
                  goToNextMonth();
                }
              }}
            >
              <p
                className={`text-sm font-semibold min-[475px]:text-base ${
                  date.getMonth() === selectedDate.getMonth()
                    ? 'text-white-pale'
                    : 'text-gray-200'
                }`}
              >
                {date ? date.getDate() : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    );

    footerContent = (
      <footer className="mt-4 flex w-full items-center justify-between min-[475px]:gap-8">
        <Button
          label="Cancel"
          onClick={() => {
            setPotentialMinutes(selectedMinutes);
            setPotentialDate(taskDate);
            setSelectedDate(taskDate);
            setTimeOption(new Date().getHours() < 13 ? 'AM' : 'PM');
            setStep(null);
          }}
        />
        <Button
          label="Choose Time"
          onClick={() => {
            setStep(2);
          }}
          filled
        />
      </footer>
    );
  }

  if (STEPS.TIME === step) {
    modalTitle = 'Choose Time';

    const hoursSwiper: null | React.JSX.Element = (
      <TimerSwiper
        maxValue={11}
        initialSlide={Math.floor(potentialMinutes / 60)}
        setTime={(seconds: number) =>
          setPotentialMinutes((prev) => seconds * 60 + (prev % 60))
        }
      />
    );

    const minutesSwiper: null | React.JSX.Element = (
      <TimerSwiper
        maxValue={59}
        initialSlide={potentialMinutes % 60}
        setTime={(seconds: number) =>
          setPotentialMinutes((prev) => Math.floor(prev / 60) * 60 + seconds)
        }
      />
    );

    bodyContent = (
      <div className="mb-8 mt-12 flex w-full items-center justify-center gap-4">
        <div className="relative flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center bg-gray-800 font-bold min-[475px]:h-24 min-[475px]:w-24">
          <p className="absolute -top-6 text-white-pale min-[475px]:-top-7 min-[475px]:text-lg">
            Hours
          </p>
          {hoursSwiper}
        </div>
        <p className="text-3xl text-gray-dark dark:text-white-pale">:</p>
        <div className="relative flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center bg-gray-800 font-bold min-[475px]:h-24 min-[475px]:w-24">
          <p className="absolute -top-6 text-base text-white-pale min-[475px]:-top-7 min-[475px]:text-lg">
            Minutes
          </p>
          {minutesSwiper}
        </div>
        <div className="relative flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center bg-gray-800 font-bold min-[475px]:h-24 min-[475px]:w-24">
          <p className="absolute -top-6 text-base text-white-pale min-[475px]:-top-7 min-[475px]:text-lg">
            Early/Late
          </p>
          <TimeSwiper
            initialSlide={['AM', 'PM'].indexOf(timeOption)}
            setTime={setTimeOption}
          />
        </div>
      </div>
    );

    footerContent = (
      <footer className="mt-4 flex w-full items-center justify-between min-[475px]:gap-8">
        <Button
          label="Cancel"
          onClick={() => {
            setStep(1);
          }}
        />
        <Button
          label="Save"
          onClick={() => {
            const minutes = potentialMinutes % 60;
            const hours = Math.floor(potentialMinutes / 60);

            const updatedDate = new Date(potentialDate);
            updatedDate.setSeconds(0);
            updatedDate.setMilliseconds(0);
            updatedDate.setMinutes(minutes);
            updatedDate.setHours(timeOption === 'PM' ? hours + 12 : hours);
            setPotentialDate(updatedDate);

            setSelectedMinutes(potentialMinutes);
            setCustomValue('taskDate', updatedDate);
            setSelectedDate(updatedDate);
            setStep(null);
          }}
          filled
        />
      </footer>
    );
  }

  if (STEPS.CATEGORY === step) {
    modalTitle = 'Choose Category';

    bodyContent = (
      <div className="mt-6 grid w-full max-w-sm grid-cols-3 max-[475px]:mx-auto max-[475px]:max-w-[300px]">
        {categories.map((category, id) => (
          <div
            className={`mb-4 flex flex-col items-center ${
              category.label === 'Create New'
                ? 'cursor-not-allowed opacity-50'
                : ''
            }`}
            key={id}
          >
            <button
              className={`flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-lg disabled:cursor-not-allowed min-[475px]:h-[72px] min-[475px]:w-[72px] ${getCategoryBgColor(
                category.bgColor,
              )} transition-colors`}
              disabled={category.label === 'Create New'}
              onClick={() => setPotentialCategory(category)}
            >
              {category.icon({
                IconStyles: category.IconStyles,
              })}
            </button>
            <p
              className={`mt-2 text-sm min-[385px]:text-base ${
                category.label === potentialCategory?.label
                  ? 'text-green-300'
                  : 'text-white'
              }`}
            >
              {category.label}
            </p>
          </div>
        ))}
      </div>
    );

    footerContent = (
      <footer className="mt-4 flex w-full items-center justify-between min-[475px]:gap-8">
        <Button
          label="Cancel"
          onClick={() => {
            setPotentialCategory(taskCategory);
            setStep(null);
          }}
        />
        <Button
          label="Edit"
          onClick={() => {
            setCustomValue('taskCategory', potentialCategory);
            setStep(null);
          }}
          filled
        />
      </footer>
    );
  }

  if (STEPS.PRIORITY === step) {
    modalTitle = 'Task Priority';

    bodyContent = (
      <div className="mt-6 grid grid-cols-3 justify-center gap-4 px-2 max-[425px]:mx-auto max-[425px]:max-w-[300px] min-[425px]:grid-cols-4 min-[475px]:gap-4 min-[475px]:px-6">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((rate) => (
          <div
            className={`flex h-[74px] w-[74px] cursor-pointer flex-col items-center rounded-lg min-[475px]:h-20 min-[475px]:w-20 ${
              potentialPriority !== rate
                ? 'bg-gray-800 hover:bg-purple'
                : 'bg-purple'
            } pb-1 pt-[10px] transition-colors`}
            key={rate}
            onClick={() => setPotentialPriority(rate)}
          >
            <FlagIcon customClasses="text-white min-[475px]:h-16 min-[475px]:w-16" />
            <p className="mt-2 text-base text-white min-[475px]:text-lg">
              {rate}
            </p>
          </div>
        ))}
      </div>
    );

    footerContent = (
      <footer className="mt-6 flex w-full items-center justify-between min-[475px]:gap-8">
        <Button
          label="Cancel"
          onClick={() => {
            setPotentialPriority(taskPriority);
            setStep(null);
          }}
        />
        <Button
          label="Save"
          onClick={() => {
            setCustomValue('taskPriority', potentialPriority);
            setStep(null);
          }}
          filled
        />
      </footer>
    );
  }

  return (
    <>
      {step ? (
        <Modal
          title={modalTitle}
          isOpen={isOpen}
          body={bodyContent}
          footer={footerContent}
          onClose={onClose}
          bgType="dark"
          motionConfig={null}
        />
      ) : (
        <Modal
          isOpen={isOpen}
          body={bodyContent}
          onClose={onClose}
          outsideClose
          bgType="dark"
          motionConfig={null}
        />
      )}
    </>
  );
};

export default NewTaskModal;