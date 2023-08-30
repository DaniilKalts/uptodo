/* eslint-disable @typescript-eslint/indent */

'use client';

import React, { useState, useEffect } from 'react';

import Image from 'next/image';

import { SiMicrosoftexcel } from 'react-icons/si';

import ExcelJS from 'exceljs';

import useTasksStore from '@/store/useTasksStore';

import Container from '@/components/UI/Container';
import ProfileLink from '@/components/userPages/Profile/ProfileTypography';

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
import { Button } from '@/components/UI';

const Profile = () => {
  const [mounted, setMounted] = useState(false);

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
              Kalts Daniil
            </h5>
            <div className="mt-6 flex w-full max-w-[375px] items-center justify-between gap-5">
              <div className="w-2/4 rounded-md border border-gray-700 bg-gray-700 px-6 py-4">
                <p className="text-center text-[15px] text-white-pale min-[475px]:text-lg">
                  {incompletedCount} Task left
                </p>
              </div>
              <div className="w-2/4 rounded-md border border-gray-700 bg-gray-700 px-6 py-4">
                <p className="text-center text-[15px] text-white-pale min-[475px]:text-lg">
                  {completedCount} Task done
                </p>
              </div>
            </div>
            {(storeIncompletedTasks.length || storeCompletedTasks.length) &&
            mounted ? (
              <div className="mt-7 flex w-full max-w-[375px] justify-center">
                <Button
                  label="Export tasks to Excel File"
                  icon={SiMicrosoftexcel}
                  onClick={exportExcelFile}
                  outline="gray"
                />
              </div>
            ) : null}
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
                link="profile"
                svg={ProfileNameIcon}
              />
              <ProfileLink
                text="Change account password"
                link="profile"
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
              <ProfileLink text="FAQ" link="profile" svg={FaqIcon} />
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
      </Container>
    </div>
  );
};

export default Profile;
