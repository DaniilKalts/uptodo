/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { TaskType } from '@/types';
import useTasksStore from '@/store/useTasksStore';

import { categories } from '@/utils/Categories';

import qs from 'query-string';

import TimerSwiper from '@/components/userPages/Focus/Timer/TimerSwiper';
import TimeSwiper from '@/components/userPages/Focus/Timer/TimeSwiper';

import {
  FieldValues,
  Resolver,
  ResolverOptions,
  useForm,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RxCross2 } from 'react-icons/rx';

import { toast } from 'react-hot-toast';

import {
  ClockIcon,
  FlagIcon,
  TagIcon,
} from '@/components/UI/Modals/NewTaskModal/Icons';

import {
  DesignIcon,
  GroceryIcon,
  HealthIcon,
  HomeIcon,
  MovieIcon,
  SocialIcon,
  UniversityIcon,
  MusickIcon,
  WorkIcon,
  WorkoutIcon,
} from '@/components/UI/Icons/Categories';

import { Container, Button, Input, Textarea } from '@/components/UI';
import Modal from '@/components/UI/Modals/Modal';

interface TaskIdPageProps {
  params: {
    taskId: string;
  };
}

interface TaskEditInputs extends FieldValues {
  taskTitle: string;
  taskDescription: string;
  taskDate: Date;
}

const schema = yup.object().shape({
  taskTitle: yup
    .string()
    .required('Title is required')
    .min(3, 'Task title must be at least 3 characters long')
    .max(20, 'Task title must not exceed 20 characters'),
  taskDescription: yup
    .string()
    .max(200, 'Task description must not exceed 200 characters'),
  taskDate: yup.date().required(),
});

enum STEPS {
  TITLE_DESCRIPTION = 1,
  DATE = 2,
  TIME = 3,
  CATEGORY = 4,
  PRIORITY = 5,
  DELETE = 6,
}

type TaskPropsValue =
  | null
  | string
  | number
  | Date
  | {
      bgColor: string;
      label: string;
    };

const Task = ({ params }: TaskIdPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [task, setTask] = useState<TaskType | undefined>();

  const [initialTaskTitle, setInitialTaskTitle] = useState<string>('');
  const [initialTaskDescription, setInitialTaskDescription] =
    useState<string>('');
  const [initialTaskTodayAt, setInitialTaskTodayAt] = useState<number>(0);
  const [initialTaskCompletedAt, setInitialTaskCompletedAt] =
    useState<number>(0);
  const [initialTaskCategory, setInitialTaskCategory] = useState<{
    bgColor: string;
    label: string;
  } | null>(null);
  const [initialTaskPriority, setInitialTaskPriority] = useState<null | number>(
    null,
  );

  const storeCompletedTasks = useTasksStore((state) => state.completedTasks);
  const storeIncompletedTasks = useTasksStore(
    (state) => state.incompletedTasks,
  );
  const addIncompletedTask = useTasksStore((state) => state.addIncompletedTask);
  const addCompletedTask = useTasksStore((state) => state.addCompletedTask);
  const removeIncompletedTask = useTasksStore(
    (state) => state.removeIncompletedTask,
  );
  const removeCompletedTask = useTasksStore(
    (state) => state.removeCompletedTask,
  );
  const updateIncompletedTask = useTasksStore(
    (state) => state.updateIncompletedTask,
  );
  const updateCompletedTask = useTasksStore(
    (state) => state.updateCompletedTask,
  );

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskEditInputs>({
    mode: 'all',
    defaultValues: {
      taskTitle: '',
      taskDescription: '',
      taskDate: new Date(),
    },
    resolver: yupResolver(schema) as unknown as Resolver<
      TaskEditInputs,
      ResolverOptions<TaskEditInputs>
    >,
  });

  const taskTitle = watch('taskTitle');
  const taskDescription = watch('taskDescription');
  const taskDate = watch('taskDate');

  const setCustomValue = (id: string, value: TaskPropsValue) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const [step, setStep] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  let modalTitle: string = '';
  let bodyContent = null;
  let footerContent = null;

  const [potentialComletedAt, setPotentialComletedAt] = useState<number>(0);

  const [potentialDate, setPotentialDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
  const [potentialMinutes, setPotentialMinutes] = useState<number>(60);
  const [timeOption, setTimeOption] = useState<string>('');
  const [potentialTimeOption, setPotentialTimeOption] = useState<string>('');

  const [potentialCategory, setPotentialCategory] = useState<{
    bgColor: string;
    label: string;
  } | null>(null);
  const [potentialPriority, setPotentialPriority] = useState<null | number>(
    null,
  );

  const getTimeString = (time: number) => String(time).padStart(2, '0');
  const getCategoryIcon = (label: string, iustonStyles: string) => {
    if (!label) {
      return null;
    }

    if (label === 'Grocery') {
      return <GroceryIcon IconStyles={iustonStyles} />;
    }
    if (label === 'Work') {
      return <WorkIcon IconStyles={iustonStyles} />;
    }
    if (label === 'Sport') {
      return <WorkoutIcon IconStyles={iustonStyles} />;
    }
    if (label === 'Design') {
      return <DesignIcon IconStyles={iustonStyles} />;
    }
    if (label === 'University') {
      return <UniversityIcon IconStyles={iustonStyles} />;
    }
    if (label === 'Social') {
      return <SocialIcon IconStyles={iustonStyles} />;
    }
    if (label === 'Musick') {
      return <MusickIcon IconStyles={iustonStyles} />;
    }
    if (label === 'Health') {
      return <HealthIcon IconStyles={iustonStyles} />;
    }
    if (label === 'Movie') {
      return <MovieIcon IconStyles={iustonStyles} />;
    }
    if (label === 'Home') {
      return <HomeIcon IconStyles={iustonStyles} />;
    }
  };

  const text = task?.description;
  const lines = text?.split('\n');

  function getPriorityLabel(priority: number) {
    const priorityLabels = ['Low', 'Medium', 'High', 'Critical'];
    const index = Math.min(Math.floor(priority / 3), 3);

    return priorityLabels[index];
  }

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

  useEffect(() => {
    const foundTask = [...storeIncompletedTasks, ...storeCompletedTasks].find(
      (currentTask: TaskType) => currentTask.id === Number(params.taskId),
    );

    if (foundTask) {
      setInitialTaskTitle(foundTask.title);
      setInitialTaskDescription(foundTask.description);
      setInitialTaskTodayAt(foundTask.todayAt);
      setInitialTaskCompletedAt(foundTask.completedAt);
      setInitialTaskCategory(foundTask.category);
      setInitialTaskPriority(foundTask.priority);

      setTask(foundTask);
      setPotentialDate(new Date(foundTask.todayAt));
      setSelectedDate(new Date(foundTask.todayAt));
      setPotentialComletedAt(foundTask.completedAt);
      setPotentialCategory(foundTask.category);
      setPotentialPriority(foundTask.priority);
      setCustomValue('taskTitle', foundTask.title);
      setCustomValue('taskDescription', foundTask.description);
      setCustomValue('taskDate', foundTask.todayAt);

      if (new Date(foundTask.todayAt).getHours() > 11) {
        setTimeOption('PM');
        setPotentialTimeOption('PM');
        setPotentialMinutes(
          (new Date(foundTask.todayAt).getHours() - 12 || 12) * 60 +
            new Date(foundTask.todayAt).getMinutes(),
        );
        setSelectedMinutes(
          (new Date(foundTask.todayAt).getHours() - 12 || 12) * 60 +
            new Date(foundTask.todayAt).getMinutes(),
        );
      } else if (new Date(foundTask.todayAt).getHours() < 12) {
        setTimeOption('AM');
        setPotentialTimeOption('AM');
        setPotentialMinutes(
          (new Date(foundTask.todayAt).getHours() || 12) * 60 +
            new Date(foundTask.todayAt).getMinutes(),
        );
        setSelectedMinutes(
          new Date(foundTask.todayAt).getHours() * 60 +
            new Date(foundTask.todayAt).getMinutes(),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeIncompletedTasks, storeCompletedTasks, params.taskId]);

  if (!task) {
    return null;
  }

  if (step === STEPS.TITLE_DESCRIPTION) {
    modalTitle = 'Edit Task Title';

    bodyContent = (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 w-full max-w-sm"
      >
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
      </form>
    );
    footerContent = (
      <footer className="mt-2 flex w-full items-center justify-between min-[475px]:gap-8">
        <Button
          label="Cancel"
          onClick={() => {
            setCustomValue('taskTitle', task.title);
            setCustomValue('taskDescription', task.description);
            setIsOpen(false);
          }}
        />
        <Button
          label="Edit"
          onClick={() => {
            setTask((prev) => {
              const modifiedTask = prev as TaskType;
              modifiedTask.title = taskTitle;
              modifiedTask.description = taskDescription;
              return modifiedTask;
            });

            setIsOpen(false);
          }}
          disabled={
            !taskTitle ||
            Object.keys(errors).includes('taskTitle') ||
            Object.keys(errors).includes('taskDescription')
          }
          filled
        />
      </footer>
    );
  }

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
      i += 1
    ) {
      const currentDate = new Date(year, month - 1, i);
      daysInMonth.push(currentDate);
    }

    for (let i = 1; i <= lastDay.getDate(); i += 1) {
      const currentDate = new Date(year, month, i);
      daysInMonth.push(currentDate);
    }

    const nextMonthDaysToAdd = 7 - (daysInMonth.length % 7);
    for (let i = 1; i <= nextMonthDaysToAdd; i += 1) {
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
        ) >= 90
      )
    ) {
      return 'cursor-pointer bg-purple';
    }

    if (date.getMonth() === selectedDate.getMonth()) {
      if (
        date.getTime() < new Date(new Date().setHours(0, 0, 0, 0)).getTime() ||
        Math.floor(
          (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
        ) >= 90
      ) {
        return 'cursor-not-allowed bg-gray-800 opacity-50';
      }
      return 'cursor-pointer bg-gray-800 hover:bg-purple';
    }

    if (
      Math.floor(
        (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      ) >= 90
    ) {
      if (selectedDate.getMonth() === date.getMonth()) {
        return 'cursor-not-allowed bg-gray-800 opacity-50';
      }
      return 'cursor-not-allowed opacity-50';
    }

    const midnightDate = new Date();
    midnightDate.setHours(0, 0, 0, 0);

    return date.getTime() < midnightDate.getTime()
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
            <h4 className="text-lg text-white-pale min-[475px]:text-xl">
              {selectedDate
                .toLocaleString('en-GB', {
                  month: 'long',
                })
                .toUpperCase()}
            </h4>
            <p className="text-sm text-gray-200 min-[475px]:text-base">
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
          <div className="text-center text-xs font-semibold uppercase text-white-pale min-[475px]:text-base">
            Mon
          </div>
          <div className="text-center text-xs font-semibold uppercase text-white-pale min-[475px]:text-base">
            Tue
          </div>
          <div className="text-center text-xs font-semibold uppercase text-white-pale min-[475px]:text-base">
            Wed
          </div>
          <div className="text-center text-xs font-semibold uppercase text-white-pale min-[475px]:text-base">
            Thu
          </div>
          <div className="text-center text-xs font-semibold uppercase text-white-pale min-[475px]:text-base">
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
                  ) >= 90
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
            setPotentialDate(new Date(taskDate));
            setSelectedDate(new Date(taskDate));
            setPotentialTimeOption(timeOption);
            setIsOpen(false);
          }}
        />
        <Button
          label="Choose Time"
          onClick={() => {
            setStep(STEPS.TIME);
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
        minValue={1}
        maxValue={12}
        initialSlide={Math.floor(potentialMinutes / 60 || 1) - 1}
        setTime={(hours: number) =>
          setPotentialMinutes((prev) => hours * 60 + (prev % 60))
        }
      />
    );

    const minutesSwiper: null | React.JSX.Element = (
      <TimerSwiper
        minValue={0}
        maxValue={59}
        initialSlide={potentialMinutes % 60}
        setTime={(minutes: number) =>
          setPotentialMinutes((prev) => Math.floor(prev / 60) * 60 + minutes)
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
        <p className="text-3xl text-white-pale">:</p>
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
            initialSlide={['AM', 'PM'].indexOf(potentialTimeOption)}
            setTime={setPotentialTimeOption}
          />
        </div>
      </div>
    );

    footerContent = (
      <footer className="mt-4 flex w-full items-center justify-between min-[475px]:gap-8">
        <Button
          label="Cancel"
          onClick={() => {
            setStep(STEPS.DATE);
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

            if (potentialTimeOption === 'PM') {
              if (hours < 12) {
                updatedDate.setHours(hours + 12);
              } else {
                updatedDate.setHours(12);
              }
            }
            if (potentialTimeOption === 'AM') {
              if (hours < 12) {
                updatedDate.setHours(hours);
              } else {
                updatedDate.setHours(0);
              }
            }

            setPotentialDate(updatedDate);
            setTimeOption(potentialTimeOption);
            setSelectedMinutes(potentialMinutes);
            setSelectedDate(updatedDate);
            setCustomValue('taskDate', updatedDate);

            setTask((prev) => {
              const modifiedTask = prev as TaskType;
              modifiedTask.todayAt = updatedDate.getTime();
              return modifiedTask;
            });

            setIsOpen(false);
          }}
          filled
        />
      </footer>
    );
  }

  if (step === STEPS.CATEGORY) {
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
      <footer className="mt-6 flex w-full items-center justify-between min-[475px]:gap-8">
        <Button
          label="Cancel"
          onClick={() => {
            setPotentialCategory(task.category);
            setIsOpen(false);
          }}
        />
        <Button
          label="Edit"
          onClick={() => {
            setTask((prev) => {
              const modifiedTask = prev as TaskType;
              modifiedTask.category = potentialCategory as {
                bgColor: string;
                label: string;
              };
              return modifiedTask;
            });

            setIsOpen(false);
          }}
          filled
        />
      </footer>
    );
  }

  if (step === STEPS.PRIORITY) {
    modalTitle = 'Edit Task Priority';

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
            onClick={() => {
              setPotentialPriority(rate);
            }}
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
            setPotentialPriority(task.priority);
            setIsOpen(false);
          }}
        />
        <Button
          label="Edit"
          onClick={() => {
            setTask((prev) => {
              const modifiedTask = prev as TaskType;
              modifiedTask.priority = potentialPriority as number;
              return modifiedTask;
            });

            setIsOpen(false);
          }}
          filled
        />
      </footer>
    );
  }

  if (step === STEPS.DELETE) {
    modalTitle = 'Delete Task';

    bodyContent = (
      <h2 className="my-7 text-center text-[18px] text-white-pale min-[475px]:text-[20px]">
        Are You sure you want to delete this task? <br /> Task title :{' '}
        {task.title}
      </h2>
    );
    footerContent = (
      <footer className="flex w-full items-center justify-between min-[475px]:gap-8">
        <Button label="Cancel" onClick={() => setIsOpen(false)} />
        <Button
          label="Delete"
          onClick={() => {
            if (!task.completedAt) {
              removeIncompletedTask(task.id);

              toast('Successfully Deleted', {
                icon: '❌',
                duration: 2000,
              });

              setTimeout(() => {
                router.back();
              }, 2000);
            }
            if (task.completedAt) {
              removeCompletedTask(task.id);

              toast('Successfully Deleted', {
                icon: '❌',
                duration: 2000,
              });

              setTimeout(() => {
                router.back();
              }, 2000);
            }
          }}
          filled
        />
      </footer>
    );
  }

  return (
    <Container>
      <div className="mx-auto mt-8 max-w-lg gap-4 pb-40">
        <header className="relative flex items-center justify-between">
          <div className="group">
            <div
              onClick={() => {
                setTask({
                  id: task.id,
                  title: initialTaskTitle,
                  description: initialTaskDescription,
                  createdAt: task.createdAt,
                  todayAt: initialTaskTodayAt,
                  completedAt: initialTaskCompletedAt,
                  category: {
                    bgColor: initialTaskCategory?.bgColor as string,
                    label: initialTaskCategory?.label as string,
                  },
                  priority: initialTaskPriority as number,
                });

                setPotentialComletedAt(initialTaskCompletedAt);
                setSelectedDate(new Date(initialTaskTodayAt));
                setPotentialDate(new Date(initialTaskTodayAt));

                if (new Date(initialTaskTodayAt).getHours() > 11) {
                  setTimeOption('PM');
                  setPotentialTimeOption('PM');
                  setPotentialMinutes(
                    (new Date(initialTaskTodayAt).getHours() - 12 || 12) * 60 +
                      new Date(initialTaskTodayAt).getMinutes(),
                  );
                  setSelectedMinutes(
                    (new Date(initialTaskTodayAt).getHours() - 12 || 12) * 60 +
                      new Date(initialTaskTodayAt).getMinutes(),
                  );
                } else if (new Date(initialTaskTodayAt).getHours() < 12) {
                  setTimeOption('AM');
                  setPotentialTimeOption('AM');
                  setPotentialMinutes(
                    (new Date(initialTaskTodayAt).getHours() || 12) * 60 +
                      new Date(initialTaskTodayAt).getMinutes(),
                  );
                  setSelectedMinutes(
                    new Date(initialTaskTodayAt).getHours() * 60 +
                      new Date(initialTaskTodayAt).getMinutes(),
                  );
                }

                setCustomValue('taskTitle', initialTaskTitle);
                setCustomValue('taskDescription', initialTaskDescription);
                setCustomValue('taskDate', new Date(initialTaskTodayAt));
              }}
              className="w-fit cursor-pointer rounded-lg bg-gray-500 p-2 transition-colors hover:bg-gray-light dark:bg-black-light dark:hover:bg-gray-800"
            >
              <svg
                className="h-7 w-7 text-white-pale"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.4201 12.22C20.0101 12.22 19.6701 11.88 19.6701 11.47V8.15002C19.6701 6.91002 18.6601 5.90002 17.4201 5.90002H3.58008C3.17008 5.90002 2.83008 5.56002 2.83008 5.15002C2.83008 4.74002 3.17008 4.40002 3.58008 4.40002H17.4201C19.4901 4.40002 21.1701 6.08002 21.1701 8.15002V11.47C21.1701 11.89 20.8301 12.22 20.4201 12.22Z"
                  fill="currentColor"
                />
                <path
                  d="M6.74008 9.06998C6.55008 9.06998 6.36008 8.99995 6.21008 8.84995L3.05008 5.68997C2.91008 5.54997 2.83008 5.35994 2.83008 5.15994C2.83008 4.95994 2.91008 4.76998 3.05008 4.62998L6.21008 1.46994C6.50008 1.17994 6.98008 1.17994 7.27008 1.46994C7.56008 1.75994 7.56008 2.24 7.27008 2.53L4.64011 5.15994L7.27008 7.78995C7.56008 8.07995 7.56008 8.55995 7.27008 8.84995C7.12008 8.98995 6.93008 9.06998 6.74008 9.06998Z"
                  fill="currentColor"
                />
                <path
                  d="M20.4201 19.59H6.58008C4.51008 19.59 2.83008 17.91 2.83008 15.84V12.52C2.83008 12.11 3.17008 11.77 3.58008 11.77C3.99008 11.77 4.33008 12.11 4.33008 12.52V15.84C4.33008 17.08 5.34008 18.09 6.58008 18.09H20.4201C20.8301 18.09 21.1701 18.43 21.1701 18.84C21.1701 19.25 20.8301 19.59 20.4201 19.59Z"
                  fill="currentColor"
                />
                <path
                  d="M17.2602 22.75C17.0702 22.75 16.8802 22.68 16.7302 22.53C16.4402 22.24 16.4402 21.7599 16.7302 21.4699L19.3602 18.84L16.7302 16.21C16.4402 15.92 16.4402 15.44 16.7302 15.15C17.0202 14.86 17.5002 14.86 17.7902 15.15L20.9502 18.31C21.0902 18.45 21.1702 18.64 21.1702 18.84C21.1702 19.04 21.0902 19.23 20.9502 19.37L17.7902 22.53C17.6502 22.68 17.4602 22.75 17.2602 22.75Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="absolute left-0 top-[44px] z-10 inline-block rounded-lg bg-gray-dark px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm group-hover:opacity-100 dark:bg-black-light">
              Recover initial data
            </div>
          </div>
          <div className="group">
            <div
              onClick={() => {
                const midnightDate = new Date(task.todayAt);
                midnightDate.setHours(0, 0, 0, 0);

                let newRoute = window.location.origin;

                const previousPage = searchParams.get('previousPage') || 'home';
                const query =
                  previousPage === 'calendar'
                    ? { dateTime: String(midnightDate.getTime()) }
                    : {};

                if (!task.completedAt && !initialTaskCompletedAt) {
                  updateIncompletedTask(task);

                  if (
                    initialTaskTitle !== task.title ||
                    initialTaskDescription !== task.description ||
                    initialTaskTodayAt !== task.todayAt ||
                    initialTaskCompletedAt !== task.completedAt ||
                    initialTaskCategory !== task.category ||
                    initialTaskPriority !== task.priority
                  ) {
                    toast('Successfully updated Task', {
                      icon: '🔥',
                      duration: 2000,
                    });
                  }

                  const url = qs.stringifyUrl(
                    {
                      url:
                        previousPage === 'calendar'
                          ? `${`${newRoute}/${previousPage}`}/incompleted`
                          : `${`${newRoute}/${previousPage}`}`,
                      query,
                    },
                    { skipNull: true },
                  );

                  setTimeout(() => {
                    router.push(url);
                  }, 2000);
                }
                if (task.completedAt && initialTaskCompletedAt) {
                  updateCompletedTask(task);

                  if (
                    initialTaskTitle !== task.title ||
                    initialTaskDescription !== task.description ||
                    initialTaskTodayAt !== task.todayAt ||
                    initialTaskCompletedAt !== task.completedAt ||
                    initialTaskCategory !== task.category ||
                    initialTaskPriority !== task.priority
                  ) {
                    toast('Successfully updated Task', {
                      icon: '🔥',
                      duration: 2000,
                    });
                  }

                  const url = qs.stringifyUrl(
                    {
                      url:
                        previousPage === 'calendar'
                          ? `${`${newRoute}/${previousPage}`}/completed`
                          : `${`${newRoute}/${previousPage}`}`,
                      query,
                    },
                    { skipNull: true },
                  );

                  setTimeout(() => {
                    router.push(url);
                  }, 2000);
                }

                if (!task.completedAt && initialTaskCompletedAt) {
                  addIncompletedTask(task);
                  removeCompletedTask(task.id);

                  toast('Successfully editted', {
                    icon: '🔥',
                    duration: 2000,
                  });

                  const url = qs.stringifyUrl(
                    {
                      url:
                        previousPage === 'calendar'
                          ? `${`${newRoute}/${previousPage}`}/incompleted`
                          : `${`${newRoute}/${previousPage}`}`,
                      query,
                    },
                    { skipNull: true },
                  );

                  setTimeout(() => {
                    router.push(url);
                  }, 2000);
                }
                if (task.completedAt && !initialTaskCompletedAt) {
                  addCompletedTask(task);
                  removeIncompletedTask(task.id);

                  toast('Successfully editted', {
                    icon: '🔥',
                    duration: 2000,
                  });

                  newRoute = newRoute.replace('incompleted', 'completed');

                  const url = qs.stringifyUrl(
                    {
                      url:
                        previousPage === 'calendar'
                          ? `${`${newRoute}/${previousPage}`}/completed`
                          : `${`${newRoute}/${previousPage}`}`,
                      query,
                    },
                    { skipNull: true },
                  );

                  setTimeout(() => {
                    router.push(url);
                  }, 2000);
                }
              }}
              className="w-fit cursor-pointer rounded-lg bg-gray-500 p-2 transition-colors hover:bg-gray-light dark:bg-black-light dark:hover:bg-gray-800"
            >
              <RxCross2 className="h-7 w-7 text-white-pale" />
            </div>
            <div className="absolute right-0 top-[44px] z-10 inline-block rounded-lg bg-gray-dark px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm group-hover:opacity-100 dark:bg-black-light">
              Back to previous page & Save changes
            </div>
          </div>
        </header>
        <hr className="mb-4 mt-5 h-[2px] w-full rounded border-0 bg-gray-dark" />
        <div>
          <div className="flex items-start">
            {!potentialComletedAt ? (
              <div
                onClick={() => {
                  setTask((prev) => {
                    const modifiedTask = prev as TaskType;
                    modifiedTask.completedAt = new Date().getTime();
                    return modifiedTask;
                  });

                  setPotentialComletedAt(new Date().getTime());

                  toast('Added to Completed!', {
                    icon: '👏',
                  });
                }}
                className="group mr-4 mt-[18px] flex h-5 w-[22px] cursor-pointer items-center justify-center rounded-full border-2 border-gray-dark bg-transparent dark:border-white-pale min-[475px]:mt-4 min-[475px]:h-6 min-[475px]:w-[26px]"
              >
                <div className="h-[7px] w-[7px] rounded-full bg-gray-dark opacity-0 group-hover:opacity-100 dark:bg-white-pale min-[475px]:h-2 min-[475px]:w-2"></div>
              </div>
            ) : (
              <div
                onClick={() => {
                  setTask((prev) => {
                    const modifiedTask = prev as TaskType;
                    modifiedTask.completedAt = 0;
                    return modifiedTask;
                  });

                  setPotentialComletedAt(0);

                  toast('Added to Incompleted!', {
                    icon: '😒',
                    duration: 2000,
                  });
                }}
                className="mr-4 mt-[18px] flex h-5 w-[22px] cursor-pointer items-center justify-center rounded-full border-2 border-gray-dark bg-transparent dark:border-white-pale min-[475px]:mt-4 min-[475px]:h-6 min-[475px]:w-[26px]"
              >
                <div className="h-[7px] w-[7px] rounded-full bg-gray-dark dark:bg-white-pale min-[475px]:h-2 min-[475px]:w-2"></div>
              </div>
            )}
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h6 className="text-lg text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
                  {task.title}
                </h6>
                <div className="group relative">
                  <svg
                    onClick={() => {
                      setStep(STEPS.TITLE_DESCRIPTION);
                      setIsOpen(true);
                    }}
                    className="h-14 w-14 cursor-pointer text-gray-dark dark:text-white-pale"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.54 31.52C16.93 31.52 16.36 31.31 15.95 30.92C15.43 30.43 15.18 29.69 15.27 28.89L15.64 25.65C15.71 25.04 16.08 24.23 16.51 23.79L24.72 15.1C26.77 12.93 28.91 12.87 31.08 14.92C33.25 16.97 33.31 19.11 31.26 21.28L23.05 29.97C22.63 30.42 21.85 30.84 21.24 30.94L18.02 31.49C17.85 31.5 17.7 31.52 17.54 31.52ZM27.93 14.91C27.16 14.91 26.49 15.39 25.81 16.11L17.6 24.81C17.4 25.02 17.17 25.52 17.13 25.81L16.76 29.05C16.72 29.38 16.8 29.65 16.98 29.82C17.16 29.99 17.43 30.05 17.76 30L20.98 29.45C21.27 29.4 21.75 29.14 21.95 28.93L30.16 20.24C31.4 18.92 31.85 17.7 30.04 16C29.24 15.23 28.55 14.91 27.93 14.91Z"
                      fill="currentColor"
                    />
                    <path
                      d="M29.3399 22.95C29.3199 22.95 29.2899 22.95 29.2699 22.95C26.1499 22.64 23.6399 20.27 23.1599 17.17C23.0999 16.76 23.3799 16.38 23.7899 16.31C24.1999 16.25 24.5799 16.53 24.6499 16.94C25.0299 19.36 26.9899 21.22 29.4299 21.46C29.8399 21.5 30.1399 21.87 30.0999 22.28C30.0499 22.66 29.7199 22.95 29.3399 22.95Z"
                      fill="currentColor"
                    />
                    <path
                      d="M33 34.75H15C14.59 34.75 14.25 34.41 14.25 34C14.25 33.59 14.59 33.25 15 33.25H33C33.41 33.25 33.75 33.59 33.75 34C33.75 34.41 33.41 34.75 33 34.75Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="absolute right-0 top-[44px] z-10 inline-block rounded-lg bg-gray-dark px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm group-hover:opacity-100 dark:bg-black-light">
                    Edit Title & Description
                  </div>
                </div>
              </div>
              <p className="max-w-lg text-base text-gray-600 dark:text-gray-200 min-[475px]:text-lg">
                {lines?.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index !== lines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex flex-col gap-9">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <ClockIcon
                  onClick={() => {}}
                  customClasses={'text-gray-dark dark:text-white-pale w-7 h-7'}
                />
                <h5 className="text-base text-gray-dark dark:text-white-pale min-[475px]:text-xl">
                  Task Time :
                </h5>
              </div>
              <div
                onClick={() => {
                  setStep(STEPS.DATE);
                  setIsOpen(true);
                }}
                className="cursor-pointer rounded-lg bg-gray-500 px-4 py-3 text-sm text-white hover:bg-gray-light dark:bg-gray-600 dark:hover:bg-gray-500 min-[475px]:px-6 min-[475px]:py-4 min-[475px]:text-base"
              >
                Today At:{' '}
                {`${getTimeString(
                  new Date(task.todayAt).getHours() % 12 || 12,
                )}:${getTimeString(new Date(task.todayAt).getMinutes())} ${
                  new Date(task.todayAt).getHours() >= 12 ? 'pm' : 'am'
                }`}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <TagIcon
                  onClick={() => {}}
                  customClasses={'text-gray-dark dark:text-white-pale w-7 h-7'}
                />
                <h5 className="text-base text-gray-dark dark:text-white-pale min-[475px]:text-xl">
                  Task Category :
                </h5>
              </div>
              <div
                onClick={() => {
                  setStep(STEPS.CATEGORY);
                  setIsOpen(true);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-light dark:bg-gray-600 dark:hover:bg-gray-500 min-[475px]:px-6 min-[475px]:text-base"
              >
                {getCategoryIcon(
                  task.category.label,
                  'w-7 h-7 min-[475px]:w-9 min-[475px]:h-9',
                )}{' '}
                {task.category.label}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <FlagIcon
                  onClick={() => {}}
                  customClasses={'text-gray-dark dark:text-white-pale w-7 h-7'}
                />
                <h5 className="text-base text-gray-dark dark:text-white-pale min-[475px]:text-xl">
                  Task Prioroty :
                </h5>
              </div>
              <div
                onClick={() => {
                  setStep(STEPS.PRIORITY);
                  setIsOpen(true);
                }}
                className="cursor-pointer rounded-lg bg-gray-500 px-4 py-3 text-sm text-white hover:bg-gray-light dark:bg-gray-600 dark:hover:bg-gray-500 min-[475px]:px-6 min-[475px]:text-base"
              >
                {getPriorityLabel(task.priority)}
              </div>
            </div>
            <div
              onClick={() => {}}
              className="flex items-center justify-between"
            >
              <div
                onClick={() => {
                  setStep(STEPS.DELETE);
                  setIsOpen(true);
                }}
                className="group flex cursor-pointer gap-3"
              >
                <svg
                  className="h-7 w-7 text-red group-hover:text-red-dark"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.9999 6.73001C20.9799 6.73001 20.9499 6.73001 20.9199 6.73001C15.6299 6.20001 10.3499 6.00001 5.11992 6.53001L3.07992 6.73001C2.65992 6.77001 2.28992 6.47001 2.24992 6.05001C2.20992 5.63001 2.50992 5.27001 2.91992 5.23001L4.95992 5.03001C10.2799 4.49001 15.6699 4.70001 21.0699 5.23001C21.4799 5.27001 21.7799 5.64001 21.7399 6.05001C21.7099 6.44001 21.3799 6.73001 20.9999 6.73001Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8.50001 5.72C8.46001 5.72 8.42001 5.72 8.37001 5.71C7.97001 5.64 7.69001 5.25 7.76001 4.85L7.98001 3.54C8.14001 2.58 8.36001 1.25 10.69 1.25H13.31C15.65 1.25 15.87 2.63 16.02 3.55L16.24 4.85C16.31 5.26 16.03 5.65 15.63 5.71C15.22 5.78 14.83 5.5 14.77 5.1L14.55 3.8C14.41 2.93 14.38 2.76 13.32 2.76H10.7C9.64001 2.76 9.62001 2.9 9.47001 3.79L9.24001 5.09C9.18001 5.46 8.86001 5.72 8.50001 5.72Z"
                    fill="currentColor"
                  />
                  <path
                    d="M15.2099 22.75H8.7899C5.2999 22.75 5.1599 20.82 5.0499 19.26L4.3999 9.19C4.3699 8.78 4.6899 8.42 5.0999 8.39C5.5199 8.37 5.8699 8.68 5.8999 9.09L6.5499 19.16C6.6599 20.68 6.6999 21.25 8.7899 21.25H15.2099C17.3099 21.25 17.3499 20.68 17.4499 19.16L18.0999 9.09C18.1299 8.68 18.4899 8.37 18.8999 8.39C19.3099 8.42 19.6299 8.77 19.5999 9.19L18.9499 19.26C18.8399 20.82 18.6999 22.75 15.2099 22.75Z"
                    fill="currentColor"
                  />
                  <path
                    d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z"
                    fill="currentColor"
                  />
                  <path
                    d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z"
                    fill="currentColor"
                  />
                </svg>
                <h5 className="text-base text-red group-hover:text-red-dark min-[475px]:text-xl">
                  Delete Task
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={modalTitle}
        isOpen={isOpen}
        body={bodyContent}
        footer={footerContent}
        onClose={() => setIsOpen(false)}
        bgType="dark"
        motionConfig={null}
      />
    </Container>
  );
};

export default Task;
