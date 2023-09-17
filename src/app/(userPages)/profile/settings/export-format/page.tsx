/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

import useTasksStore from '@/store/useTasksStore';

import ExcelJS from 'exceljs';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { saveAs } from 'file-saver';

import { BiExport } from 'react-icons/bi';
import { BsFiletypeCsv, BsFiletypeJson, BsFiletypeTxt } from 'react-icons/bs';
import { SiMicrosoftexcel } from 'react-icons/si';

import { Container, Button } from '@/components/UI';
import BackIcon from '@/components/UI/Icons/BackIcon';

type ExportFileType = 'CSV' | 'EXCEL' | 'JSON' | 'TXT';

const ExportFormat = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const targetRef = useRef();

  const [format, setFormat] = useState<ExportFileType>('EXCEL');

  const FORMATS = [
    {
      name: 'EXCEL',
      icon: SiMicrosoftexcel,
    },
    {
      name: 'CSV',
      icon: BsFiletypeCsv,
    },
    {
      name: 'JSON',
      icon: BsFiletypeJson,
    },
    {
      name: 'TXT',
      icon: BsFiletypeTxt,
    },
  ];

  function getPriorityLabel(priority: number) {
    const priorityLabels = ['Low', 'Medium', 'High', 'Critical'];
    const index = Math.min(Math.floor(priority / 3), 3);

    return priorityLabels[index];
  }

  const incompletedTasksSheet = useTasksStore((state) =>
    state.incompletedTasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description || 'No description',
      createdAt: new Date(task.createdAt),
      completedAt: 'Not finished yet',
      category: task.category.label,
      priority: getPriorityLabel(task.priority),
    })),
  );
  const completedTasksSheet = useTasksStore((state) =>
    state.completedTasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description || 'No description',
      createdAt: new Date(task.createdAt),
      completedAt: new Date(task.completedAt),
      category: task.category.label,
      priority: getPriorityLabel(task.priority),
    })),
  );

  const loadingIndicator = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const exportToExcelFile = () => {
    loadingIndicator();

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

    incompletedTasksSheet.forEach((task) => {
      sheet.addRow({
        id: task.id,
        title: task.title,
        description: task.description,
        createdAt: task.createdAt,
        completedAt: task.completedAt,
        category: task.category,
        priority: task.priority,
      });
    });

    completedTasksSheet.forEach((task) => {
      sheet.addRow({
        id: task.id,
        title: task.title,
        description: task.description,
        createdAt: task.createdAt,
        completedAt: task.completedAt,
        category: task.category,
        priority: task.priority,
      });
    });

    workbook.xlsx.writeBuffer().then((excelData) => {
      const blob = new Blob([excelData], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'my_tasks.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const exportToCsvFile = () => {
    loadingIndicator();

    const csvConfig = mkConfig({
      useKeysAsHeaders: true,
      filename: 'my_tasks',
    });

    const csv = generateCsv(csvConfig)([
      ...incompletedTasksSheet,
      ...completedTasksSheet,
    ]);

    download(csvConfig)(csv);
  };

  const exportToJson = () => {
    loadingIndicator();

    const jsonData = JSON.stringify(
      [...incompletedTasksSheet, ...completedTasksSheet],
      null,
      2,
    );

    const blob = new Blob([jsonData], { type: 'application/json' });

    saveAs(blob, 'my_tasks');
  };

  const exportToTxtFile = () => {
    loadingIndicator();

    let formattedText = '';

    for (const task of [...incompletedTasksSheet, ...completedTasksSheet]) {
      formattedText += `Task ID: ${task.id}\n`;
      formattedText += `Title: ${task.title}\n`;
      formattedText += `Description: ${task.description}\n`;
      formattedText += `Created At: ${task.createdAt}\n`;
      formattedText += `Completed At: ${task.completedAt}\n`;
      formattedText += `Category: ${task.category}\n`;
      formattedText += `Priority: ${task.priority}\n`;
      formattedText += '\n';
      formattedText += '====================';
      formattedText += '\n';
      formattedText += '\n';
    }

    const blob = new Blob([formattedText], { type: 'text/plain' });
    saveAs(blob, 'my_tasks.txt');
  };

  return (
    <div className="pb-36 md:pb-40">
      <Container>
        <div className="mx-auto mt-8 flex flex-col items-center justify-center">
          <header className="relative flex w-full max-w-lg items-center justify-center">
            <Link href="/profile/settings" className="group">
              {BackIcon}
            </Link>
            <h4 className="text-xl text-gray-dark dark:text-white-pale min-[500px]:text-2xl">
              Export Tasks
            </h4>
          </header>
          <main className="mt-6 flex w-full max-w-lg flex-col justify-start">
            <div className="mt-5">
              <h5 className="text-lg text-gray-dark dark:text-gray-200 min-[500px]:text-xl">
                Choose your format to export tasks:
              </h5>
              <hr className="mb-4 mt-5 h-[2px] w-full rounded border-0 bg-gray-dark" />
              {FORMATS.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="group flex w-full cursor-pointer items-center justify-between gap-4 py-3"
                  onClick={() => {
                    setFormat(name as ExportFileType);
                  }}
                >
                  <div className="flex items-center gap-3">
                    {<Icon size={28} />}
                    <p
                      className={
                        'text-base capitalize text-gray-dark group-hover:text-black dark:text-white-pale dark:group-hover:text-white min-[500px]:text-lg'
                      }
                    >
                      <b>{name}</b> Format
                    </p>
                  </div>
                  <input
                    id={name}
                    type="checkbox"
                    className="h-[22px] w-[22px] cursor-pointer"
                    checked={format === name}
                    onChange={() => {}}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <div className="max-w-xs">
                <Button
                  label={`Export tasks to ${format} File`}
                  onClick={() => {
                    if (format === 'EXCEL') {
                      exportToExcelFile();
                    } else if (format === 'CSV') {
                      exportToCsvFile();
                    } else if (format === 'JSON') {
                      exportToJson();
                    } else if (format === 'TXT') {
                      exportToTxtFile();
                    }
                  }}
                  outline="purple"
                  disabled={
                    !(
                      incompletedTasksSheet.length || completedTasksSheet.length
                    )
                  }
                  isLoading={isLoading}
                  icon={BiExport}
                />
              </div>
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
};

export default ExportFormat;
