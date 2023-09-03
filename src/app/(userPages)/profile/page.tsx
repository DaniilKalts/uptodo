/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import useTasksStore from '@/store/useTasksStore';

import { SiMicrosoftexcel } from 'react-icons/si';
import ExcelJS from 'exceljs';
import { toast } from 'react-hot-toast';

import {
  FieldValues,
  Resolver,
  ResolverOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ProfileLink from '@/components/userPages/Profile/ProfileTypography';
import Modal from '@/components/UI/Modals/Modal';

import {
  SettingsIcon,
  ProfileNameIcon,
  ProfileImageIcon,
  ProfilePasswordIcon,
  AboutUsIcon,
  FaqIcon,
  FeedbackIcon,
  SupportIcon,
  LogOutIcon,
} from '@/components/userPages/Profile/Icons/Profile';
import { Container, Button, Input } from '@/components/UI';

interface AccountChangeInputs extends FieldValues {
  accountName: string;
  accountOldPassword: string;
  accountNewPassword: string;
}

let oldPassword = 'Danya17!';

const schema = yup.object().shape({
  accountName: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must not exceed 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain alphanumeric characters and underscores',
    ),
  accountOldPassword: yup
    .string()
    .required('Old password is required')
    .min(8, 'Old password must be at least 8 characters long')
    .max(20, 'Old password must not exceed 20 characters')
    .test(
      'matches-specific-string',
      'This password does not match the old one',
      (value) => value === oldPassword,
    ),
  accountNewPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters long')
    .max(20, 'New password must not exceed 20 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'New password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    ),
});

enum STEPS {
  ACCOUNT_NAME = 1,
  ACCOUNT_PASSWORD = 2,
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

const Profile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccountChangeInputs>({
    mode: 'all',
    defaultValues: {
      accountName: 'KaltsDaniil',
      accountOldPassword: '',
      accountNewPassword: '',
    },
    resolver: yupResolver(schema) as unknown as Resolver<
      AccountChangeInputs,
      ResolverOptions<AccountChangeInputs>
    >,
  });

  const accountName = watch('accountName');
  const accountOldPassword = watch('accountOldPassword');
  const accountNewPassword = watch('accountNewPassword');

  const [initialAccountName, setInitialAccountName] =
    useState<string>('KaltsDaniil');

  const setCustomValue = (id: string, value: TaskPropsValue) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const [mounted, setMounted] = useState<boolean>(false);
  const [step, setStep] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  let modalTitle: string = '';
  let bodyContent = null;
  let footerContent = null;

  const onSubmit: SubmitHandler<FieldValues> = (_, event) => {
    event?.preventDefault();

    if (accountOldPassword.length && accountNewPassword.length) {
      oldPassword = accountNewPassword;

      toast('The account password is changed', {
        icon: '🔑',
        duration: 3000,
      });

      setCustomValue('accountOldPassword', '');
      setCustomValue('accountNewPassword', '');

      setStep(null);
      setIsOpen(false);
    }
  };

  const storeIncompletedTasks = useTasksStore(
    (state) => state.incompletedTasks,
  );
  const storeCompletedTasks = useTasksStore((state) => state.completedTasks);

  const [incompletedCount, setIcompletedCount] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);

  function getPriorityLabel(priority: number) {
    const priorityLabels = ['Low', 'Medium', 'High', 'Critical'];
    const index = Math.min(Math.floor(priority / 3), 3);

    return priorityLabels[index];
  }

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Your all Tasks List');
    sheet.properties.defaultRowHeight = 80;

    sheet.columns = [
      {
        header: 'Id',
        key: 'id',
        width: 10,
      },
      {
        header: 'Title',
        key: 'title',
        width: 10,
      },
      {
        header: 'Description',
        key: 'description',
        width: 10,
      },
      {
        header: 'CreatedAt',
        key: 'createdAt',
        width: 10,
      },
      {
        header: 'CompletedAt',
        key: 'completedAt',
        width: 10,
      },
      {
        header: 'Category',
        key: 'category',
        width: 10,
      },
      {
        header: 'Priority',
        key: 'priority',
        width: 10,
      },
    ];

    storeIncompletedTasks.forEach((task) => {
      sheet.addRow({
        id: task.id,
        title: task.title,
        description: task.description || 'No description',
        createdAt: new Date(task.createdAt),
        completedAt: 'Not finished yet',
        category: task.category.label,
        priority: getPriorityLabel(task.priority),
      });
    });

    storeCompletedTasks.forEach((task) => {
      sheet.addRow({
        id: task.id,
        title: task.title,
        description: task.description || 'No description',
        createdAt: new Date(task.createdAt),
        completedAt: new Date(task.completedAt),
        category: task.category.label,
        priority: getPriorityLabel(task.priority),
      });
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'download.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIcompletedCount(storeIncompletedTasks.length);
  }, [storeIncompletedTasks]);

  useEffect(() => {
    setCompletedCount(storeCompletedTasks.length);
  }, [storeCompletedTasks]);

  if (step === STEPS.ACCOUNT_NAME) {
    modalTitle = 'Change account name';

    bodyContent = (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 w-full max-w-sm"
      >
        <Input
          id="accountName"
          type="text"
          value={accountName}
          placeholder="Enter your Username"
          register={register}
          small
          ghost
          errors={errors}
          errorMessage={errors.accountName?.message as string}
        />
      </form>
    );
    footerContent = (
      <footer className="mt-2 flex w-full items-center justify-between min-[475px]:gap-8">
        <Button
          label="Cancel"
          onClick={() => {
            setCustomValue('accountName', initialAccountName);

            setStep(null);
            setIsOpen(false);
          }}
        />
        <Button
          type="submit"
          label="Edit"
          onClick={() => {
            if (accountName !== initialAccountName) {
              toast.success('The account name is changed');
            }

            setInitialAccountName(accountName);
            setStep(null);
            setIsOpen(false);
          }}
          disabled={!!errors.accountName?.message}
          filled
        />
      </footer>
    );
  }

  if (step === STEPS.ACCOUNT_PASSWORD) {
    modalTitle = 'Change account Password';

    bodyContent = (
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-full max-w-sm">
        <Input
          id="accountOldPassword"
          type="password"
          value={accountOldPassword}
          placeholder="Old Password"
          register={register}
          label="Enter old password"
          small
          ghost
          errors={errors}
          errorMessage={errors.accountOldPassword?.message as string}
        />
        <Input
          id="accountNewPassword"
          type="password"
          value={accountNewPassword}
          placeholder="New password"
          register={register}
          label="Enter new password"
          small
          ghost
          errors={errors}
          errorMessage={errors.accountNewPassword?.message as string}
        />
        <footer className="mt-8 flex w-full items-center justify-between min-[475px]:gap-8">
          <Button
            label="Cancel"
            onClick={() => {
              setCustomValue('accountOldPassword', '');
              setCustomValue('accountNewPassword', '');

              setStep(null);
              setIsOpen(false);
            }}
          />
          <Button
            type="submit"
            label="Edit"
            onClick={onSubmit}
            disabled={!!Object.keys(errors).length}
            filled
          />
        </footer>
      </form>
    );
    footerContent = <></>;
  }

  return (
    <div className="pb-36 md:pb-40">
      <Container>
        <div className="mx-auto mt-8 flex flex-col items-center justify-center">
          <header className="flex w-full flex-col items-center justify-center">
            <h6 className="mb-4 text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
              Profile
            </h6>
            <Image
              src="/images/home/kalts_daniil2.jpg"
              className="mb-4 rounded-full min-[475px]:w-32"
              width={96}
              height={96}
              alt="Avatar"
            />
            <h5 className="text-xl text-gray-dark dark:text-white-pale min-[475px]:text-2xl">
              {initialAccountName}
            </h5>
            <div className="mt-6 flex w-full max-w-[375px] items-center justify-between gap-5">
              <div className="w-2/4 rounded-md border border-gray-500 bg-gray-500 px-6 py-4 dark:border-gray-700 dark:bg-gray-700">
                <p className="text-center text-[15px] text-white-pale min-[475px]:text-lg">
                  {incompletedCount} Task left
                </p>
              </div>
              <div className="w-2/4 rounded-md border border-gray-500 bg-gray-500 px-6 py-4 dark:border-gray-700 dark:bg-gray-700">
                <p className="text-center text-[15px] text-white-pale min-[475px]:text-lg">
                  {completedCount} Task done
                </p>
              </div>
            </div>

            <div className="mt-7 flex w-full max-w-[375px] justify-center">
              {(storeIncompletedTasks.length || storeCompletedTasks.length) &&
              mounted ? (
                <Button
                  label="Export tasks to Excel File"
                  icon={SiMicrosoftexcel}
                  onClick={exportExcelFile}
                  outline="gray"
                />
              ) : (
                <Button
                  label="Export tasks to Excel File"
                  icon={SiMicrosoftexcel}
                  onClick={() => {}}
                  outline="gray"
                  disabled
                />
              )}
            </div>
          </header>
          <main className="mt-4 flex w-full max-w-lg flex-col justify-start">
            <section className="mt-5">
              <h5 className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-lg">
                Settings
              </h5>
              <ProfileLink
                text="App Settings"
                link="profile/settings"
                svg={SettingsIcon}
              />
            </section>
            <section className="mt-5">
              <h5 className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-lg">
                Account
              </h5>
              <ProfileLink
                text="Change account name"
                onClick={() => {
                  setStep(STEPS.ACCOUNT_NAME);
                  setIsOpen(true);
                }}
                svg={ProfileNameIcon}
              />
              <ProfileLink
                text="Change account password"
                onClick={() => {
                  setStep(STEPS.ACCOUNT_PASSWORD);
                  setIsOpen(true);
                }}
                svg={ProfilePasswordIcon}
              />
              <ProfileLink
                text="Change account Image"
                link="profile"
                svg={ProfileImageIcon}
              />
            </section>
            <section className="mt-5">
              <h5 className="text-sm text-gray-dark dark:text-gray-200 min-[475px]:text-lg">
                Uptodo
              </h5>
              <ProfileLink
                text="About US"
                link="profile/about"
                svg={AboutUsIcon}
              />
              <ProfileLink text="FAQ" link="profile/faq" svg={FaqIcon} />
              <ProfileLink
                text="Help & Feedback"
                link="profile/feedback"
                svg={FeedbackIcon}
              />
              <ProfileLink text="Support US" link="profile" svg={SupportIcon} />
              <ProfileLink text="Log out" link="login" svg={LogOutIcon} />
            </section>
          </main>
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
    </div>
  );
};

export default Profile;
