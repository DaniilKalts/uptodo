/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';

import {
  FieldValues,
  Resolver,
  ResolverOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TagIcon, ClockIcon, FlagIcon, SendIcon } from './Icons';
import {
  GroceryIcon,
  HealthIcon,
  MusickIcon,
  UniversityIcon,
  WorkIcon,
  WorkoutIcon,
  DesignIcon,
} from '../Icons/Categories';

import { Button, Input, Textarea } from '../index';
import Modal from './Modal';
import SocialIcon from '../Icons/Categories/SocialIcon';
import MovieIcon from '../Icons/Categories/MovieIcon';
import HomeIcon from '../Icons/Categories/HomeIcon';
import AddIcon from '../Icons/Categories/AddIcon';

interface NewTaskInputs extends FieldValues {
  taskTitle: string;
  taskDescription: string;
  taskCategory: string;
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
    .max(100, 'Task description must not exceed 100 characters'),
  taskCategory: yup.string(),
  taskPriority: yup.number(),
});

enum STEPS {
  TIME = 1,
  CATEGORY = 2,
  PRIORITY = 3,
}

interface NewTaskModalInterface {
  isOpen: boolean;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalInterface> = ({ isOpen, onClose }) => {
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
      taskCategory: '',
      taskPriority: null,
    },
    resolver: yupResolver(schema) as Resolver<
      NewTaskInputs,
      ResolverOptions<NewTaskInputs>
    >,
  });

  const taskTitle = watch('taskTitle');
  const taskDescription = watch('taskDescription');
  const taskCategory = watch('taskCategory');
  const taskPriority = watch('taskPriority');

  const [step, setStep] = useState<number | null>(null);

  const [potentialCategory, setPotentialCategory] =
    useState<string>(taskCategory);
  const [potentialPriority, setPotentialPriority] = useState<null | number>(
    taskPriority,
  );

  let modalTitle: string = '';

  const categories: {
    icon: React.FC<{ customStyles: string }>;
    bgColor: string;
    label: string;
    customStyles: string;
  }[] = [
    {
      icon: GroceryIcon,
      bgColor: 'lemon-chiffon',
      label: 'Grocery',
      customStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
    },
    {
      icon: WorkIcon,
      bgColor: 'beige-light',
      label: 'Work',
      customStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
    },
    {
      icon: WorkoutIcon,
      bgColor: 'cyan-light',
      label: 'Sport',
      customStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
    },
    {
      icon: DesignIcon,
      bgColor: 'aquamarine-mist',
      label: 'Design',
      customStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
    },
    {
      icon: UniversityIcon,
      bgColor: 'blue-light',
      label: 'University',
      customStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
    },
    {
      icon: SocialIcon,
      bgColor: 'raspberry-sorbet',
      label: 'Social',
      customStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
    },
    {
      icon: MusickIcon,
      bgColor: 'pink-light',
      label: 'Musick',
      customStyles: 'w-7 h-7 min-[475px]:w-9 min-[475px]:h-9',
    },
    {
      icon: HealthIcon,
      bgColor: 'mint-light',
      label: 'Health',
      customStyles: 'w-8 h-8 min-[475px]:w-11 min-[475px]:h-11',
    },
    {
      icon: MovieIcon,
      bgColor: 'sky-blue',
      label: 'Movie',
      customStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
    },
    {
      icon: HomeIcon,
      bgColor: 'coral-pink',
      label: 'Home',
      customStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
    },
    {
      icon: AddIcon,
      bgColor: 'turquoise-haze',
      label: 'Create New',
      customStyles: 'w-8 h-8 min-[475px]:w-10 min-[475px]:h-10',
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

  const onSubmit: SubmitHandler<FieldValues> = (_, event) => {
    event?.preventDefault();
  };

  const setCustomValue = (id: any, value: any) => {
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
            customClasses={!isSubmitted ? 'text-white-pale' : 'text-red-dark'}
          />
          <TagIcon
            onClick={() => setStep(2)}
            customClasses={getCustomClassName(!!taskCategory)}
          />
          <FlagIcon
            onClick={() => setStep(3)}
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

  if (STEPS.TIME === step) {
    modalTitle = '';

    bodyContent = (
      <div className="px-2">
        <div className="flex items-center justify-between px-3">
          <svg
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
            <h4 className="text-base text-gray-dark dark:text-white-pale min-[475px]:text-lg">
              {new Date()
                .toLocaleString('en-US', { month: 'long' })
                .toUpperCase()}
            </h4>
            <p className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-base">
              {new Date().getFullYear()}
            </p>
          </div>
          <svg
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
        <div className="mx-auto my-3 h-[1px] w-full bg-white-pale"></div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-red min-[475px]:text-base">SUN</p>
          <p className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-base">
            MON
          </p>
          <p className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-base">
            TUE
          </p>
          <p className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-base">
            WED
          </p>
          <p className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-base">
            THU
          </p>
          <p className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-base">
            FRI
          </p>
          <p className="text-sm text-red min-[475px]:text-base">SAT</p>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-x-8 gap-y-3">
          {Array.from({ length: 31 }, (_, index) => index + 1).map(
            (day, id) => (
              <p
                key={id}
                className="flex items-center justify-center rounded-lg bg-gray-800 p-2 text-white-pale"
              >
                {day}
              </p>
            ),
          )}
        </div>
      </div>
    );

    footerContent = (
      <footer className="mt-4 flex w-full items-center justify-between min-[475px]:gap-8">
        <Button
          label="Cancel"
          onClick={() => {
            setStep(null);
          }}
        />
        <Button
          label="Choose Time"
          onClick={() => {
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
      <div className="mt-6 grid grid-cols-3 gap-x-5 max-[475px]:mx-auto max-[475px]:max-w-[300px] min-[475px]:px-8">
        {categories.map(({ icon, bgColor, label, customStyles }, id) => (
          <div
            className={`mb-4 flex flex-col items-center ${
              label === 'Create New' ? 'cursor-not-allowed opacity-50' : ''
            }`}
            key={id}
          >
            <button
              className={`flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-lg disabled:cursor-not-allowed min-[475px]:h-[72px] min-[475px]:w-[72px] ${getCategoryBgColor(
                bgColor,
              )} transition-colors`}
              disabled={label === 'Create New'}
              onClick={() => setPotentialCategory(label)}
            >
              {icon({
                customStyles,
              })}
            </button>
            <p
              className={`mt-2 text-sm min-[385px]:text-base ${
                label === potentialCategory ? 'text-green-300' : 'text-white'
              } min-[475px]:text-lg`}
            >
              {label}
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
          bgType="dark"
          motionConfig={null}
        />
      )}
    </>
  );
};

export default NewTaskModal;
